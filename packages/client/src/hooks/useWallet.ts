import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useMyWallet() {
   return useQuery({
      queryKey: ['wallet', 'me'],
      queryFn: async () => {
         const res = await api.get('/wallet/me');
         return res.data?.data; // { balanceCents, ... }
      },
   });
}
