import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'class-validator';

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (Array.isArray(err) && err.every((e) => e instanceof ValidationError)) {
    const message = err.reduce(
      (acc, curr) => {
        acc[curr.property] = Object.values(curr.constraints ?? {});
        return acc;
      },
      {} as Record<string, string[]>,
    );

    res.status(422).json({
      success: false,
      message,
      data: [],
    });

    return;
  }

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    message,
    data: [],
  });
}
