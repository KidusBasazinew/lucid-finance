import express from 'express';
import { transactionController } from '../controllers/transaction.controller';
import { authMiddleware } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { paginationQuerySchema } from '../validators/common';

const router = express.Router();

router.use(authMiddleware);
router.get(
   '/',
   validate(paginationQuerySchema, 'query'),
   transactionController.listMine
);

export default router;
