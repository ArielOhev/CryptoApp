import {Router} from 'express';
import { dashboard } from '../controllers/users/users';

const router = Router();

router.get('/dashboard',dashboard);

export default router;