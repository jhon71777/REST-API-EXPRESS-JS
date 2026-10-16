import { Router } from 'express';
import { AmbienteController } from '../controllers/ambiente.controller';

const router = Router();

router.get('/', AmbienteController.getAmbientes);
router.post('/', AmbienteController.createAmbiente);
router.patch('/:id', AmbienteController.updateAmbiente);

export default router;