import Navigation from '@/components/Navigation';
import PackageCard from '@/components/PackageCard';
import { usePackages } from '@/hooks/usePackages';
import { useCreateInvestment } from '@/hooks/useInvestments';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { isAuthenticated } from '@/lib/auth';
import { useI18n } from '@/i18n';

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
   const { t } = useI18n();
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
         toast.success(t('packages.toastSuccess', 'Investment created'));
         setOpen(false);
         navigate('/dashboard');
      } catch (e: any) {
         const msg =
            e?.response?.data?.message ||
            t('packages.toastFail', 'Failed to invest');
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
                     {t('packages.title', 'VIP Investment')}{' '}
                     <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                        {t('packages.titleHighlight', 'Packages')}
                     </span>
                  </h2>

                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                     {t(
                        'packages.subtitle',
                        'Choose the package that fits your investment goals. All packages include daily profits, referral bonuses, and secure withdrawals.'
                     )}
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

               <div className="mt-16">
                  <div
                     className="relative rounded-3xl bg-gradient-to-br from-violet-600/20 via-fuchsia-600/10 to-cyan-600/20 
                  border border-white/10 p-12 md:p-20 text-center overflow-hidden shadow-xl"
                  >
                     {/* Animated glowing background */}
                     <div
                        className="absolute inset-0 rounded-3xl bg-gradient-to-r 
                      from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 blur-xl"
                     />

                     <div className="relative z-10">
                        {/* Icon container (styled same as your rocket section) */}
                        <div
                           className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 
                         flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-500/30"
                        >
                           <span className="text-white text-3xl">💬</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                           {t('packages.helpTitle', 'Need Help Choosing?')}
                        </h2>

                        <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10">
                           {t(
                              'packages.helpBody',
                              'Our investment advisors are ready to help you select the perfect package for your goals.'
                           )}
                        </p>

                        <button
                           className="px-10 h-14 text-lg font-semibold rounded-2xl
                            bg-gradient-to-r from-violet-600 to-fuchsia-600 
                            hover:from-violet-500 hover:to-fuchsia-500 text-white 
                            border-0 shadow-xl shadow-violet-600/30 transition-all"
                        >
                           {t('packages.helpCta', 'Contact Support')}
                        </button>
                     </div>
                  </div>
               </div>
            </main>
         </div>
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>
                     {t('packages.dialogTitle', 'Complete Payment')}
                  </DialogTitle>
               </DialogHeader>

               <div className="space-y-5 text-center">
                  <p className="text-muted-foreground text-base">
                     {t(
                        'packages.dialogIntro',
                        'Follow the steps below to complete your payment using TeleBirr'
                     )}
                  </p>

                  <div className="max-w-md mx-auto text-left space-y-3">
                     <div className="flex gap-3">
                        <span className="font-bold">1.</span>
                        <p>
                           {t(
                              'packages.step1',
                              'Open TeleBirr and send the payment to the following number:'
                           )}
                           <br />
                           <span className="font-semibold text-lg">
                              {t('packages.telebirrNumber', '0940414255')}
                           </span>
                        </p>
                     </div>

                     <div className="flex gap-3">
                        <span className="font-bold">2.</span>
                        <p>
                           {t(
                              'packages.step2',
                              'Take a screenshot of the payment confirmation.'
                           )}
                        </p>
                     </div>

                     <div className="flex gap-3">
                        <span className="font-bold">3.</span>
                        <p>
                           {t(
                              'packages.step3',
                              'Open Telegram and send the screenshot to the following user:'
                           )}
                           <br />
                           <a
                              href="https://t.me/official_lucidfinance"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-primary underline underline-offset-4 hover:opacity-80"
                           >
                              {t('packages.telegramUser', '@lucidfinance')}
                           </a>
                        </p>
                     </div>

                     <div className="flex gap-3">
                        <span className="font-bold">4.</span>
                        <p>
                           {t(
                              'packages.step4',
                              'Return to this page and click “I have paid — Confirm”.'
                           )}
                        </p>
                     </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                     {t(
                        'packages.paymentWarning',
                        'Make sure the screenshot clearly shows the amount, date, and transaction ID.'
                     )}
                  </p>
               </div>

               <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                     {t('packages.dialogCancel', 'Cancel')}
                  </Button>

                  <Button onClick={confirmPayment}>
                     {t('packages.dialogConfirm', 'I have paid — Confirm')}
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </>
   );
};

export default Packages;
