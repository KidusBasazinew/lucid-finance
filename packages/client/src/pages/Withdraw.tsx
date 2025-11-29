import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const Withdraw = () => {
   const withdrawalHistory = [
      {
         amount: '$500.00',
         date: 'Dec 20, 2024',
         status: 'completed',
         txId: 'TXN-20241220-001',
      },
      {
         amount: '$1,250.00',
         date: 'Dec 15, 2024',
         status: 'completed',
         txId: 'TXN-20241215-002',
      },
      {
         amount: '$750.00',
         date: 'Dec 10, 2024',
         status: 'completed',
         txId: 'TXN-20241210-003',
      },
      {
         amount: '$2,000.00',
         date: 'Dec 5, 2024',
         status: 'completed',
         txId: 'TXN-20241205-004',
      },
   ];

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
                              $3,890.00
                           </p>
                        </div>
                     </div>

                     <form className="space-y-5">
                        <div>
                           <Label htmlFor="amount">Withdrawal Amount</Label>
                           <div className="relative mt-1.5">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                 $
                              </span>
                              <Input
                                 id="amount"
                                 type="number"
                                 placeholder="0.00"
                                 className="pl-8"
                              />
                           </div>
                           <p className="text-sm text-muted-foreground mt-1.5">
                              Minimum withdrawal: $50.00
                           </p>
                        </div>

                        <div>
                           <Label htmlFor="payment-method">
                              Payment Method
                           </Label>
                           <select
                              id="payment-method"
                              className="w-full mt-1.5 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
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
                           />
                        </div>

                        <div>
                           <Label htmlFor="notes">Notes (Optional)</Label>
                           <textarea
                              id="notes"
                              rows={3}
                              placeholder="Any special instructions..."
                              className="w-full mt-1.5 rounded-md border border-input bg-background px-3 py-2 text-sm"
                           />
                        </div>

                        <Button className="w-full" size="lg">
                           <Wallet className="w-5 h-5 mr-2" />
                           Request Withdrawal
                        </Button>
                     </form>
                  </Card>

                  {/* Withdrawal History */}
                  <Card className="p-6 shadow-custom-md">
                     <h2 className="text-xl font-semibold text-foreground mb-6">
                        Withdrawal History
                     </h2>
                     <div className="space-y-4">
                        {withdrawalHistory.map((withdrawal, index) => (
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
                                       {withdrawal.amount}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                       {withdrawal.txId}
                                    </p>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <p className="text-sm text-muted-foreground">
                                    {withdrawal.date}
                                 </p>
                                 <p className="text-xs text-success font-medium">
                                    Completed
                                 </p>
                              </div>
                           </div>
                        ))}
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
                                 $50.00 per withdrawal
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
