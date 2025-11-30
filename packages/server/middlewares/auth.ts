import type { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/jwt';

export type AuthRequest = Request & { user?: { id: string } };

export function authMiddleware(
   req: AuthRequest,
   res: Response,
   next: NextFunction
) {
   const authHeader = req.headers.authorization || '';
   const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
   if (!token)
      return res.status(401).json({ success: false, message: 'Missing token' });
   try {
      const payload = verifyAccessToken(token);
      if (payload.type !== 'access') throw new Error('Invalid token');
      req.user = { id: payload.sub };
      return next();
   } catch {
      return res
         .status(401)
         .json({ success: false, message: 'Invalid or expired token' });
   }
}
