import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useTransactions(params?: { page?: number; limit?: number }) {
   return useQuery({
      queryKey: ['transactions', params],
      queryFn: async () => {
         const res = await api.get('/transactions', { params });
         return res.data?.data; // paginated
      },
   });
}
