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
         data: { status: 'ACTIVE', startDate: new Date() },
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
      const investments = await prisma.investment.findMany({
         where: { status: 'ACTIVE' },
      });
      const today = new Date();
      const ymd = (d: Date) =>
         `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`;
      const msPerDay = 24 * 60 * 60 * 1000;
      const startOfUTC = (d: Date) =>
         new Date(
            Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
         );
      const todayUTC = startOfUTC(today);
      for (const inv of investments) {
         const pack = await packageRepository.findById(inv.packageId);
         if (!pack) continue;
         const startUTC = startOfUTC(new Date(inv.startDate));
         const elapsedDays = Math.floor(
            (todayUTC.getTime() - startUTC.getTime()) / msPerDay
         );
         const totalDays = pack.durationDays;
         const dueDays = Math.min(elapsedDays, totalDays);
         const dailyCents = Math.floor(
            (inv.amountCents * inv.dailyProfitBps) / 10000
         );
         for (let i = 0; i < dueDays; i++) {
            const creditDate = new Date(startUTC.getTime() + i * msPerDay);
            const ref = `PROF-${inv.id}-${ymd(creditDate)}`;
            const exists = await transactionRepository.existsByReference(ref);
            if (!exists) {
               await walletRepository.increaseBalance(inv.userId, dailyCents);
               await transactionService.create(inv.userId, {
                  type: 'PROFIT' as any,
                  amountCents: dailyCents,
                  status: 'SUCCESS' as any,
                  reference: ref,
                  metadata: { investmentId: inv.id, date: ymd(creditDate) },
               });
            }
         }
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
