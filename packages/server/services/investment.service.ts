import { investmentRepository } from '../repositories/investment.repository';
import { packageRepository } from '../repositories/package.repository';
import { getPagination, buildPaginated } from '../utils/pagination';
import { userRepository } from '../repositories/user.repository';
import { walletRepository } from '../repositories/wallet.repository';
import { transactionService } from './transaction.service';
import { referralRepository } from '../repositories/referral.repository';

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

      // Handle referral bonus on first investment
      try {
         const user = await userRepository.findById(userId);
         const referrerId = user?.referredById;
         if (referrerId) {
            // Compute bonus as percentage (bps) of package amount
            const bonusCents = Math.floor(
               (pack.amountCents * pack.referralBonusBps) / 10000
            );

            // Credit referrer's wallet
            await walletRepository.increaseBalance(referrerId, bonusCents);

            // Record referral bonus transaction
            await transactionService.create(referrerId, {
               type: 'REFERRAL' as any,
               amountCents: bonusCents,
               status: 'SUCCESS' as any,
               reference: `REF-${created.id}-${Date.now()}`,
               metadata: {
                  fromUserId: userId,
                  investmentId: created.id,
                  packageId: pack.id,
               },
            });

            // Update or create referral record bonus
            await referralRepository.create({
               user: { connect: { id: referrerId } },
               referredUserId: userId,
               bonusCents,
            } as any);
         }
      } catch (e) {
         // Non-blocking: referral bonus failures should not prevent investment creation
      }
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
