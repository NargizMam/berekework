import { Router } from 'express';
import User from '../models/users/userModel';
import mongoose from 'mongoose';
import { imagesUpload } from '../multer';

const userRouter = Router();

userRouter.post('/', imagesUpload.single('avatar'), async (req, res, next) => {
  try {
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
      return res.status(422).send({ error: 'Email and password no correct!' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(422).send({ error: 'Email and password no correct!' });
    }

    user.generateToken();
    await user.save();

    return res.send({ message: 'Email and password are correct!', user });
  } catch (error) {
    return next(error);
  }
});

userRouter.get('/', async (_req, res, next) => {
  try {
    const result = await User.find();
    return res.send(result);
  } catch (error) {
    return next(error);
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
