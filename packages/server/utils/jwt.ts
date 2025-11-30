import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_TTL = '15m';
const REFRESH_TOKEN_TTL = '7d';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const JWT_REFRESH_SECRET =
   process.env.JWT_REFRESH_SECRET || 'dev_refresh_change_me';

export type JwtPayload = {
   sub: string; // user id
   type: 'access' | 'refresh';
};

export function signAccessToken(userId: string) {
   const payload: JwtPayload = { sub: userId, type: 'access' };
   return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_TTL });
}

export function signRefreshToken(userId: string) {
   const payload: JwtPayload = { sub: userId, type: 'refresh' };
   return jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: REFRESH_TOKEN_TTL,
   });
}

export function verifyAccessToken(token: string): JwtPayload {
   return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
   return jwt.verify(token, JWT_REFRESH_SECRET) as JwtPayload;
}
