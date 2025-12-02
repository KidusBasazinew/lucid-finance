import { prisma } from '../lib/prisma';
import type { Prisma } from '@prisma/client';

export const withdrawalRepository = {
   create(data: Prisma.WithdrawalCreateInput) {
      return prisma.withdrawal.create({ data });
   },
   findById(id: string) {
      return prisma.withdrawal.findUnique({ where: { id } });
   },
   update(id: string, data: Prisma.WithdrawalUpdateInput) {
      return prisma.withdrawal.update({ where: { id }, data });
   },
   list(params: {
      where?: Prisma.WithdrawalWhereInput;
      orderBy?: Prisma.WithdrawalOrderByWithRelationInput;
      include?: Prisma.WithdrawalInclude;
   }) {
      return prisma.withdrawal.findMany(params);
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
