import type { NextFunction, Response } from 'express';
import type { AuthRequest } from './auth';
import { userRepository } from '../repositories/user.repository';

export async function adminMiddleware(
   req: AuthRequest,
   res: Response,
   next: NextFunction
) {
   if (!req.user?.id) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
   }
   const user = await userRepository.findById(req.user.id);
   if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Admin only' });
   }
   return next();
}
