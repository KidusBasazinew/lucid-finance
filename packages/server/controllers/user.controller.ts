import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/auth';
import { userRepository } from '../repositories/user.repository';
import { ok } from '../utils/response';

export const userController = {
   me: async (req: AuthRequest, res: Response) => {
      const user = await userRepository.withWalletById(req.user!.id);
      return ok(res, user);
   },
};
