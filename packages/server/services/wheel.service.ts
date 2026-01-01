import { prisma } from '../lib/prisma';
import { investmentRepository } from '../repositories/investment.repository';

// Allowed prize values (in Birr) - mirror the client wheel sectors
const ALLOWED_WHEEL_AMOUNTS_BIRR = new Set([
   50, 100, 200, 500, 3000, 5000, 10000,
]);

export const wheelService = {
   async claimOnce(userId: string, input: { amountBirr: number }) {
      const amountBirr = Number(input.amountBirr);
      if (!Number.isInteger(amountBirr) || amountBirr <= 0) {
         const err: any = new Error('Invalid reward amount');
         err.status = 400;
         throw err;
      }

      if (!ALLOWED_WHEEL_AMOUNTS_BIRR.has(amountBirr)) {
         const err: any = new Error('Invalid reward amount');
         err.status = 400;
         throw err;
      }

      // Ensure the user has an active approved investment before claiming
      await investmentRepository.ensureActiveInvestmentForUser(userId);

      const amountCents = amountBirr * 100;
      const reference = `WHEEL-${userId}`;
      const now = new Date();

      return prisma.$transaction(async (tx) => {
         // Try to set the reward and claim in one go if user hasn't reserved yet.
         const updated = await tx.user.updateMany({
            where: { id: userId, wheelRewardClaimed: false } as any,
            data: {
               wheelRewardClaimed: true,
               wheelRewardCents: amountCents,
               wheelRewardClaimedAt: now,
            } as any,
         });

         if (updated.count === 0) {
            // User may have reserved the spin earlier (wheelRewardClaimed=true but cents==0).
            // In that case, allow claiming by updating only when cents==0.
            const updated2 = await tx.user.updateMany({
               where: {
                  id: userId,
                  wheelRewardClaimed: true,
                  wheelRewardCents: 0,
               } as any,
               data: {
                  wheelRewardCents: amountCents,
                  wheelRewardClaimedAt: now,
               } as any,
            });

            if (updated2.count === 0) {
               const err: any = new Error('Wheel reward already claimed');
               err.status = 400;
               throw err;
            }
         }

         // Ensure wallet exists, then credit it.
         await tx.wallet.upsert({
            where: { userId },
            update: {},
            create: { userId, balanceCents: 0 },
         });

         const wallet = await tx.wallet.update({
            where: { userId },
            data: { balanceCents: { increment: amountCents } },
         });

         // Record as a successful transaction for history.
         await tx.transaction.create({
            data: {
               user: { connect: { id: userId } },
               type: 'PROFIT' as any,
               amountCents,
               status: 'SUCCESS' as any,
               reference,
               metadata: { source: 'wheel', amountBirr },
            } as any,
         });

         return {
            wallet,
            amountCents,
            amountBirr,
         };
      });
   },
   // Reserve the wheel when user spins: mark as claimed/reserved with 0 cents
   async reserveOnSpin(userId: string) {
      const now = new Date();
      // Ensure user has an active approved investment before allowing a spin
      await investmentRepository.ensureActiveInvestmentForUser(userId);

      return prisma.user.updateMany({
         where: { id: userId, wheelRewardClaimed: false } as any,
         data: {
            wheelRewardClaimed: true,
            wheelRewardCents: 0,
            wheelRewardClaimedAt: now,
         } as any,
      });
   },
};
