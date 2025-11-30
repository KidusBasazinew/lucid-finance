import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/auth';
import { transactionService } from '../services/transaction.service';
import { ok } from '../utils/response';

export const transactionController = {
   listMine: async (req: AuthRequest, res: Response) => {
      const result = await transactionService.listByUser(
         req.user!.id,
         req.query
      );
      return ok(res, result);
   },
};
