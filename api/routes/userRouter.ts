import { Router } from 'express';
import User from '../models/users/userModel';
import mongoose from 'mongoose';
import { imagesUpload } from '../multer';

const userRouter = Router();

userRouter.post('/', imagesUpload.single('avatar'), async (req, res, next) => {
  console.log(req.query);
  try {
    if (req.query && req.query.role) {
      const user = new User({
        email: req.body.email,
        password: req.body.password,
        role: 'admin',
      });
      user.generateToken();
      await user.save();
    }
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      avatar: req.file ? req.file.filename : null,
    });
    user.generateToken();
    await user.save();
    return res.send({ message: 'Registered!', user });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error);
    }

    return next(error);
  }
});

userRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(422).send({ error: 'Email and password not correct!' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(422).send({ error: 'Email and password not correct!' });
    }

    user.generateToken();
    await user.save();

    return res.send({ message: 'Email and password are correct!', user });
  } catch (error) {
    return next(error);
  }
});

userRouter.get('/', async (req, res, next) => {
  try {
    if (req.query && req.query.role) {
      const moderators = await User.find({ role: 'admin' });
      return res.send(moderators);
    } else {
      const users = await User.find({ role: { $nin: ['admin', 'superadmin'] } });
      return res.send(users);
    }
  } catch (error) {
    return next(error);
  }
});
userRouter.delete('/', async (req, res, next) => {
  if (req.query) {
    try {
      const deletedModerator = await User.findByIdAndDelete(req.query.moderator);
      if (!deletedModerator) {
        return res.send('Модератор возможно был удален!');
      }
      return res.send('Модератор был удален!');
    } catch (e) {
      next(e);
    }
  }
});

userRouter.delete('/sessions', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');
    const successMessage = { message: 'Success!' };

    if (!headerValue) {
      return res.send({ ...successMessage, stage: 'No header' });
    }

    const [_bearer, token] = headerValue.split(' ');

    if (!token) {
      return res.send({ ...successMessage, stage: 'No token' });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.send({ ...successMessage, stage: 'No user' });
    }

    user.generateToken();
    await user.save();

    return res.send({ ...successMessage, stage: 'Success' });
  } catch (e) {
    return next(e);
  }
});

export default userRouter;
