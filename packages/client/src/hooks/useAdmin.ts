import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useApproveInvestment() {
   return useMutation({
      mutationFn: async (investmentId: string) => {
         const res = await api.patch(
            `/admin/investments/${investmentId}/approve`
         );
         return res.data?.data;
      },
   });
}

export function useProcessProfits() {
   return useMutation({
      mutationFn: async () => {
         const res = await api.post('/admin/calculate-profits');
         return res.data?.data;
      },
   });
}

export function useApproveWithdrawal() {
   return useMutation({
      mutationFn: async (withdrawalId: string) => {
         const res = await api.patch(
            `/admin/withdrawals/${withdrawalId}/approve`
         );
         return res.data?.data;
      },
   });
}

export function useRejectWithdrawal() {
   return useMutation({
      mutationFn: async (withdrawalId: string) => {
         const res = await api.patch(
            `/admin/withdrawals/${withdrawalId}/reject`
         );
         return res.data?.data;
      },
   });
}

export function useMarkWithdrawalPaid() {
   return useMutation({
      mutationFn: async (withdrawalId: string) => {
         const res = await api.patch(`/admin/withdrawals/${withdrawalId}/paid`);
         return res.data?.data;
      },
   });
}

export function usePendingInvestments() {
   return {
      queryKey: ['admin', 'investments', 'pending'],
      queryFn: async () => {
         const res = await api.get('/admin/investments/pending');
         return res.data?.data ?? [];
      },
   } as const;
}

export function usePendingWithdrawals() {
   return {
      queryKey: ['admin', 'withdrawals', 'pending'],
      queryFn: async () => {
         const res = await api.get('/admin/withdrawals/pending');
         return res.data?.data ?? [];
      },
   } as const;
}
