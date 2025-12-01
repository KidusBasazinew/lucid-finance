import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'lf_access_token';
const REFRESH_TOKEN_KEY = 'lf_refresh_token';

export function getAccessToken(): string | undefined {
   return Cookies.get(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string) {
   Cookies.set(ACCESS_TOKEN_KEY, token, { path: '/', sameSite: 'lax' });
}

export function getRefreshToken(): string | undefined {
   return Cookies.get(REFRESH_TOKEN_KEY);
}

export function setRefreshToken(token: string) {
   Cookies.set(REFRESH_TOKEN_KEY, token, { path: '/', sameSite: 'lax' });
}

export function clearTokens() {
   Cookies.remove(ACCESS_TOKEN_KEY, { path: '/' });
   Cookies.remove(REFRESH_TOKEN_KEY, { path: '/' });
}

export function isAuthenticated() {
   return Boolean(getAccessToken());
}
