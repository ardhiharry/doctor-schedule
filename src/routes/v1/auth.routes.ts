import { Request, Response, NextFunction, Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { AuthService } from '@services/auth.service';
import { authMiddleware, IReqUser } from '@middlewares/auth.middleware';
import { methodAllowedMiddleware } from '@middlewares/method-allowed.middleware';

const router = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

router.post('/register', (req: Request, res: Response, next: NextFunction) =>
  authController.register(req, res, next),
);

router.post('/login', (req: Request, res: Response, next: NextFunction) =>
  authController.login(req, res, next),
);

router.get(
  '/me',
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    authController.me(req, res, next),
);

router.all('/register', methodAllowedMiddleware(['POST']));
router.all('/login', methodAllowedMiddleware(['POST']));
router.all('/me', methodAllowedMiddleware(['GET']));

export default router;
