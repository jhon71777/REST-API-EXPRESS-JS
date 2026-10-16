import { Router } from 'express';
import loanRoutes from './loan.routes';
import userRoutes from './user.routes';
import ambienteRoutes from './ambiente.routes';      
const router = Router();
router.use('/loans', loanRoutes);
router.use('/users', userRoutes);
router.use('/ambientes', ambienteRoutes);            
export default router;