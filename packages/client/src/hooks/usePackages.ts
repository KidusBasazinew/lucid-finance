import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function usePackages(params?: {
   page?: number;
   limit?: number;
   active?: boolean;
}) {
   return useQuery({
      queryKey: ['packages', params],
      queryFn: async () => {
         const res = await api.get('/packages', { params });
         return res.data?.data; // paginated: { data, total, page, ... }
      },
   });
}

export function usePackage(id?: string) {
   return useQuery({
      queryKey: ['packages', id],
      queryFn: async () => {
         const res = await api.get(`/packages/${id}`);
         return res.data?.data;
      },
      enabled: Boolean(id),
   });
}

export function useCreatePackage() {
   const qc = useQueryClient();
   return useMutation({
      mutationFn: async (input: any) => {
         const res = await api.post('/packages', input);
         return res.data?.data;
      },
      onSuccess: () => {
         qc.invalidateQueries({ queryKey: ['packages'] });
      },
   });
}

export function useUpdatePackage() {
   const qc = useQueryClient();
   return useMutation({
      mutationFn: async ({ id, input }: { id: string; input: any }) => {
         const res = await api.patch(`/packages/${id}`, input);
         return res.data?.data;
      },
      onSuccess: (_d, vars) => {
         qc.invalidateQueries({ queryKey: ['packages'] });
         qc.invalidateQueries({ queryKey: ['packages', vars.id] });
      },
   });
}
