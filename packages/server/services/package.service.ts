import { packageRepository } from '../repositories/package.repository';
import { getPagination, buildPaginated } from '../utils/pagination';

export const packageService = {
   async create(input: {
      name: string;
      amountCents: number;
      dailyProfitBps: number;
      durationDays: number;
      totalReturnBps: number;
      referralBonusBps: number;
      features?: string[];
      active?: boolean;
   }) {
      const created = await packageRepository.create({
         ...input,
         features: input.features ?? [],
      });
      return created;
   },

   async update(
      id: string,
      input: Partial<{
         name: string;
         amountCents: number;
         dailyProfitBps: number;
         durationDays: number;
         totalReturnBps: number;
         referralBonusBps: number;
         features: string[];
         active: boolean;
      }>
   ) {
      const updated = await packageRepository.update(id, input);
      return updated;
   },

   async getById(id: string) {
      return packageRepository.findById(id);
   },

   async list(query: any) {
      const { page, limit, skip, sort, order } = getPagination(query);
      const { data, total } = await packageRepository.list({
         skip,
         take: limit,
         where:
            query.active !== undefined
               ? { active: String(query.active) === 'true' }
               : undefined,
         orderBy: { [sort]: order },
      });
      return buildPaginated(data, total, { page, limit, skip, sort, order });
   },
};
