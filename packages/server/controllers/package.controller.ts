import type { Request, Response } from 'express';
import { packageService } from '../services/package.service';
import { created, ok } from '../utils/response';

export const packageController = {
   create: async (req: Request, res: Response) => {
      const pkg = await packageService.create(req.body);
      return created(res, pkg, 'Package created');
   },
   update: async (req: Request, res: Response) => {
      const pkg = await packageService.update(
         req.params.id as string,
         req.body
      );
      return ok(res, pkg, 'Package updated');
   },
   getById: async (req: Request, res: Response) => {
      const pkg = await packageService.getById(req.params.id as string);
      return ok(res, pkg);
   },
   list: async (req: Request, res: Response) => {
      const result = await packageService.list(req.query);
      return ok(res, result);
   },
};
