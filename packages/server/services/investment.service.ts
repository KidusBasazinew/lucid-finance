import { investmentRepository } from '../repositories/investment.repository';
import { packageRepository } from '../repositories/package.repository';
import { getPagination, buildPaginated } from '../utils/pagination';
import { userRepository } from '../repositories/user.repository';
import { walletRepository } from '../repositories/wallet.repository';
import { transactionService } from './transaction.service';
import { referralRepository } from '../repositories/referral.repository';
import { prisma } from '../lib/prisma';
import { InvestmentStatus } from '@prisma/client';
import { transactionRepository } from '../repositories/transaction.repository';

const PROFIT_TEST_MODE = process.env.PROFIT_TEST_MODE === 'true';
let PROFITS_PROCESSING = false; // simple in-memory lock for Render free tier

export const investmentService = {
   async create(userId: string, input: { packageId: string }) {
      const pack = await packageRepository.findById(input.packageId);
      if (!pack || !pack.active)
         throw Object.assign(new Error('Invalid package'), { status: 400 });
      const created = await investmentRepository.create({
         user: { connect: { id: userId } },
         package: { connect: { id: pack.id } },
         amountCents: 0,
         dailyProfitBps: pack.dailyProfitBps,
         totalReturnCents: pack.totalReturnBps,
         endDate: null,
         // Using CANCELLED as a placeholder for pending until admin approves
         status: InvestmentStatus.CANCELLED,
      } as any);
      return created;
   },

   async approve(investmentId: string) {
      const inv = await investmentRepository.findById(investmentId);
      if (!inv)
         throw Object.assign(new Error('Investment not found'), {
            status: 404,
         });
      if (inv.status === 'ACTIVE') return inv;
      const pack = await packageRepository.findById(inv.packageId);
      if (!pack)
         throw Object.assign(new Error('Package not found'), { status: 404 });

      const updated = await prisma.investment.update({
         where: { id: investmentId },
         data: {
            status: 'ACTIVE',
            startDate: new Date(),
            endDate: new Date(
               new Date().getTime() + pack.durationDays * 24 * 60 * 60 * 1000
            ),
         },
      });

      // Credit the user's wallet with the investment amount on approval
      await walletRepository.increaseBalance(inv.userId, inv.amountCents);
      await transactionService.create(inv.userId, {
         type: 'DEPOSIT' as any,
         amountCents: inv.amountCents,
         status: 'SUCCESS' as any,
         reference: `INV-${inv.id}`,
         metadata: { investmentId: inv.id, packageId: pack.id },
      });

      // One-time referral bonus upon approval
      try {
         const user = await userRepository.findById(inv.userId);
         const referrerId = user?.referredById;
         if (referrerId) {
            const refPrefix = `REF-${investmentId}-`;
            const exists =
               await transactionRepository.existsByReferencePrefix(refPrefix);
            if (!exists) {
               const bonusCents = pack.referralBonusBps * 100;

               await walletRepository.increaseBalance(referrerId, bonusCents);
               await transactionService.create(referrerId, {
                  type: 'REFERRAL' as any,
                  amountCents: bonusCents,
                  status: 'SUCCESS' as any,
                  reference: `${refPrefix}${Date.now()}`,
                  metadata: {
                     fromUserId: inv.userId,
                     investmentId: inv.id,
                     packageId: pack.id,
                  },
               });
               await referralRepository.create({
                  user: { connect: { id: referrerId } },
                  referredUserId: inv.userId,
                  bonusCents,
               } as any);
            }
         }
      } catch {}
      return updated;
   },

   async processDailyProfits() {
      if (PROFITS_PROCESSING) {
         return; // prevent concurrent runs
      }
      PROFITS_PROCESSING = true;
      try {
         const investments = await prisma.investment.findMany({
            where: { status: 'ACTIVE' },
         });

         const now = new Date();
         const msPerDay = PROFIT_TEST_MODE ? 60 * 1000 : 24 * 60 * 60 * 1000;

         for (const inv of investments) {
            const pack = await packageRepository.findById(inv.packageId);
            if (!pack) continue;

            // Check end date first
            if (inv.endDate && now >= new Date(inv.endDate)) {
               await prisma.investment.update({
                  where: { id: inv.id },
                  data: { status: 'COMPLETED' },
               });
               continue;
            }

            // Determine the first unpaid day using lastProfitDate
            const startDate = new Date(inv.startDate);
            const lastPaid = inv.lastProfitDate
               ? new Date(inv.lastProfitDate)
               : null;
            const firstUnpaidDate = lastPaid
               ? new Date(lastPaid.getTime() + msPerDay)
               : startDate;

            const totalDays = pack.durationDays;
            const daysSinceStart = Math.floor(
               (now.getTime() - startDate.getTime()) / msPerDay
            );
            const maxPayableDays = Math.min(daysSinceStart, totalDays);

            const dailyCents = inv.dailyProfitBps * 100;

            // Iterate day-by-day from firstUnpaidDate up to now, stopping at expiry
            for (let i = 0; i < maxPayableDays; i++) {
               const dayDate = new Date(startDate.getTime() + i * msPerDay);
               if (dayDate < firstUnpaidDate) continue; // already paid
               if (inv.endDate && dayDate > new Date(inv.endDate)) break; // past expiry

               const ref = `PROF-${inv.id}-${dayDate.toISOString().slice(0, 10)}`;
               const exists =
                  await transactionRepository.existsByReference(ref);
               if (exists) continue; // idempotent: skip duplicates

               await walletRepository.increaseBalance(inv.userId, dailyCents);
               await transactionService.create(inv.userId, {
                  type: 'PROFIT',
                  amountCents: dailyCents,
                  status: 'SUCCESS',
                  reference: ref,
                  metadata: { investmentId: inv.id, date: dayDate },
               });

               // Track lastProfitDate to speed future runs and avoid double-credit
               await prisma.investment.update({
                  where: { id: inv.id },
                  data: { lastProfitDate: dayDate },
               });
            }
         }
      } finally {
         PROFITS_PROCESSING = false;
      }
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

   async listPendingInvestments() {
      const data = await prisma.investment.findMany({
         where: { status: InvestmentStatus.CANCELLED },
         include: { user: true, package: true },
         orderBy: { createdAt: 'asc' },
      });
      return data;
   },
};
