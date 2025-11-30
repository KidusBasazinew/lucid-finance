import { prisma } from '../lib/prisma';
import type { Prisma } from '@prisma/client';

export const withdrawalRepository = {
   create(data: Prisma.WithdrawalCreateInput) {
      return prisma.withdrawal.create({ data });
   },
   async listByUser(
      userId: string,
      params: {
         skip: number;
         take: number;
         orderBy?: Prisma.WithdrawalOrderByWithRelationInput;
      }
   ) {
      const where: Prisma.WithdrawalWhereInput = { userId } as any;
      const [data, total] = await Promise.all([
         prisma.withdrawal.findMany({
            where,
            skip: params.skip,
            take: params.take,
            orderBy: params.orderBy,
         }),
         prisma.withdrawal.count({ where }),
      ]);
      return { data, total };
   },
};
