import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';

export function validate(
   schema: ZodSchema<any>,
   property: 'body' | 'query' | 'params' = 'body'
) {
   return (req: Request, res: Response, next: NextFunction) => {
      const result = schema.safeParse((req as any)[property]);
      if (!result.success) {
         return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: result.error.flatten(),
         });
      }
      // Instead of mutating req, attach parsed data to request
      (req as any).validatedData = result.data;
      return next();
   };
}
