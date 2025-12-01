import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useReferrals(
   params?: { page?: number; limit?: number },
   options?: Omit<
      UseQueryOptions<any, unknown, any, any[]>,
      'queryKey' | 'queryFn'
   >
) {
   return useQuery({
      queryKey: ['referrals', params],
      queryFn: async () => {
         const res = await api.get('/referrals', { params });
         return res.data?.data; // paginated
      },
      ...options,
   });
}
