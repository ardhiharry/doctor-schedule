import { Router } from 'express';
import authRoutes from '@routes/v1/auth.routes';
import userRoutes from '@routes/v1/user.routes';
import doctorRoutes from '@routes/v1/doctor.routes';
import scheduleRoutes from '@routes/v1/schedule.routes';

const router = Router();

router.use('/v1/auth', authRoutes);
router.use('/v1/user', userRoutes);
router.use('/v1/doctor', doctorRoutes);
router.use('/v1/schedule', scheduleRoutes);

export default router;
