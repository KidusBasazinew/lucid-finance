import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
   Users,
   DollarSign,
   TrendingUp,
   Copy,
   Share2,
   CheckCircle,
} from 'lucide-react';
import { useState } from 'react';
import StatsCard from '@/components/StatsCard';
import { useReferrals as useReferralsHook } from '@/hooks/useReferrals';
import { useMe } from '@/hooks/useAuth';
import { isAuthenticated } from '@/lib/auth';

const Referrals = () => {
   const [copied, setCopied] = useState(false);
   const { data: me } = useMe();
   const { data: rPage } = useReferralsHook(
      { page: 1, limit: 20 },
      { enabled: isAuthenticated() }
   );
   const referralCode = me?.referralCode || '—';
   const referralLink = `${location.origin}/register?ref=${referralCode}`;

   const handleCopy = () => {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   const referredUsers = (rPage?.data ?? []).map((r: any) => ({
      name: r.name || r.email || 'Referred User',
      package: r.packageName || '—',
      earned:
         r.bonusCents != null
            ? `Birr ${(r.bonusCents / 100).toLocaleString()}`
            : 'Birr 0.00',
      date: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '',
      status: r.status || 'active',
   }));

   console.log(referredUsers);

   return (
      <div className="min-h-screen bg-background">
         <Navigation />

         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 animate-slide-up">
               <h1 className="text-3xl font-bold text-foreground mb-2">
                  Referral Program
               </h1>
               <p className="text-muted-foreground">
                  Invite friends and earn commission on their investments
               </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
               <StatsCard
                  title="Total Referrals"
                  value={`${rPage?.total ?? 0}`}
                  icon={Users}
                  trend="+3 this month"
                  trendUp={true}
                  variant="default"
               />
               <StatsCard
                  title="Total Earned"
                  value={
                     me?.referralEarningsCents != null
                        ? `$${(me.referralEarningsCents / 100).toLocaleString()}`
                        : '$0.00'
                  }
                  icon={DollarSign}
                  trend="+$175 this week"
                  trendUp={true}
                  variant="success"
               />
               <StatsCard
                  title="Active Referrals"
                  value="5"
                  icon={TrendingUp}
                  trend="62.5% rate"
                  variant="accent"
               />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
               {/* Referral Tools */}
               <div className="lg:col-span-2 space-y-6">
                  <Card className="p-6 shadow-custom-md">
                     <h2 className="text-xl font-semibold text-foreground mb-6">
                        Your Referral Link
                     </h2>

                     <div className="bg-muted rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2 mb-3">
                           <p className="text-sm text-muted-foreground">
                              Referral Code:
                           </p>
                           <code className="text-lg font-mono font-bold text-primary">
                              {referralCode}
                           </code>
                        </div>
                        <div className="flex gap-2">
                           <Input
                              value={referralLink}
                              readOnly
                              className="flex-1"
                           />
                           <Button
                              onClick={handleCopy}
                              className={`${copied ? 'bg-success' : ''}`}
                           >
                              {copied ? (
                                 <CheckCircle className="w-4 h-4" />
                              ) : (
                                 <Copy className="w-4 h-4" />
                              )}
                           </Button>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="gap-2">
                           <Share2 className="w-4 h-4" />
                           Share on Social
                        </Button>
                        <Button variant="outline" className="gap-2">
                           <Copy className="w-4 h-4" />
                           Copy Code
                        </Button>
                     </div>
                  </Card>

                  {/* Referred Users */}
                  <Card className="p-6 shadow-custom-md">
                     <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-foreground">
                           Your Referrals
                        </h2>
                        <Button variant="outline" size="sm">
                           View All
                        </Button>
                     </div>

                     <div className="space-y-4">
                        {referredUsers.map((user: any, index: number) => (
                           <div
                              key={index}
                              className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                           >
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-primary" />
                                 </div>
                                 <div>
                                    <p className="font-medium text-foreground">
                                       {user.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                       {user.package}
                                    </p>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <p className="font-semibold text-green-400">
                                    {user.earned}
                                 </p>
                                 <p className="text-xs text-muted-foreground">
                                    {user.date}
                                 </p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </Card>
               </div>

               {/* Info Sidebar */}
               <div className="space-y-6">
                  <Card className="p-6 shadow-custom-md bg-gradient-to-br from-blue-950 to-blue-900 text-primary-foreground">
                     <h3 className="text-lg font-semibold mb-4">
                        Commission Rates
                     </h3>
                     <div className="space-y-3">
                        <div className="flex justify-between items-center">
                           <span className="text-sm opacity-90">
                              Starter VIP
                           </span>
                           <span className="font-bold">5%</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-sm opacity-90">
                              Growth VIP
                           </span>
                           <span className="font-bold">6%</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-sm opacity-90">
                              Premium VIP
                           </span>
                           <span className="font-bold">7%</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-sm opacity-90">
                              Professional VIP
                           </span>
                           <span className="font-bold">8%</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-sm opacity-90">Elite VIP</span>
                           <span className="font-bold">10%</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-sm opacity-90">
                              Diamond VIP
                           </span>
                           <span className="font-bold">12%</span>
                        </div>
                     </div>
                  </Card>

                  <Card className="p-6 shadow-custom-md">
                     <h3 className="text-lg font-semibold text-foreground mb-4">
                        How It Works
                     </h3>
                     <ol className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex gap-2">
                           <span className="font-bold text-blue-950">1.</span>
                           <span>Share your unique referral link</span>
                        </li>
                        <li className="flex gap-2">
                           <span className="font-bold text-blue-950">2.</span>
                           <span>Friends sign up using your link</span>
                        </li>
                        <li className="flex gap-2">
                           <span className="font-bold text-blue-950">3.</span>
                           <span>They make their first investment</span>
                        </li>
                        <li className="flex gap-2">
                           <span className="font-bold text-blue-950">4.</span>
                           <span>You earn commission immediately</span>
                        </li>
                     </ol>
                  </Card>

                  <Card className="p-6 shadow-custom-md bg-blue-50 border border-green-400">
                     <h3 className="text-lg font-semibold text-foreground mb-2">
                        Bonus Tip
                     </h3>
                     <p className="text-sm text-muted-foreground">
                        Referrals who invest in higher VIP packages earn you
                        more commission. Share the benefits of premium packages!
                     </p>
                  </Card>
               </div>
            </div>
         </main>
      </div>
   );
};

export default Referrals;
