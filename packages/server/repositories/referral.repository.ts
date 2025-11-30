import { prisma } from '../lib/prisma';
import type { Prisma } from '@prisma/client';

export const referralRepository = {
   create(data: Prisma.ReferralCreateInput) {
      return prisma.referral.create({ data });
   },
   async listByUser(
      userId: string,
      params: {
         skip: number;
         take: number;
         orderBy?: Prisma.ReferralOrderByWithRelationInput;
      }
   ) {
      const where: Prisma.ReferralWhereInput = { userId } as any;
      const [data, total] = await Promise.all([
         prisma.referral.findMany({
            where,
            skip: params.skip,
            take: params.take,
            orderBy: params.orderBy,
         }),
         prisma.referral.count({ where }),
      ]);
      return { data, total };
   },
};
