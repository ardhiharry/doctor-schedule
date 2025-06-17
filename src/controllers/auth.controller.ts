import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@services/auth.service';
import { response } from '@utils/response';
import { IReqUser } from '@middlewares/auth.middleware';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.authService.register(req.body);
      const { password, ...data } = result;

      response(res, 201, 'User registered successfully', data);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.authService.login(req.body);
      const { password, ...data } = result;

      response(res, 200, 'User logged in successfully', data);
    } catch (err) {
      next(err);
    }
  }

  async me(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.authService.me(req);

      response(res, 200, 'Success get user', result);
    } catch (err) {
      next(err);
    }
  }
}
