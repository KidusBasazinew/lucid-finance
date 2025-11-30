import { referralRepository } from '../repositories/referral.repository';
import { getPagination, buildPaginated } from '../utils/pagination';

export const referralService = {
   async listByUser(userId: string, query: any) {
      const { page, limit, skip, sort, order } = getPagination(query);
      const { data, total } = await referralRepository.listByUser(userId, {
         skip,
         take: limit,
         orderBy: { [sort]: order } as any,
      });
      return buildPaginated(data, total, { page, limit, skip, sort, order });
   },
};
