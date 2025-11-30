import { prisma } from '../lib/prisma';
import type { Prisma } from '@prisma/client';

export const packageRepository = {
   create(data: Prisma.PackageCreateInput) {
      return prisma.package.create({ data });
   },
   update(id: string, data: Prisma.PackageUpdateInput) {
      return prisma.package.update({ where: { id }, data });
   },
   findById(id: string) {
      return prisma.package.findUnique({ where: { id } });
   },
   delete(id: string) {
      return prisma.package.delete({ where: { id } });
   },
   async list(params: {
      skip: number;
      take: number;
      where?: Prisma.PackageWhereInput;
      orderBy?: Prisma.PackageOrderByWithRelationInput;
   }) {
      const [data, total] = await Promise.all([
         prisma.package.findMany({
            skip: params.skip,
            take: params.take,
            where: params.where,
            orderBy: params.orderBy,
         }),
         prisma.package.count({ where: params.where }),
      ]);
      return { data, total };
   },
};
