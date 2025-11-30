import { z } from 'zod';

export const createPackageSchema = z.object({
   name: z.string().min(2),
   amountCents: z.number().int().positive(),
   dailyProfitBps: z.number().int().positive(),
   durationDays: z.number().int().positive(),
   totalReturnBps: z.number().int().positive(),
   referralBonusBps: z.number().int().nonnegative(),
   features: z.array(z.string()).default([]),
   active: z.boolean().optional(),
});

export const updatePackageSchema = createPackageSchema.partial();
