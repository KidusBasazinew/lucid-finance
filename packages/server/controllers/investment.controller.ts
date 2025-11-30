import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/auth';
import { investmentService } from '../services/investment.service';
import { created, ok } from '../utils/response';

export const investmentController = {
   create: async (req: AuthRequest, res: Response) => {
      const inv = await investmentService.create(req.user!.id, {
         packageId: req.body.packageId,
      });
      return created(res, inv, 'Investment created');
   },
   listMine: async (req: AuthRequest, res: Response) => {
      const result = await investmentService.listByUser(
         req.user!.id,
         req.query
      );
      return ok(res, result);
   },
};
