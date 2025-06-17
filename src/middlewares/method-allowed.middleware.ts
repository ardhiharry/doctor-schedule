import { Request, Response, NextFunction } from 'express';
import { response } from '@utils/response';

export function methodAllowedMiddleware(methods: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!methods.includes(req.method)) {
      response(res, 405, `${req.method} method is not allowed`, []);
      return;
    }

    next();
  };
}
