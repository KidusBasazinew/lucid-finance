import { prisma } from '../lib/prisma';
import type { Prisma } from '@prisma/client';

export const investmentRepository = {
   create(data: Prisma.InvestmentCreateInput) {
      return prisma.investment.create({ data });
   },
   findById(id: string) {
      return prisma.investment.findUnique({ where: { id } });
   },
   async listByUser(
      userId: string,
      params: {
         skip: number;
         take: number;
         orderBy?: Prisma.InvestmentOrderByWithRelationInput;
      }
   ) {
      const where: Prisma.InvestmentWhereInput = { userId } as any;
      const [data, total] = await Promise.all([
         prisma.investment.findMany({
            where,
            skip: params.skip,
            take: params.take,
            orderBy: params.orderBy,
         }),
         prisma.investment.count({ where }),
      ]);
      return { data, total };
   },
};
