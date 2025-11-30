import type { NextFunction, Request, Response } from 'express';

export function notFoundHandler(req: Request, res: Response) {
   res.status(404).json({ success: false, message: 'Route not found' });
}

export function errorHandler(
   err: any,
   req: Request,
   res: Response,
   _next: NextFunction
) {
   // eslint-disable-next-line no-console
   console.error('Error:', err);
   if (res.headersSent) return;
   const status = err.status || 500;
   const message = err.message || 'Internal server error';
   res.status(status).json({ success: false, message });
}
