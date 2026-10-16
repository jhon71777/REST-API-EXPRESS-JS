import { Router } from 'express';
import { EquipoController } from '../controllers/equipo.controller';

const router = Router();

router.get('/', EquipoController.getEquipos);
router.post('/', EquipoController.createEquipo);
router.patch('/:id', EquipoController.updateEquipo);

export default router;
