import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useWithdrawals(params?: { page?: number; limit?: number }) {
   return useQuery({
      queryKey: ['withdrawals', params],
      queryFn: async () => {
         const res = await api.get('/withdrawals', { params });
         return res.data?.data; // paginated
      },
   });
}

export function useRequestWithdrawal() {
   const qc = useQueryClient();
   return useMutation({
      mutationFn: async (input: {
         amountCents: number;
         destination: string;
      }) => {
         const res = await api.post('/withdrawals', input);
         return res.data?.data;
      },
      onSuccess: () => {
         qc.invalidateQueries({ queryKey: ['withdrawals'] });
         qc.invalidateQueries({ queryKey: ['wallet', 'me'] });
         qc.invalidateQueries({ queryKey: ['transactions'] });
      },
   });
}
