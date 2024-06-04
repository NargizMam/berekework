import { RequestWithUser } from './auth';
import { NextFunction, Response } from 'express';

const permit = (...roles: string[]) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (!req.user && !req.employer) {
      return res.status(401).send({ error: 'Не авторизован' });
    }
    if (req.user && roles.includes(req.user.role)) {
      return next();
    }
    if (req.employer && roles.includes(req.employer.role)) {
      return next();
    }
    return res.status(403).send({ error: 'Нет доступа для дальнейших действий!' });
  };
};
export default permit;
