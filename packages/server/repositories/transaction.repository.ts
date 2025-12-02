import { prisma } from '../lib/prisma';
import type { Prisma } from '@prisma/client';

export const transactionRepository = {
   create(data: Prisma.TransactionCreateInput) {
      return prisma.transaction.create({ data });
   },
   async existsByReference(ref: string) {
      const found = await prisma.transaction.findUnique({
         where: { reference: ref },
      });
      return Boolean(found);
   },
   async existsByReferencePrefix(prefix: string) {
      const found = await prisma.transaction.findFirst({
         where: { reference: { startsWith: prefix } },
         select: { id: true },
      });
      return Boolean(found);
   },
   async listByUser(
      userId: string,
      params: {
         skip: number;
         take: number;
         orderBy?: Prisma.TransactionOrderByWithRelationInput;
      }
   ) {
      const where: Prisma.TransactionWhereInput = { userId } as any;
      const [data, total] = await Promise.all([
         prisma.transaction.findMany({
            where,
            skip: params.skip,
            take: params.take,
            orderBy: params.orderBy,
         }),
         prisma.transaction.count({ where }),
      ]);
      return { data, total };
   },
};
