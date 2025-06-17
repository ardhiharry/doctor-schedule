import { Request, Response, NextFunction } from 'express';
import { getUserData, IUserToken } from '@utils/jwt';
import { response } from '@utils/response';

export interface IReqUser extends Request {
  user?: IUserToken;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      response(res, 401, 'Authorization header is missing', []);
      return;
    }

    const [prefix, token] = authorization.split(' ');

    if (!(prefix === 'Bearer' && token)) {
      response(res, 401, 'Authorization header is invalid', []);
      return;
    }

    const user = getUserData(token);

    if (!user) {
      response(res, 401, 'Invalid or expired token', []);
      return;
    }

    (req as IReqUser).user = user;

    next();
  } catch (err) {
    response(
      res,
      401,
      err instanceof Error
        ? (err as unknown as Error).message
        : 'Unknown error',
      [],
    );
    return;
  }
}
