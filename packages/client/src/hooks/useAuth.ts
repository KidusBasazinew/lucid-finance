import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { clearTokens, setAccessToken, setRefreshToken } from '@/lib/auth';

type LoginInput = { phone: string; password: string };
type RegisterInput = {
   phone: string;
   password: string;
   email?: string;
   firstName?: string;
   lastName?: string;
   referralCode?: string;
};

export function useLogin() {
   const qc = useQueryClient();
   return useMutation({
      mutationFn: async (input: LoginInput) => {
         const res = await api.post('/auth/login', input);
         const data = res.data?.data;
         if (data?.accessToken) setAccessToken(data.accessToken);
         if (data?.refreshToken) setRefreshToken(data.refreshToken);
         await qc.invalidateQueries({ queryKey: ['me'] });
         return data;
      },
   });
}

export function useRegister() {
   const qc = useQueryClient();
   return useMutation({
      mutationFn: async (input: RegisterInput) => {
         const res = await api.post('/auth/register', input);
         const data = res.data?.data;
         if (data?.accessToken) setAccessToken(data.accessToken);
         if (data?.refreshToken) setRefreshToken(data.refreshToken);
         await qc.invalidateQueries({ queryKey: ['me'] });
         return data;
      },
   });
}

export function useMe(enabled = true) {
   return useQuery({
      queryKey: ['me'],
      queryFn: async () => {
         const res = await api.get('/users/me');
         return res.data?.data;
      },
      enabled,
      retry: 1,
   });
}

export function useLogout() {
   const qc = useQueryClient();
   return useMutation({
      mutationFn: async () => {
         clearTokens();
         await qc.clear();
      },
   });
}
