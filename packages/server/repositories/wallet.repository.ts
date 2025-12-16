import { prisma } from '../lib/prisma';

export const walletRepository = {
   findByUserId(userId: string) {
      return prisma.wallet.findUnique({ where: { userId } });
   },
   async ensureWallet(userId: string) {
      return prisma.wallet.upsert({
         where: { userId },
         update: {},
         create: { userId, balanceCents: 0 },
      });
   },
   async increaseBalance(userId: string, amountCents: number) {
      await this.ensureWallet(userId);
      return prisma.wallet.update({
         where: { userId },
         data: { balanceCents: { increment: amountCents } },
      });
   },
   async decreaseBalance(userId: string, amountCents: number) {
      await this.ensureWallet(userId);
      return prisma.wallet.update({
         where: { userId },
         data: { balanceCents: { decrement: amountCents } },
      });
   },
};
