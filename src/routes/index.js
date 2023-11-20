import { Router } from 'express';
import registerRouter from './register.routes';

const router = Router();

router.use('/register', registerRouter);

export default router;
