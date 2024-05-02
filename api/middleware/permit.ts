import { RequestWithUser } from './auth';
import { NextFunction, Response } from 'express';

const permit = (...roles: string[]) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).send({ error: 'Не авторизован' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).send({ error: 'Нет доступа для дальнейших действий!' });
    }
    return next();
  };
};
export default permit;
