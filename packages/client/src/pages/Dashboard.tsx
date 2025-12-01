import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatsCard from '@/components/StatsCard';
import {
   Wallet,
   TrendingUp,
   Users,
   DollarSign,
   ArrowUpRight,
   Clock,
   Package,
} from 'lucide-react';
import { useMyWallet } from '@/hooks/useWallet';
import { useTransactions } from '@/hooks/useTransactions';
import { useInvestments } from '@/hooks/useInvestments';
import { useMe } from '@/hooks/useAuth';
import { NavLink } from 'react-router';

const Dashboard = () => {
   const { data: me } = useMe();
   const { data: wallet } = useMyWallet();
   const { data: txPage } = useTransactions({ page: 1, limit: 10 });
   const { data: invPage } = useInvestments({ page: 1, limit: 10 });
   const recentTransactions = (txPage?.data ?? []).map((t: any) => ({
      type: t.type ?? 'Transaction',
      amount: `${t.amountCents >= 0 ? '+' : '-'}$${Math.abs(t.amountCents / 100).toLocaleString()}`,
      date: t.createdAt ? new Date(t.createdAt).toLocaleString() : '',
      status: (t.status ?? 'completed').toString().toLowerCase(),
   }));

   return (
      <div className="min-h-screen bg-background">
         <Navigation />

         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <div className="mb-8 animate-slide-up">
               <h1 className="text-3xl font-bold text-foreground mb-2">
                  {`Welcome Back${me?.firstName ? `, ${me.firstName}!` : '!'}`}
               </h1>
               <p className="text-muted-foreground">
                  Here's your investment overview
               </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
               <StatsCard
                  title="Total Balance"
                  value={`$${((wallet?.balanceCents ?? 0) / 100).toLocaleString()}`}
                  icon={Wallet}
                  trend="+12.5% this month"
                  trendUp={true}
                  variant="default"
               />
               <StatsCard
                  title="Active Investments"
                  value={`${invPage?.total ?? 0}`}
                  icon={TrendingUp}
                  trend="Investments"
                  trendUp={true}
                  variant="success"
               />
               <StatsCard
                  title="Recent Transactions"
                  value={`${txPage?.total ?? 0}`}
                  icon={Package}
                  trend="Last 10 fetched"
                  variant="default"
               />
               <StatsCard
                  title="Referrals"
                  value={me?.referralCount ? String(me.referralCount) : '0'}
                  icon={Users}
                  trend="Total"
                  trendUp={true}
                  variant="accent"
               />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
               {/* Active Packages */}
               <div className="lg:col-span-2 space-y-6">
                  <Card className="p-6 shadow-custom-md">
                     <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-foreground">
                           Active Packages
                        </h2>
                        <Button variant="outline" size="sm">
                           View All
                        </Button>
                     </div>

                     {(invPage?.data ?? [])
                        .slice(0, 1)
                        .map((inv: any, index: number) => (
                           <div key={index} className="bg-muted rounded-xl p-6">
                              <div className="flex items-start justify-between mb-4">
                                 <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-1">
                                       Active Investment
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                       Investment: $
                                       {(
                                          inv.amountCents / 100
                                       ).toLocaleString()}
                                    </p>
                                 </div>
                                 <div className="text-right">
                                    <p className="text-2xl font-bold text-green-400">
                                       $
                                       {Math.floor(
                                          (inv.amountCents *
                                             (inv.totalReturnCents
                                                ? inv.totalReturnCents /
                                                  inv.amountCents
                                                : 1)) /
                                             100
                                       ).toLocaleString()}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                       Total Return (plan)
                                    </p>
                                 </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4 mb-4">
                                 <div className="bg-card rounded-lg p-3">
                                    <div className="flex items-center gap-2 mb-1">
                                       <DollarSign className="w-4 h-4 text-green-400" />
                                       <p className="text-xs text-muted-foreground">
                                          Daily Profit (bps)
                                       </p>
                                    </div>
                                    <p className="text-lg font-semibold text-foreground">
                                       {inv.dailyProfitBps
                                          ? `${(inv.dailyProfitBps / 100).toFixed(2)}%`
                                          : '—'}
                                    </p>
                                 </div>
                                 <div className="bg-card rounded-lg p-3">
                                    <div className="flex items-center gap-2 mb-1">
                                       <Clock className="w-4 h-4 text-primary" />
                                       <p className="text-xs text-muted-foreground">
                                          Status
                                       </p>
                                    </div>
                                    <p className="text-lg font-semibold text-foreground">
                                       {inv.status ?? 'ACTIVE'}
                                    </p>
                                 </div>
                              </div>

                              <div>
                                 <div className="flex justify-between text-sm mb-2">
                                    <span className="text-muted-foreground">
                                       Progress
                                    </span>
                                    <span className="text-foreground font-medium">
                                       50%
                                    </span>
                                 </div>
                                 <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                    <div
                                       className="h-full bg-green-400 transition-all duration-500"
                                       style={{ width: `50%` }}
                                    />
                                 </div>
                              </div>
                           </div>
                        ))}
                  </Card>

                  {/* Recent Transactions */}
                  <Card className="p-6 shadow-custom-md">
                     <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-foreground">
                           Recent Transactions
                        </h2>
                        <Button variant="outline" size="sm">
                           View All
                        </Button>
                     </div>

                     <div className="space-y-4">
                        {recentTransactions.map(
                           (transaction: any, index: number) => (
                              <div
                                 key={index}
                                 className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                              >
                                 <div className="flex items-center gap-4">
                                    <div
                                       className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                          transaction.type.includes('Profit') ||
                                          transaction.type.includes('Bonus')
                                             ? 'bg-green-100'
                                             : transaction.type.includes(
                                                    'Withdrawal'
                                                 )
                                               ? 'bg-orange-100'
                                               : 'bg-primary/10'
                                       }`}
                                    >
                                       {transaction.type.includes('Profit') ||
                                       transaction.type.includes('Bonus') ? (
                                          <TrendingUp className="w-5 h-5 text-green-400" />
                                       ) : transaction.type.includes(
                                            'Withdrawal'
                                         ) ? (
                                          <ArrowUpRight className="w-5 h-5 text-orange-400" />
                                       ) : (
                                          <DollarSign className="w-5 h-5 text-primary" />
                                       )}
                                    </div>
                                    <div>
                                       <p className="font-medium text-foreground">
                                          {transaction.type}
                                       </p>
                                       <p className="text-sm text-muted-foreground">
                                          {transaction.date}
                                       </p>
                                    </div>
                                 </div>
                                 <div className="text-right">
                                    <p
                                       className={`font-semibold ${
                                          transaction.amount.startsWith('+')
                                             ? 'text-green-400'
                                             : 'text-foreground'
                                       }`}
                                    >
                                       {transaction.amount}
                                    </p>
                                    <p
                                       className={`text-xs ${
                                          transaction.status === 'completed'
                                             ? 'text-green-400'
                                             : 'text-orange-400'
                                       }`}
                                    >
                                       {transaction.status}
                                    </p>
                                 </div>
                              </div>
                           )
                        )}
                     </div>
                  </Card>
               </div>

               {/* Quick Actions */}
               <div className="space-y-6">
                  <Card className="p-6 shadow-custom-md">
                     <h2 className="text-xl font-semibold text-foreground mb-6">
                        Quick Actions
                     </h2>
                     <div className="flex flex-col gap-y-3 ">
                        <NavLink to="/packages">
                           <Button
                              className="w-full bg-primary text-white justify-between"
                              size="lg"
                           >
                              <span>New Investment</span>
                              <ArrowUpRight className="w-5 h-5" />
                           </Button>
                        </NavLink>
                        <NavLink to="/withdraw">
                           <Button
                              variant="outline"
                              className="w-full justify-between"
                              size="lg"
                           >
                              <span>Withdraw Funds</span>
                              <Wallet className="w-5 h-5" />
                           </Button>
                        </NavLink>
                        <NavLink to="/referrals">
                           <Button
                              variant="outline"
                              className="w-full justify-between"
                              size="lg"
                           >
                              <span>Invite Friends</span>
                              <Users className="w-5 h-5" />
                           </Button>
                        </NavLink>
                     </div>
                  </Card>

                  <Card className="p-6 shadow-custom-md bg-gradient-to-br from-blue-950 to-blue-900 text-primary-foreground">
                     <h3 className="text-lg font-semibold mb-2">
                        Invite & Earn
                     </h3>
                     <p className="text-sm opacity-90 mb-4">
                        Share your referral link and earn up to 10% commission
                        on every investment!
                     </p>
                     <Button variant="secondary" className="w-full">
                        Share Now
                     </Button>
                  </Card>
               </div>
            </div>
         </main>
      </div>
   );
};

export default Dashboard;
