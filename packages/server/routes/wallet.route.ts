import express from 'express';
import { walletController } from '../controllers/wallet.controller';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.use(authMiddleware);
router.get('/me', walletController.getMine);

export default router;
