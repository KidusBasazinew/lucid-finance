import { transactionRepository } from '../repositories/transaction.repository';
import { getPagination, buildPaginated } from '../utils/pagination';

export const transactionService = {
   async create(
      userId: string,
      input: {
         type: any;
         amountCents: number;
         status?: any;
         reference: string;
         metadata?: any;
      }
   ) {
      return transactionRepository.create({
         user: { connect: { id: userId } },
         type: input.type,
         amountCents: input.amountCents,
         status: input.status ?? 'PENDING',
         reference: input.reference,
         metadata: input.metadata ?? null,
      } as any);
   },
   async listByUser(userId: string, query: any) {
      const { page, limit, skip, sort, order } = getPagination(query);
      const { data, total } = await transactionRepository.listByUser(userId, {
         skip,
         take: limit,
         orderBy: { [sort]: order } as any,
      });
      return buildPaginated(data, total, { page, limit, skip, sort, order });
   },
};
