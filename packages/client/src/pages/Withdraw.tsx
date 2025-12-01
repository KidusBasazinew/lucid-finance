import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useMyWallet } from '@/hooks/useWallet';
import { useRequestWithdrawal, useWithdrawals } from '@/hooks/useWithdrawals';
import { useState } from 'react';
import { toast } from 'sonner';

const Withdraw = () => {
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
      if (!cents || cents < 5000) {
         toast.error('Minimum withdrawal is $50.00');
         return;
      }
      try {
         await request.mutateAsync({
            amountCents: cents,
            destination: `${method}: ${account}${notes ? ` (${notes})` : ''}`,
         });
         toast.success('Withdrawal requested');
         setAmount('');
         setAccount('');
         setNotes('');
      } catch (e: any) {
         const msg = e?.response?.data?.message || 'Request failed';
         toast.error(msg);
      }
   };

   return (
      <div className="min-h-screen bg-background">
         <Navigation />

         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 animate-slide-up">
               <h1 className="text-3xl font-bold text-foreground mb-2">
                  Withdraw Funds
               </h1>
               <p className="text-muted-foreground">
                  Request a withdrawal from your available balance
               </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
               {/* Withdrawal Form */}
               <div className="lg:col-span-2 space-y-6">
                  <Card className="p-6 shadow-custom-md">
                     <div className="mb-6">
                        <h2 className="text-xl font-semibold text-foreground mb-4">
                           Available Balance
                        </h2>
                        <div className="bg-gradient-to-r from-green-400 to-green-300 rounded-xl p-6 text-success-foreground">
                           <p className="text-sm text-white opacity-90 mb-1">
                              Total Available
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
                           <Label htmlFor="amount">Withdrawal Amount</Label>
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
                              Minimum withdrawal: 50.00 Birr
                           </p>
                        </div>

                        <div>
                           <Label htmlFor="payment-method">
                              Payment Method
                           </Label>
                           <select
                              id="payment-method"
                              className="w-full mt-1.5 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                              value={method}
                              onChange={(e) => setMethod(e.target.value)}
                           >
                              <option>Bank Transfer</option>
                              <option>PayPal</option>
                              <option>Crypto Wallet</option>
                              <option>Wire Transfer</option>
                           </select>
                        </div>

                        <div>
                           <Label htmlFor="account-details">
                              Account Details
                           </Label>
                           <Input
                              id="account-details"
                              type="text"
                              placeholder="Enter your account number or wallet address"
                              className="mt-1.5"
                              value={account}
                              onChange={(e) => setAccount(e.target.value)}
                           />
                        </div>

                        <div>
                           <Label htmlFor="notes">Notes (Optional)</Label>
                           <textarea
                              id="notes"
                              rows={3}
                              placeholder="Any special instructions..."
                              className="w-full mt-1.5 rounded-md border border-input bg-background px-3 py-2 text-sm"
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                           />
                        </div>

                        <Button
                           className="w-full"
                           size="lg"
                           type="submit"
                           disabled={request.isPending}
                        >
                           <Wallet className="w-5 h-5 mr-2" />
                           {request.isPending
                              ? 'Submitting...'
                              : 'Request Withdrawal'}
                        </Button>
                     </form>
                  </Card>

                  {/* Withdrawal History */}
                  <Card className="p-6 shadow-custom-md">
                     <h2 className="text-xl font-semibold text-foreground mb-6">
                        Withdrawal History
                     </h2>
                     <div className="space-y-4">
                        {(wPage?.data ?? []).map(
                           (withdrawal: any, index: number) => (
                              <div
                                 key={index}
                                 className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                              >
                                 <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-success-light flex items-center justify-center">
                                       <CheckCircle className="w-5 h-5 text-success" />
                                    </div>
                                    <div>
                                       <p className="font-medium text-foreground">
                                          {(
                                             withdrawal.amountCents / 100
                                          ).toLocaleString()}{' '}
                                          Birr
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
                  <Card className="p-6 shadow-custom-md">
                     <h3 className="text-lg font-semibold text-foreground mb-4">
                        Withdrawal Info
                     </h3>
                     <div className="space-y-4">
                        <div className="flex gap-3">
                           <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                           <div>
                              <p className="font-medium text-foreground text-sm">
                                 Processing Time
                              </p>
                              <p className="text-sm text-muted-foreground">
                                 1-3 business days
                              </p>
                           </div>
                        </div>
                        <div className="flex gap-3">
                           <Wallet className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                           <div>
                              <p className="font-medium text-foreground text-sm">
                                 Minimum Amount
                              </p>
                              <p className="text-sm text-muted-foreground">
                                 50.00 Birr per withdrawal
                              </p>
                           </div>
                        </div>
                        <div className="flex gap-3">
                           <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                           <div>
                              <p className="font-medium text-foreground text-sm">
                                 Fees
                              </p>
                              <p className="text-sm text-muted-foreground">
                                 No fees for VIP members
                              </p>
                           </div>
                        </div>
                     </div>
                  </Card>

                  <Card className="p-6 shadow-custom-md bg-orange-50 border-orange-300">
                     <div className="flex gap-3">
                        <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                        <h3 className="text-lg font-semibold text-foreground">
                           Important
                        </h3>
                     </div>
                     <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Ensure account details are correct</li>
                        <li>• Withdrawals are processed Mon-Fri</li>
                        <li>• VIP members get priority processing</li>
                        <li>• Contact support for large withdrawals</li>
                     </ul>
                  </Card>

                  <Card className="p-6 shadow-custom-md bg-blue-950 text-primary-foreground">
                     <h3 className="text-lg font-semibold">Need Help?</h3>
                     <p className="text-sm opacity-90 mb-4">
                        Our support team is available 24/7 to assist you
                     </p>
                     <Button variant="secondary" className="w-full">
                        Contact Support
                     </Button>
                  </Card>
               </div>
            </div>
         </main>
      </div>
   );
};

export default Withdraw;
