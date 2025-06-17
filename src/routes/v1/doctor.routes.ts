import { Request, Response, NextFunction, Router } from 'express';
import { DoctorService } from '@services/doctor service';
import { DoctorController } from '@controllers/doctor.controller';
import { methodAllowedMiddleware } from '@middlewares/method-allowed.middleware';

const router = Router();
const doctorService = new DoctorService();
const doctorController = new DoctorController(doctorService);

router.post('/', (req: Request, res: Response, next: NextFunction) =>
  doctorController.create(req, res, next),
);

router.get('/', (req: Request, res: Response, next: NextFunction) =>
  doctorController.getAll(req, res, next),
);

router.get('/search', (req: Request, res: Response, next: NextFunction) =>
  doctorController.getFilter(req, res, next),
);

router.get('/:id', (req: Request, res: Response, next: NextFunction) =>
  doctorController.getById(req, res, next),
);

router.patch('/:id', (req: Request, res: Response, next: NextFunction) =>
  doctorController.update(req, res, next),
);

router.delete('/:id', (req: Request, res: Response, next: NextFunction) =>
  doctorController.softDelete(req, res, next),
);

router.put('/restore/:id', (req: Request, res: Response, next: NextFunction) =>
  doctorController.restore(req, res, next),
);

router.all('/', methodAllowedMiddleware(['GET', 'POST']));
router.all('/search', methodAllowedMiddleware(['GET']));
router.all('/:id', methodAllowedMiddleware(['GET', 'PATCH', 'DELETE']));
router.all('/restore/:id', methodAllowedMiddleware(['PUT']));

export default router;
