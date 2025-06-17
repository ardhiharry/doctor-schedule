import { Request, Response, NextFunction } from 'express';
import { response } from '@utils/response';

export function notFoundMiddleware(req: Request, res: Response) {
  response(res, 404, `${req.method} ${req.originalUrl} does not exist`, []);
}
