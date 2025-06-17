import { Request, Response, NextFunction, Router } from 'express';
import { UserService } from '@services/user.service';
import { UserController } from '@controllers/user.controller';
import { authMiddleware } from '@middlewares/auth.middleware';
import { methodAllowedMiddleware } from '@middlewares/method-allowed.middleware';

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.get(
  '/',
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    userController.getAll(req, res, next),
);

router.all('/', methodAllowedMiddleware(['GET']));

export default router;
