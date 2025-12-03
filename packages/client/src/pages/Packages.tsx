import Navigation from '@/components/Navigation';
import PackageCard from '@/components/PackageCard';
import { usePackages } from '@/hooks/usePackages';
import { useCreateInvestment } from '@/hooks/useInvestments';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { isAuthenticated } from '@/lib/auth';

import { useState } from 'react';
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const Packages = () => {
   const navigate = useNavigate();
   const { data: page } = usePackages({ page: 1, limit: 50, active: true });
   const invest = useCreateInvestment();

   const [open, setOpen] = useState(false);
   const [selectedId, setSelectedId] = useState<string | null>(null);

   const items = page?.data ?? [];
   const formatMoney = (cents: number) => (cents / 100).toLocaleString();

   const onInvestClick = async (id: string) => {
      if (!isAuthenticated()) {
         navigate('/login', { replace: true });
         return;
      }

      setSelectedId(id);
      setOpen(true);
   };

   const confirmPayment = async () => {
      if (!selectedId) return;
      try {
         await invest.mutateAsync({ packageId: selectedId });
         toast.success('Investment created');
         setOpen(false);
         navigate('/dashboard');
      } catch (e: any) {
         const msg = e?.response?.data?.message || 'Failed to invest';
         toast.error(msg);
      }
   };

   return (
      <>
         <div className="min-h-screen bg-background">
            <Navigation />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
               <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">
                     VIP Investment{' '}
                     <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                        Packages
                     </span>
                  </h2>

                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                     Choose the package that fits your investment goals. All
                     packages include daily profits, referral bonuses, and
                     secure withdrawals.
                  </p>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((pkg: any, index: number) => {
                     let color = ['green', 'blue', 'purple'];
                     return (
                        <div
                           key={pkg.id ?? index}
                           className="animate-fade-in"
                           style={{ animationDelay: `${index * 0.1}s` }}
                        >
                           <PackageCard
                              name={pkg.name}
                              amount={formatMoney(pkg.amountCents)}
                              dailyProfit={`${(pkg.dailyProfitBps / 100).toFixed(2)}%`}
                              duration={`${pkg.durationDays} days`}
                              totalReturn={formatMoney(
                                 pkg.totalReturnBps * 100
                              )}
                              referralBonus={`${(pkg.referralBonusBps / 100).toFixed(2)}%`}
                              // featured={Boolean(pkg.featured)}
                              features={pkg.features ?? []}
                              onInvest={() => onInvestClick(pkg.id)}
                              color={
                                 color[index % 3] as 'green' | 'blue' | 'purple'
                              }
                           />
                        </div>
                     );
                  })}
               </div>

               <div className="mt-16 bg-card rounded-xl p-8 shadow-custom-md text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                     Need Help Choosing?
                  </h2>
                  <p className="text-muted-foreground mb-6">
                     Our investment advisors are ready to help you select the
                     perfect package for your goals
                  </p>
                  <button className="px-6 py-3 gradient-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
                     Contact Support
                  </button>
               </div>
            </main>
         </div>
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Complete Payment</DialogTitle>
               </DialogHeader>

               <div className="space-y-4 text-center">
                  <p className="text-muted-foreground">
                     Pay using TeleBirr by scanning theQR code below
                  </p>

                  {/* TeleBirr QR Code */}
                  <img
                     src="/telebirr_qr_code.png"
                     alt="TeleBirr QR"
                     className="w-48 mx-auto border rounded-lg shadow"
                  />

                  <p className="text-sm text-muted-foreground">
                     After paying, click “Confirm Payment”
                  </p>
               </div>

               <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                     Cancel
                  </Button>

                  <Button onClick={confirmPayment}>
                     I have paid — Confirm
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </>
   );
};

export default Packages;
