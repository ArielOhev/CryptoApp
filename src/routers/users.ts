import {Router} from 'express';
import { addSymbol, dashboard } from '../controllers/users/users';
import validate from '../middlewares/inputValidation';
import { addSymbolValidator } from '../controllers/users/Validate';

const router = Router();

router.get('/dashboard',dashboard);
router.post('/symbol/add',validate(addSymbolValidator) ,addSymbol);

export default router;