import { withdrawalRepository } from '../repositories/withdrawal.repository';
import { walletRepository } from '../repositories/wallet.repository';
import { getPagination, buildPaginated } from '../utils/pagination';

export const withdrawalService = {
   async request(
      userId: string,
      input: { amountCents: number; destination: string }
   ) {
      const wallet = await walletRepository.findByUserId(userId);
      if (!wallet)
         throw Object.assign(new Error('Wallet not found'), { status: 404 });
      if (input.amountCents <= 0)
         throw Object.assign(new Error('Invalid amount'), { status: 400 });
      if (wallet.balanceCents < input.amountCents)
         throw Object.assign(new Error('Insufficient balance'), {
            status: 400,
         });
      // deduct immediately
      await walletRepository.decreaseBalance(userId, input.amountCents);
      return withdrawalRepository.create({
         user: { connect: { id: userId } },
         amountCents: input.amountCents,
         destination: input.destination,
         status: 'PENDING',
      } as any);
   },
   async listByUser(userId: string, query: any) {
      const { page, limit, skip, sort, order } = getPagination(query);
      const { data, total } = await withdrawalRepository.listByUser(userId, {
         skip,
         take: limit,
         orderBy: { [sort]: order } as any,
      });
      return buildPaginated(data, total, { page, limit, skip, sort, order });
   },
};
