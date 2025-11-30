import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/auth';
import { referralService } from '../services/referral.service';
import { ok } from '../utils/response';

export const referralController = {
   listMine: async (req: AuthRequest, res: Response) => {
      const result = await referralService.listByUser(req.user!.id, req.query);
      return ok(res, result);
   },
};
