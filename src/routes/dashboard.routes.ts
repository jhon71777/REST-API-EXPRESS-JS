import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';

const router = Router();

router.get('/resumen', DashboardController.getResumen);

export default router;
