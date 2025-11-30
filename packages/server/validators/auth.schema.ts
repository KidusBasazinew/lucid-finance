import { z } from 'zod';

export const registerSchema = z.object({
   phone: z.string().min(6),
   password: z.string().min(6),
   email: z
      .string()
      .email()
      .optional()
      .or(z.literal('').transform(() => undefined)),
   firstName: z.string().optional(),
   lastName: z.string().optional(),
   referralCode: z.string().optional(),
});

export const loginSchema = z.object({
   phone: z.string().min(6),
   password: z.string().min(6),
});

export const refreshSchema = z.object({
   refreshToken: z.string().min(10),
});
