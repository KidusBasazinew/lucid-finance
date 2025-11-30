import express from 'express';
import { referralController } from '../controllers/referral.controller';
import { authMiddleware } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { paginationQuerySchema } from '../validators/common';

const router = express.Router();

router.use(authMiddleware);
router.get(
   '/',
   validate(paginationQuerySchema, 'query'),
   referralController.listMine
);

export default router;
