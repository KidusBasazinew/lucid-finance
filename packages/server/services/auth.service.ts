import { userRepository } from '../repositories/user.repository';
import { comparePassword, hashPassword } from '../utils/password';
import { generateReferralCode } from '../utils/referral';
import {
   signAccessToken,
   signRefreshToken,
   verifyRefreshToken,
} from '../utils/jwt';

export const authService = {
   async register(input: {
      phone: string;
      password: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      referralCode?: string;
   }) {
      const existing = await userRepository.findByPhone(input.phone);
      if (existing)
         throw Object.assign(new Error('Phone already registered'), {
            status: 400,
         });
      if (input.email) {
         const existingEmail = await userRepository.findByEmail(input.email);
         if (existingEmail)
            throw Object.assign(new Error('Email already registered'), {
               status: 400,
            });
      }

      let referredById: string | undefined;
      if (input.referralCode) {
         const referrer = await userRepository.findByReferralCode(
            input.referralCode
         );
         if (!referrer)
            throw Object.assign(new Error('Invalid referral code'), {
               status: 400,
            });
         referredById = referrer.id;
      }

      let referralCode = generateReferralCode();
      // ensure unique referralCode
      for (let i = 0; i < 5; i++) {
         const exists = await userRepository.findByReferralCode(referralCode);
         if (!exists) break;
         referralCode = generateReferralCode();
      }

      const passwordHash = await hashPassword(input.password);

      const user = await userRepository.create({
         phone: input.phone,
         email: input.email,
         passwordHash,
         firstName: input.firstName,
         lastName: input.lastName,
         referralCode,
         referredById,
      });

      const accessToken = signAccessToken(user.id);
      const refreshToken = signRefreshToken(user.id);

      return { user, accessToken, refreshToken };
   },

   async login(input: { phone: string; password: string }) {
      const user = await userRepository.findByPhone(input.phone);
      if (!user)
         throw Object.assign(new Error('Invalid credentials'), { status: 401 });
      const ok = await comparePassword(input.password, user.passwordHash);
      if (!ok)
         throw Object.assign(new Error('Invalid credentials'), { status: 401 });
      const accessToken = signAccessToken(user.id);
      const refreshToken = signRefreshToken(user.id);
      return { user, accessToken, refreshToken };
   },

   async refresh(input: { refreshToken: string }) {
      const payload = verifyRefreshToken(input.refreshToken);
      if (payload.type !== 'refresh')
         throw Object.assign(new Error('Invalid token'), { status: 401 });
      const accessToken = signAccessToken(payload.sub);
      const refreshToken = signRefreshToken(payload.sub);
      return { accessToken, refreshToken };
   },
};
