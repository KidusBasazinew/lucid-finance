import { walletRepository } from '../repositories/wallet.repository';

export const walletService = {
   getForUser(userId: string) {
      return walletRepository.findByUserId(userId);
   },
};
