import express from 'express';
import { investmentController } from '../controllers/investment.controller';
import { authMiddleware } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { paginationQuerySchema } from '../validators/common';
import { z } from 'zod';

const createSchema = z.object({ packageId: z.string().min(1) });

const router = express.Router();

router.use(authMiddleware);
router.get(
   '/',
   validate(paginationQuerySchema, 'query'),
   investmentController.listMine
);
router.post('/', validate(createSchema), investmentController.create);

export default router;
