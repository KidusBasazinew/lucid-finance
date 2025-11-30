import express from 'express';
import { authController } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import {
   loginSchema,
   refreshSchema,
   registerSchema,
} from '../validators/auth.schema';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh', validate(refreshSchema), authController.refresh);
router.get('/me', authMiddleware, authController.me);

export default router;
