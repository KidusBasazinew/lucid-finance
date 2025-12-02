import { referralRepository } from '../repositories/referral.repository';
import { userRepository } from '../repositories/user.repository';
import { getPagination, buildPaginated } from '../utils/pagination';

export const referralService = {
   async listByUser(userId: string, query: any) {
      const { page, limit, skip, sort, order } = getPagination(query);

      // Get the referrals
      const { data: referrals, total } = await referralRepository.listByUser(
         userId,
         {
            skip,
            take: limit,
            orderBy: { [sort]: order } as any,
         }
      );

      // Fetch the referred users for each referral
      const referralsWithUser = await Promise.all(
         referrals.map(async (ref) => {
            const referredUser = await userRepository.findById(
               ref.referredUserId
            );

            return {
               id: ref.id,
               bonusCents: ref.bonusCents,
               createdAt: ref.createdAt,
               name:
                  referredUser?.firstName ||
                  referredUser?.email ||
                  'Referred User',
               email: referredUser?.email || '',
               packageName: '—', // placeholder, update later if you have a package relation
            };
         })
      );

      return buildPaginated(referralsWithUser, total, {
         page,
         limit,
         skip,
         sort,
         order,
      });
   },
};
