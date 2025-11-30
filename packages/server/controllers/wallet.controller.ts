import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/auth';
import { walletService } from '../services/wallet.service';
import { ok } from '../utils/response';

export const walletController = {
   getMine: async (req: AuthRequest, res: Response) => {
      const wallet = await walletService.getForUser(req.user!.id);
      return ok(res, wallet);
   },
};
