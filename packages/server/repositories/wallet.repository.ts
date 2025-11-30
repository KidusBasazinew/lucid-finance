import { prisma } from '../lib/prisma';

export const walletRepository = {
   findByUserId(userId: string) {
      return prisma.wallet.findUnique({ where: { userId } });
   },
   async increaseBalance(userId: string, amountCents: number) {
      return prisma.wallet.update({
         where: { userId },
         data: { balanceCents: { increment: amountCents } },
      });
   },
   async decreaseBalance(userId: string, amountCents: number) {
      return prisma.wallet.update({
         where: { userId },
         data: { balanceCents: { decrement: amountCents } },
      });
   },
};
