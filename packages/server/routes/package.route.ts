import express from 'express';
import { packageController } from '../controllers/package.controller';
import { validate } from '../middlewares/validate';
import {
   createPackageSchema,
   updatePackageSchema,
} from '../validators/package.schema';
import { paginationQuerySchema, idParamSchema } from '../validators/common';

const router = express.Router();

router.get(
   '/',
   validate(paginationQuerySchema, 'query'),
   packageController.list
);
router.get(
   '/:id',
   validate(idParamSchema, 'params'),
   packageController.getById
);
router.post('/', validate(createPackageSchema), packageController.create);
router.patch(
   '/:id',
   validate(idParamSchema, 'params'),
   validate(updatePackageSchema),
   packageController.update
);

export default router;
