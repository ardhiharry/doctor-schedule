import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { Role } from '@enums/role.enum';
import { env } from '@config/env';

export interface IUserToken {
  id: number;
  username: string;
  role: Role;
}

export function generateToken(user: IUserToken): string {
  return (jwt as any).sign(user, env.SECRET_KEY, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
}

export function getUserData(token: string): IUserToken {
  try {
    return jwt.verify(token, env.SECRET_KEY) as IUserToken;
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw new Error('Token expired');
    }

    if (err instanceof JsonWebTokenError) {
      throw new Error('Invalid token');
    }

    throw err;
  }
}
