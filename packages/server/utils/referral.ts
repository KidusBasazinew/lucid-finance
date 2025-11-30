export function generateReferralCode(prefix = 'LF'): string {
   const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
   return `${prefix}${rand}`;
}
