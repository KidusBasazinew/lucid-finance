import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useInvestments(params?: { page?: number; limit?: number }) {
   return useQuery({
      queryKey: ['investments', params],
      queryFn: async () => {
         const res = await api.get('/investments', { params });
         return res.data?.data; // paginated
      },
   });
}

export function useCreateInvestment() {
   const qc = useQueryClient();
   return useMutation({
      mutationFn: async (input: { packageId: string }) => {
         const res = await api.post('/investments', input);
         return res.data?.data;
      },
      onSuccess: () => {
         qc.invalidateQueries({ queryKey: ['investments'] });
         qc.invalidateQueries({ queryKey: ['wallet', 'me'] });
         qc.invalidateQueries({ queryKey: ['transactions'] });
      },
   });
}
