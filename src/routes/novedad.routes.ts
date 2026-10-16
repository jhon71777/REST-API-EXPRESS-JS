import { Router } from 'express';
import { NovedadController } from '../controllers/novedad.controller';

const router = Router();

router.get('/', NovedadController.getNovedades);
router.post('/', NovedadController.createNovedad);
router.patch('/:id', NovedadController.updateEstadoNovedad);

export default router;