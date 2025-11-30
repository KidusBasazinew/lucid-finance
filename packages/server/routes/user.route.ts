import express from 'express';
import { userController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.get('/me', authMiddleware, userController.me);

export default router;
