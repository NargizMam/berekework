import { NextFunction, Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { EmployerFields } from '../types';
import Employer from '../models/employer/employerModel';

export interface RequestWithEmployer extends Request {
  employer?: HydratedDocument<EmployerFields>;
}

const employerAuth = async (req: RequestWithEmployer, res: Response, next: NextFunction) => {
  const headerValue = req.get('Authorization');

  if (!headerValue) {
    return res.status(401).send({ error: 'No Authorization header present' });
  }

  const [_bearer, token] = headerValue.split(' '); // "Bearer token"

  if (!token) {
    return res.status(401).send({ error: 'No token present' });
  }

  const employer = await Employer.findOne({ token });

  if (!employer) {
    return res.status(401).send({ error: 'Wrong token!' });
  }

  req.employer = employer;

  next();
};

export default employerAuth;
