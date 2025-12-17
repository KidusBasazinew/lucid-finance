import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useI18n } from '@/i18n';
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
   const { t } = useI18n();
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

   const totalEarned = referredUsers.reduce((sum: number, user: any) => {
      const value = parseFloat(user.earned.replace('Birr ', ''));
      return sum + (isNaN(value) ? 0 : value);
   }, 0);

   const totalReferrals = referredUsers.length;

   console.log({ totalEarned, totalReferrals });

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
                  {t('referrals.title', 'Referral Program')}
               </h1>
               <p className="text-muted-foreground">
                  {t(
                     'referrals.subtitle',
                     'Invite friends and earn commission on their investments'
                  )}
               </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
               <StatsCard
                  title={t('referrals.totalReferrals', 'Total Referrals')}
                  value={`${rPage?.total ?? 0}`}
                  icon={Users}
                  trend={t('referrals.trendReferrals', '+3 this month')}
                  trendUp={true}
                  variant="default"
               />
               <StatsCard
                  title={t('referrals.totalEarned', 'Total Earned')}
                  value={totalEarned}
                  icon={DollarSign}
                  trend={t('referrals.trendEarned', '+Birr 175 this week')}
                  trendUp={true}
                  variant="success"
               />
               <StatsCard
                  title={t('referrals.activeReferrals', 'Active Referrals')}
                  value={totalReferrals}
                  icon={TrendingUp}
                  trend={t('referrals.trendActive', '62.5% rate')}
                  variant="accent"
               />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
               {/* Referral Tools */}
               <div className="lg:col-span-2 space-y-6">
                  <Card className="p-6 shadow-custom-md bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm">
                     <h2 className="text-xl font-semibold text-foreground mb-6">
                        {t('referrals.yourLink', 'Your Referral Link')}
                     </h2>

                     <div className="bg-zinc-900/30 rounded-lg p-4 mb-4 border border-zinc-800">
                        <div className="flex items-center gap-2 mb-3">
                           <p className="text-sm text-muted-foreground">
                              {t('referrals.code', 'Referral Code:')}
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
                           {t('referrals.shareSocial', 'Share on Social')}
                        </Button>
                        <Button variant="outline" className="gap-2">
                           <Copy className="w-4 h-4" />
                           {t('referrals.copyCode', 'Copy Code')}
                        </Button>
                     </div>
                  </Card>

                  {/* Referred Users */}
                  <Card className="p-6 shadow-custom-md bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm">
                     <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-foreground">
                           {t('referrals.listTitle', 'Your Referrals')}
                        </h2>
                        <Button variant="outline" size="sm">
                           {t('referrals.viewAll', 'View All')}
                        </Button>
                     </div>

                     <div className="space-y-4">
                        {referredUsers.map((user: any, index: number) => (
                           <div
                              key={index}
                              className="flex items-center justify-between p-4 bg-zinc-900/30 rounded-lg hover:bg-zinc-900/40 transition-colors border border-zinc-800"
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
                  <Card className="p-6 shadow-custom-md bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm">
                     <h3 className="text-lg text-white font-semibold mb-4">
                        {t('referrals.commissionRates', 'Commission Rates')}
                     </h3>
                     <div className="space-y-3">
                        <div className="flex justify-between items-center">
                           <span className="text-sm text-white opacity-90">
                              Starter VIP
                           </span>
                           <span className="font-bold text-white">5%</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-sm text-white opacity-90">
                              Growth VIP
                           </span>
                           <span className="font-bold text-white">6%</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-sm text-white opacity-90">
                              Premium VIP
                           </span>
                           <span className="font-bold text-white">7%</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-sm text-white opacity-90">
                              Professional VIP
                           </span>
                           <span className="font-bold text-white">8%</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-sm text-white opacity-90">
                              Elite VIP
                           </span>
                           <span className="font-bold text-white">10%</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-sm text-white opacity-90">
                              Diamond VIP
                           </span>
                           <span className="font-bold  text-white">12%</span>
                        </div>
                     </div>
                  </Card>

                  <Card className="p-6 shadow-custom-md bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm">
                     <h3 className="text-lg font-semibold text-foreground mb-4">
                        {t('referrals.howItWorks', 'How It Works')}
                     </h3>
                     <ol className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex gap-2">
                           <span className="font-bold text-blue-950">1.</span>
                           <span>
                              {t(
                                 'referrals.step1',
                                 'Share your unique referral link'
                              )}
                           </span>
                        </li>
                        <li className="flex gap-2">
                           <span className="font-bold text-blue-950">2.</span>
                           <span>
                              {t(
                                 'referrals.step2',
                                 'Friends sign up using your link'
                              )}
                           </span>
                        </li>
                        <li className="flex gap-2">
                           <span className="font-bold text-blue-950">3.</span>
                           <span>
                              {t(
                                 'referrals.step3',
                                 'They make their first investment'
                              )}
                           </span>
                        </li>
                        <li className="flex gap-2">
                           <span className="font-bold text-blue-950">4.</span>
                           <span>
                              {t(
                                 'referrals.step4',
                                 'You earn commission immediately'
                              )}
                           </span>
                        </li>
                     </ol>
                  </Card>

                  <Card className="p-6 shadow-custom-md bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm">
                     <h3 className="text-lg font-semibold text-white mb-2">
                        {t('referrals.bonusTip', 'Bonus Tip')}
                     </h3>
                     <p className="text-sm text-foreground">
                        {t(
                           'referrals.bonusCopy',
                           'Referrals who invest in higher VIP packages earn you more commission. Share the benefits of premium packages!'
                        )}
                     </p>
                  </Card>
               </div>
            </div>
         </main>
      </div>
   );
};

export default Referrals;
