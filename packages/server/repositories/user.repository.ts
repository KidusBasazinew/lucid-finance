import { prisma } from '../lib/prisma';
import type { Role, UserStatus } from '@prisma/client';

export const userRepository = {
   findById(id: string) {
      return prisma.user.findUnique({ where: { id } });
   },
   findByPhone(phone: string) {
      return prisma.user.findUnique({ where: { phone } });
   },
   findByEmail(email: string) {
      return prisma.user.findUnique({ where: { email } });
   },
   findByReferralCode(referralCode: string) {
      return prisma.user.findUnique({ where: { referralCode } });
   },
   async create(data: {
      phone: string;
      email?: string;
      passwordHash: string;
      firstName?: string;
      lastName?: string;
      referralCode: string;
      referredById?: string;
      role?: Role;
      status?: UserStatus;
   }) {
      const user = await prisma.user.create({ data });
      await prisma.wallet.create({
         data: { userId: user.id, balanceCents: 0 },
      });
      return user;
   },
   withWalletById(id: string) {
      return prisma.user.findUnique({
         where: { id },
         include: { wallet: true },
      });
   },
};
