import { Request, Response, NextFunction, Router } from 'express';
import { ScheduleService } from '@services/schedule.service';
import { ScheduleController } from '@controllers/schedule.controller';
import { methodAllowedMiddleware } from '@middlewares/method-allowed.middleware';

const router = Router();
const scheduleService = new ScheduleService();
const scheduleController = new ScheduleController(scheduleService);

router.post('/', (req: Request, res: Response, next: NextFunction) =>
  scheduleController.create(req, res, next),
);

router.get('/', (req: Request, res: Response, next: NextFunction) =>
  scheduleController.getAll(req, res, next),
);

router.all('/', methodAllowedMiddleware(['GET', 'POST']));

export default router;
