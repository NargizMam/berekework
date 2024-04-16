import { Router } from 'express';
import User from '../models/users/userModel';
import mongoose from 'mongoose';

const userRouter = Router();

userRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
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

export default userRouter;
