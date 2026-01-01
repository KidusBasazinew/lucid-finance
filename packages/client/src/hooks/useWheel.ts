import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useClaimWheelReward() {
   const qc = useQueryClient();
   return useMutation({
      mutationFn: async (input: { amountBirr: number }) => {
         const res = await api.post('/wheel/claim', input);
         return res.data?.data;
      },
      onSuccess: () => {
         qc.invalidateQueries({ queryKey: ['wallet', 'me'] });
         qc.invalidateQueries({ queryKey: ['transactions'] });
         qc.invalidateQueries({ queryKey: ['me'] });
      },
   });
}

export function useReserveWheelSpin() {
   const qc = useQueryClient();
   return useMutation({
      mutationFn: async () => {
         const res = await api.post('/wheel/spin');
         return res.data?.data;
      },
      onSuccess: () => {
         qc.invalidateQueries({ queryKey: ['me'] });
      },
   });
}
