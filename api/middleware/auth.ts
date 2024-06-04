import { NextFunction, Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { EmployerFields, UserFields } from '../types';
import User from '../models/users/userModel';
import Employer from '../models/employer/employerModel';

export interface RequestWithUser extends Request {
  user?: HydratedDocument<UserFields>;
  employer?: HydratedDocument<EmployerFields>;
}

const auth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const headerValue = req.get('Authorization');

  if (!headerValue) {
    return res.status(401).send({ error: 'No Authorization header present' });
  }

  const [_bearer, token] = headerValue.split(' ');

  if (!token) {
    return res.status(401).send({ error: 'No token present' });
  }

  const user = await User.findOne({ token });
  const employer = await Employer.findOne({ token });
  if (!user && !employer) {
    return res.status(401).send({ error: 'Invalid token!' });
  }

  if (user) {
    req.user = user;
  }

  if (employer) {
    req.employer = employer;
  }

  next();
};

export default auth;
