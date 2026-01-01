import express from 'express';
import { wheelController } from '../controllers/wheel.controller';
import { authMiddleware } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { wheelClaimSchema } from '../validators/wheel.schema';

const router = express.Router();

router.use(authMiddleware);
router.post(
   '/claim',
   validate(wheelClaimSchema, 'body'),
   wheelController.claim
);
router.post('/spin', wheelController.spin);

export default router;
