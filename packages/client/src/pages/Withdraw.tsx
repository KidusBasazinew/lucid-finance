import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useI18n } from '@/i18n';
import {
   Wallet,
   Clock,
   CheckCircle,
   AlertCircle,
   HelpCircle,
} from 'lucide-react';
import { useMyWallet } from '@/hooks/useWallet';
import { useRequestWithdrawal, useWithdrawals } from '@/hooks/useWithdrawals';
import { useState } from 'react';
import { toast } from 'sonner';

const Withdraw = () => {
   const { t } = useI18n();
   const { data: wallet } = useMyWallet();
   const { data: wPage } = useWithdrawals({ page: 1, limit: 20 });
   const request = useRequestWithdrawal();

   const [amount, setAmount] = useState('');
   const [method, setMethod] = useState('Bank Transfer');
   const [account, setAccount] = useState('');
   const [notes, setNotes] = useState('');

   const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const cents = Math.round(parseFloat(amount || '0') * 100);
      if (!cents || cents < 30000) {
         toast.error(
            t('withdraw.minError', 'Minimum withdrawal is 300.00 Birr')
         );
         return;
      }
      try {
         await request.mutateAsync({
            amountCents: cents,
            destination: `${method}: ${account}${notes ? ` (${notes})` : ''}`,
         });
         toast.success(t('withdraw.success', 'Withdrawal requested'));
         setAmount('');
         setAccount('');
         setNotes('');
      } catch (e: any) {
         const msg =
            e?.response?.data?.message || t('withdraw.error', 'Request failed');
         toast.error(msg);
      }
   };

   return (
      <div className="min-h-screen bg-[#09090b] text-white overflow-hidden">
         <Navigation />

         <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
            <div
               className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-600/15 rounded-full blur-[100px] animate-pulse"
               style={{ animationDelay: '1s' }}
            />
            <div
               className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[80px] animate-pulse"
               style={{ animationDelay: '2s' }}
            />
         </div>

         <div
            className="fixed inset-0 pointer-events-none opacity-[0.015]"
            style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
         />

         <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 animate-slide-up">
               <h1 className="text-3xl font-bold text-foreground mb-2">
                  {t('withdraw.title', 'Withdraw Funds')}
               </h1>
               <p className="text-muted-foreground">
                  {t(
                     'withdraw.subtitle',
                     'Request a withdrawal from your available balance'
                  )}
               </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
               {/* Withdrawal Form */}
               <div className="lg:col-span-2 space-y-6">
                  <Card className="p-6 shadow-custom-md bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm">
                     <div className="mb-6">
                        <h2 className="text-xl font-semibold text-foreground mb-4">
                           {t('withdraw.availableBalance', 'Available Balance')}
                        </h2>
                        <div className="bg-gradient-to-r from-green-900 to-green-600 rounded-xl p-6 text-success-foreground">
                           <p className="text-sm text-white opacity-90 mb-1">
                              {t('withdraw.totalAvailable', 'Total Available')}
                           </p>
                           <p className="text-4xl font-bold text-white">
                              {(
                                 (wallet?.balanceCents ?? 0) / 100
                              ).toLocaleString()}{' '}
                              Birr
                           </p>
                        </div>
                     </div>

                     <form className="space-y-5" onSubmit={onSubmit}>
                        <div>
                           <Label htmlFor="amount">
                              {t('withdraw.amountLabel', 'Withdrawal Amount')}
                           </Label>
                           <div className="relative mt-1.5">
                              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground">
                                 Birr
                              </span>
                              <Input
                                 id="amount"
                                 type="number"
                                 placeholder="0.00"
                                 className="pl-12"
                                 value={amount}
                                 onChange={(e) => setAmount(e.target.value)}
                              />
                           </div>
                           <p className="text-sm text-muted-foreground mt-1.5">
                              {t(
                                 'withdraw.minAmountLine',
                                 'Minimum withdrawal: 300.00 Birr'
                              )}
                           </p>
                        </div>

                        <div>
                           <Label htmlFor="payment-method">
                              {t('withdraw.paymentMethod', 'Payment Method')}
                           </Label>
                           <select
                              id="payment-method"
                              className="w-full mt-1.5 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                              value={method}
                              onChange={(e) => setMethod(e.target.value)}
                           >
                              <option value="Bank Transfer">
                                 {t('withdraw.method.cbe', 'CBE Bank')}
                              </option>
                              <option value="PayPal">
                                 {t(
                                    'withdraw.method.abisiniaBank',
                                    'Abisinia Bank'
                                 )}
                              </option>
                              <option value="Crypto Wallet">
                                 {t('withdraw.method.teleBirr', 'Tele Birr')}
                              </option>
                           </select>
                        </div>

                        <div>
                           <Label htmlFor="account-details">
                              {t('withdraw.accountDetails', 'Account Details')}
                           </Label>
                           <Input
                              id="account-details"
                              type="text"
                              placeholder={t(
                                 'withdraw.accountPlaceholder',
                                 'Enter your account number or wallet address'
                              )}
                              className="mt-1.5"
                              value={account}
                              onChange={(e) => setAccount(e.target.value)}
                           />
                        </div>

                        <div>
                           <Label htmlFor="notes">
                              {t('withdraw.notes', 'Notes (Optional)')}
                           </Label>
                           <textarea
                              id="notes"
                              rows={3}
                              placeholder={t(
                                 'withdraw.notesPlaceholder',
                                 'Any special instructions...'
                              )}
                              className="w-full mt-1.5 rounded-md border border-input bg-background px-3 py-2 text-sm"
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                           />
                        </div>

                        <Button
                           className="w-full px-10  text-lg font-semibold rounded-2xl
                            bg-gradient-to-r from-violet-600 to-fuchsia-600 
                            hover:from-violet-500 hover:to-fuchsia-500 text-white 
                            border-0 shadow-xl shadow-violet-600/30 transition-all"
                           size="lg"
                           type="submit"
                           disabled={request.isPending}
                        >
                           <Wallet className="w-5 h-5 mr-2" />
                           {request.isPending
                              ? t('withdraw.submitting', 'Submitting...')
                              : t('withdraw.submit', 'Request Withdrawal')}
                        </Button>
                     </form>
                  </Card>

                  {/* Withdrawal History */}
                  <Card className="p-6 shadow-custom-md bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm">
                     <h2 className="text-xl font-semibold text-foreground mb-6">
                        {t('withdraw.history', 'Withdrawal History')}
                     </h2>
                     <div className="space-y-4">
                        {(wPage?.data ?? []).map(
                           (withdrawal: any, index: number) => (
                              <div
                                 key={index}
                                 className="flex items-center justify-between p-4 bg-zinc-900/30 rounded-lg hover:bg-zinc-900/40 transition-colors border border-zinc-800"
                              >
                                 <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-success-light flex items-center justify-center">
                                       <CheckCircle className="w-5 h-5 text-success" />
                                    </div>
                                    <div>
                                       <p className="font-medium text-foreground">
                                          Birr{' '}
                                          {(
                                             withdrawal.amountCents / 100
                                          ).toLocaleString()}
                                       </p>
                                       <p className="text-sm text-muted-foreground">
                                          {withdrawal.id}
                                       </p>
                                    </div>
                                 </div>
                                 <div className="text-right">
                                    <p className="text-sm text-muted-foreground">
                                       {withdrawal.createdAt
                                          ? new Date(
                                               withdrawal.createdAt
                                            ).toLocaleDateString()
                                          : ''}
                                    </p>
                                    <p className="text-xs text-success font-medium">
                                       {withdrawal.status ?? 'completed'}
                                    </p>
                                 </div>
                              </div>
                           )
                        )}
                     </div>
                  </Card>
               </div>

               {/* Info Sidebar */}
               <div className="space-y-6">
                  <Card className="p-6 shadow-custom-md bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm">
                     <h3 className="text-lg font-semibold text-foreground mb-4">
                        {t('withdraw.infoTitle', 'Withdrawal Info')}
                     </h3>
                     <div className="space-y-4">
                        <div className="flex gap-3">
                           <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                           <div>
                              <p className="font-medium text-foreground text-sm">
                                 {t(
                                    'withdraw.processingTime',
                                    'Processing Time'
                                 )}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                 {t(
                                    'withdraw.processingTimeDetail',
                                    '1-3 business days'
                                 )}
                              </p>
                           </div>
                        </div>
                        <div className="flex gap-3">
                           <Wallet className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                           <div>
                              <p className="font-medium text-foreground text-sm">
                                 {t('withdraw.minimumLabel', 'Minimum Amount')}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                 {t(
                                    'withdraw.minimumAmountDetail',
                                    '300.00 Birr per withdrawal'
                                 )}
                              </p>
                           </div>
                        </div>
                        <div className="flex gap-3">
                           <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                           <div>
                              <p className="font-medium text-foreground text-sm">
                                 {t('withdraw.fees', 'Fees')}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                 {t(
                                    'withdraw.feesDetail',
                                    'No fees for VIP members'
                                 )}
                              </p>
                           </div>
                        </div>
                     </div>
                  </Card>

                  <Card className="p-6 shadow-custom-md bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm">
                     <div className="flex gap-3">
                        <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                        <h3 className="text-lg font-semibold text-foreground">
                           {t('withdraw.important', 'Important')}
                        </h3>
                     </div>
                     <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>
                           {t(
                              'withdraw.tip1',
                              '• Ensure account details are correct'
                           )}
                        </li>
                        <li>
                           {t(
                              'withdraw.tip2',
                              '• Withdrawals are processed Mon-Fri'
                           )}
                        </li>
                        <li>
                           {t(
                              'withdraw.tip3',
                              '• VIP members get priority processing'
                           )}
                        </li>
                     </ul>
                  </Card>
               </div>
            </div>
         </main>
      </div>
   );
};

export default Withdraw;
