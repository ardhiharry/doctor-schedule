import { Response } from 'express';

export function response<T>(
  res: Response,
  status: number,
  message: string | Record<string, string | string[]>,
  data: T,
) {
  res.status(status).json({
    success: true,
    message,
    data,
  });
}
