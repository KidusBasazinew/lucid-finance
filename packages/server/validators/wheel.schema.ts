import { z } from 'zod';

// Client sends the winning amount in Birr (integer).
// Backend converts to cents and validates against allow-list.
export const wheelClaimSchema = z.object({
   amountBirr: z.coerce.number().int().positive(),
});
