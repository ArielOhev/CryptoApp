import {Router} from 'express';
import { addSymbol, dashboard } from '../controllers/users/users';

const router = Router();

router.get('/dashboard',dashboard);
router.post('/symbol/add', addSymbol);

export default router;