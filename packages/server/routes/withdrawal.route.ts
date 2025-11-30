import express from 'express';
import { withdrawalController } from '../controllers/withdrawal.controller';
import { authMiddleware } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { z } from 'zod';
import { paginationQuerySchema } from '../validators/common';

const requestSchema = z.object({
   amountCents: z.number().int().positive(),
   destination: z.string().min(3),
});

const router = express.Router();

router.use(authMiddleware);
router.get(
   '/',
   validate(paginationQuerySchema, 'query'),
   withdrawalController.listMine
);
router.post('/', validate(requestSchema), withdrawalController.request);

export default router;
