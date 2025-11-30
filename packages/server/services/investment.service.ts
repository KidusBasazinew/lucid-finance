import { investmentRepository } from '../repositories/investment.repository';
import { packageRepository } from '../repositories/package.repository';
import { getPagination, buildPaginated } from '../utils/pagination';

export const investmentService = {
   async create(userId: string, input: { packageId: string }) {
      const pack = await packageRepository.findById(input.packageId);
      if (!pack || !pack.active)
         throw Object.assign(new Error('Invalid package'), { status: 400 });
      const created = await investmentRepository.create({
         user: { connect: { id: userId } },
         package: { connect: { id: pack.id } },
         amountCents: pack.amountCents,
         dailyProfitBps: pack.dailyProfitBps,
         totalReturnCents: Math.floor(
            (pack.amountCents * pack.totalReturnBps) / 10000
         ),
         endDate: null,
         status: 'ACTIVE',
      } as any);
      return created;
   },

   async listByUser(userId: string, query: any) {
      const { page, limit, skip, sort, order } = getPagination(query);
      const { data, total } = await investmentRepository.listByUser(userId, {
         skip,
         take: limit,
         orderBy: { [sort]: order } as any,
      });
      return buildPaginated(data, total, { page, limit, skip, sort, order });
   },
};
