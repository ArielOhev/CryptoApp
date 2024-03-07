import {Router} from 'express';
import { addSymbol, dashboard } from '../controllers/users/users';
import validate from '../middlewares/inputValidation';
import { addSymbolValidator } from '../controllers/users/Validate';
import enforceAuth from '../middlewares/error/enfore-auth';

const router = Router();

router.use(enforceAuth)
router.get('/dashboard',dashboard);
router.post('/symbol/add',validate(addSymbolValidator) ,addSymbol);

export default router;