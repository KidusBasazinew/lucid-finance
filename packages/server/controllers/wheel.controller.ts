import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/auth';
import { wheelService } from '../services/wheel.service';
import { ok } from '../utils/response';

export const wheelController = {
   claim: async (req: AuthRequest, res: Response) => {
      const body = (req as any).validatedData ?? req.body;
      const result = await wheelService.claimOnce(req.user!.id, body);
      return ok(res, result);
   },
   spin: async (req: AuthRequest, res: Response) => {
      // Reserve the wheel so user can't spin again without collecting
      await wheelService.reserveOnSpin(req.user!.id);
      return ok(res, { reserved: true });
   },
};
