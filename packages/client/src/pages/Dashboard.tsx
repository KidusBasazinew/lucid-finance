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

const Dashboard = () => {
   const recentTransactions = [
      {
         type: 'Profit',
         amount: '+$45.00',
         date: 'Today, 10:30 AM',
         status: 'completed',
      },
      {
         type: 'Withdrawal',
         amount: '-$500.00',
         date: 'Yesterday, 3:45 PM',
         status: 'pending',
      },
      {
         type: 'Deposit',
         amount: '+$2,500.00',
         date: '2 days ago',
         status: 'completed',
      },
      {
         type: 'Referral Bonus',
         amount: '+$125.00',
         date: '3 days ago',
         status: 'completed',
      },
   ];

   const activePackages = [
      {
         name: 'Premium VIP',
         invested: '$2,500',
         earned: '$890',
         daily: '$42.50',
         daysLeft: 32,
         progress: 47,
      },
   ];

   return (
      <div className="min-h-screen bg-background">
         <Navigation />

         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <div className="mb-8 animate-slide-up">
               <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome Back, John!
               </h1>
               <p className="text-muted-foreground">
                  Here's your investment overview
               </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
               <StatsCard
                  title="Total Balance"
                  value="$3,890.00"
                  icon={Wallet}
                  trend="+12.5% this month"
                  trendUp={true}
                  variant="default"
               />
               <StatsCard
                  title="Total Profit"
                  value="$890.00"
                  icon={TrendingUp}
                  trend="+$45 today"
                  trendUp={true}
                  variant="success"
               />
               <StatsCard
                  title="Active Packages"
                  value="1"
                  icon={Package}
                  trend="Premium VIP"
                  variant="default"
               />
               <StatsCard
                  title="Referrals"
                  value="8"
                  icon={Users}
                  trend="+$125 earned"
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

                     {activePackages.map((pkg, index) => (
                        <div key={index} className="bg-muted rounded-xl p-6">
                           <div className="flex items-start justify-between mb-4">
                              <div>
                                 <h3 className="text-lg font-semibold text-foreground mb-1">
                                    {pkg.name}
                                 </h3>
                                 <p className="text-sm text-muted-foreground">
                                    Investment: {pkg.invested}
                                 </p>
                              </div>
                              <div className="text-right">
                                 <p className="text-2xl font-bold text-success">
                                    {pkg.earned}
                                 </p>
                                 <p className="text-sm text-muted-foreground">
                                    Total Earned
                                 </p>
                              </div>
                           </div>

                           <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="bg-card rounded-lg p-3">
                                 <div className="flex items-center gap-2 mb-1">
                                    <DollarSign className="w-4 h-4 text-success" />
                                    <p className="text-xs text-muted-foreground">
                                       Daily Profit
                                    </p>
                                 </div>
                                 <p className="text-lg font-semibold text-foreground">
                                    {pkg.daily}
                                 </p>
                              </div>
                              <div className="bg-card rounded-lg p-3">
                                 <div className="flex items-center gap-2 mb-1">
                                    <Clock className="w-4 h-4 text-primary" />
                                    <p className="text-xs text-muted-foreground">
                                       Days Left
                                    </p>
                                 </div>
                                 <p className="text-lg font-semibold text-foreground">
                                    {pkg.daysLeft} days
                                 </p>
                              </div>
                           </div>

                           <div>
                              <div className="flex justify-between text-sm mb-2">
                                 <span className="text-muted-foreground">
                                    Progress
                                 </span>
                                 <span className="text-foreground font-medium">
                                    {pkg.progress}%
                                 </span>
                              </div>
                              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                 <div
                                    className="h-full gradient-success transition-all duration-500"
                                    style={{ width: `${pkg.progress}%` }}
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
                        {recentTransactions.map((transaction, index) => (
                           <div
                              key={index}
                              className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                           >
                              <div className="flex items-center gap-4">
                                 <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                       transaction.type.includes('Profit') ||
                                       transaction.type.includes('Bonus')
                                          ? 'bg-success-light'
                                          : transaction.type.includes(
                                                 'Withdrawal'
                                              )
                                            ? 'bg-accent-light'
                                            : 'bg-primary/10'
                                    }`}
                                 >
                                    {transaction.type.includes('Profit') ||
                                    transaction.type.includes('Bonus') ? (
                                       <TrendingUp className="w-5 h-5 text-success" />
                                    ) : transaction.type.includes(
                                         'Withdrawal'
                                      ) ? (
                                       <ArrowUpRight className="w-5 h-5 text-accent" />
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
                                          ? 'text-success'
                                          : 'text-foreground'
                                    }`}
                                 >
                                    {transaction.amount}
                                 </p>
                                 <p
                                    className={`text-xs ${
                                       transaction.status === 'completed'
                                          ? 'text-success'
                                          : 'text-accent'
                                    }`}
                                 >
                                    {transaction.status}
                                 </p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </Card>
               </div>

               {/* Quick Actions */}
               <div className="space-y-6">
                  <Card className="p-6 shadow-custom-md">
                     <h2 className="text-xl font-semibold text-foreground mb-6">
                        Quick Actions
                     </h2>
                     <div className="space-y-3">
                        <Button
                           className="w-full gradient-success text-success-foreground justify-between"
                           size="lg"
                        >
                           <span>New Investment</span>
                           <ArrowUpRight className="w-5 h-5" />
                        </Button>
                        <Button
                           variant="outline"
                           className="w-full justify-between"
                           size="lg"
                        >
                           <span>Withdraw Funds</span>
                           <Wallet className="w-5 h-5" />
                        </Button>
                        <Button
                           variant="outline"
                           className="w-full justify-between"
                           size="lg"
                        >
                           <span>Invite Friends</span>
                           <Users className="w-5 h-5" />
                        </Button>
                     </div>
                  </Card>

                  <Card className="p-6 shadow-custom-md bg-gradient-to-br from-primary to-primary-hover text-primary-foreground">
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
