import type { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { created, ok } from '../utils/response';
import type { AuthRequest } from '../middlewares/auth';

export const authController = {
   register: async (req: Request, res: Response) => {
      const { phone, password, email, firstName, lastName, referralCode } =
         req.body;
      const result = await authService.register({
         phone,
         password,
         email,
         firstName,
         lastName,
         referralCode,
      });
      return created(res, result, 'Registered');
   },
   login: async (req: Request, res: Response) => {
      const { phone, password } = req.body;
      const result = await authService.login({ phone, password });
      return ok(res, result, 'Logged in');
   },
   me: async (req: AuthRequest, res: Response) => {
      return ok(res, { userId: req.user!.id });
   },
   refresh: async (req: Request, res: Response) => {
      const { refreshToken } = req.body;
      const result = await authService.refresh({ refreshToken });
      return ok(res, result, 'Refreshed');
   },
};
