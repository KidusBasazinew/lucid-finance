import axios, { AxiosError } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import {
   clearTokens,
   getAccessToken,
   getRefreshToken,
   setAccessToken,
   setRefreshToken,
} from './auth';

const baseURL = '/api/v1';

function createRaw(): AxiosInstance {
   const instance = axios.create({ baseURL, withCredentials: true });
   return instance;
}

export const api = createRaw();

let isRefreshing = false;
let pendingQueue: Array<{
   resolve: (token: string) => void;
   reject: (err: any) => void;
}> = [];

function onRefreshed(token: string) {
   pendingQueue.forEach((p) => p.resolve(token));
   pendingQueue = [];
}
function onRefreshFailed(err: any) {
   pendingQueue.forEach((p) => p.reject(err));
   pendingQueue = [];
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
   const token = getAccessToken();
   if (token) {
      config.headers = config.headers ?? {};
      (config.headers as any).Authorization = `Bearer ${token}`;
   }
   // Dev-only insight to confirm Authorization header presence
   if (import.meta && (import.meta as any).env?.DEV) {
      try {
         const url = (config as any).url ?? '';
         // Avoid logging refresh endpoint spam
         if (!String(url).includes('/auth/refresh')) {
            // eslint-disable-next-line no-console
            console.debug(
               '[api] request',
               (config.method || 'get').toUpperCase(),
               url,
               'auth:',
               !!token
            );
         }
      } catch {}
   }
   return config;
});

api.interceptors.response.use(
   (res) => res,
   async (error: AxiosError) => {
      const original = error.config as
         | (InternalAxiosRequestConfig & { _retry?: boolean })
         | undefined;
      const status = error.response?.status;
      if (status === 401 && original && !original._retry) {
         original._retry = true;
         const refreshToken = getRefreshToken();
         if (!refreshToken) {
            clearTokens();
            return Promise.reject(error);
         }
         if (isRefreshing) {
            return new Promise((resolve, reject) => {
               pendingQueue.push({
                  resolve: (token: string) => {
                     original.headers = original.headers ?? {};
                     (original.headers as any).Authorization =
                        `Bearer ${token}`;
                     resolve(api(original));
                  },
                  reject,
               });
            });
         }
         isRefreshing = true;
         try {
            const raw = createRaw();
            const resp = await raw.post('/auth/refresh', { refreshToken });
            const data: any = resp.data?.data;
            if (data?.accessToken && data?.refreshToken) {
               setAccessToken(data.accessToken);
               setRefreshToken(data.refreshToken);
               onRefreshed(data.accessToken);
               original.headers = original.headers ?? {};
               (original.headers as any).Authorization =
                  `Bearer ${data.accessToken}`;
               return api(original);
            }
            throw new Error('Invalid refresh response');
         } catch (e) {
            clearTokens();
            onRefreshFailed(e);
            return Promise.reject(e);
         } finally {
            isRefreshing = false;
         }
      }
      return Promise.reject(error);
   }
);
