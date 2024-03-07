import { Router } from "express";
import { logout, welcome } from "../controllers/guests/controller";
import enforceGuests from "../middlewares/error/enforce-guests";

const router = Router()

router.get('/',enforceGuests,welcome);
router.get('/guests/logout',logout)

export default router;