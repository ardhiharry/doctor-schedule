import { Request, Response, NextFunction } from 'express';
import { UserService } from '@services/user.service';
import { response } from '@utils/response';

export class UserController {
  constructor(private readonly userService: UserService) {}

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.getAll();
      response(res, 200, 'Success get all users', result);
    } catch (err) {
      next(err);
    }
  }
}
