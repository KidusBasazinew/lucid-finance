import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/auth';
import { withdrawalService } from '../services/withdrawal.service';
import { created, ok } from '../utils/response';

export const withdrawalController = {
   request: async (req: AuthRequest, res: Response) => {
      const { amountCents, destination } = req.body;
      const w = await withdrawalService.request(req.user!.id, {
         amountCents,
         destination,
      });
      return created(res, w, 'Withdrawal requested');
   },
   listMine: async (req: AuthRequest, res: Response) => {
      const result = await withdrawalService.listByUser(
         req.user!.id,
         req.query
      );
      return ok(res, result);
   },
};
