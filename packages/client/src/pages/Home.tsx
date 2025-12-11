import { Button } from '@/components/ui/button';
import { NavLink, useNavigate } from 'react-router';
import {
   TrendingUp,
   Shield,
   Users,
   Wallet,
   ArrowRight,
   Rocket,
   Play,
   BookOpen,
   Sparkles,
} from 'lucide-react';
import PackageCard from '@/components/PackageCard';
import { usePackages } from '@/hooks/usePackages';
import Navigation from '@/components/Navigation';

const Home = () => {
   const { data: pkg } = usePackages({ page: 1, limit: 50, active: true });
   const items = pkg?.data ?? [];
   const router = useNavigate();
   const formatMoney = (cents: number) => (cents / 100).toLocaleString();
   console.log(items);
   const benefits = [
      {
         icon: TrendingUp,
         title: 'Daily Profits',
         description:
            'Earn consistent daily returns on your investment with transparent tracking',
      },
      {
         icon: Shield,
         title: 'Secure Platform',
         description:
            'Bank-level security with encrypted transactions and data protection',
      },
      {
         icon: Users,
         title: 'Referral Rewards',
         description:
            'Earn extra income by referring friends and building your network',
      },
      {
         icon: Wallet,
         title: 'Fast Withdrawals',
         description:
            'Quick and hassle-free withdrawal process with multiple payment options',
      },
   ];

   return (
      <>
         <div className="min-h-screen bg-[#09090b] text-white overflow-hidden">
            <Navigation />
            {/* Animated gradient mesh background */}
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

            {/* Noise texture overlay */}
            <div
               className="fixed inset-0 pointer-events-none opacity-[0.015]"
               style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
               }}
            />

            {/* Hero Section */}
            <main className="relative z-10">
               <section className="px-6 lg:px-12 pt-16 pb-24 max-w-7xl mx-auto">
                  <div className="flex flex-col items-center text-center">
                     {/* Badge */}
                     <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8 animate-fade-in"
                        style={{ animationDelay: '0.1s' }}
                     >
                        <Sparkles className="w-4 h-4 text-violet-400" />
                        <span className="text-sm text-violet-300">
                           Invest today before ends
                        </span>
                     </div>

                     {/* Headline */}
                     <h1
                        className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[0.95] mb-8 animate-fade-in"
                        style={{ animationDelay: '0.2s' }}
                     >
                        <span className="block text-white">
                           Invest Smart Get{' '}
                        </span>
                        <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                           Profit Daily
                        </span>
                     </h1>

                     {/* Subheadline */}
                     <p
                        className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed animate-fade-in"
                        style={{ animationDelay: '0.3s' }}
                     >
                        Join thousands of investors earning consistent daily
                        returns with our premium VIP investment packages.
                        <span className="text-fuchsia-400">
                           Secure, transparent,
                        </span>{' '}
                        and <span className="text-cyan-400">profitable.</span>.
                     </p>

                     {/* CTA Buttons */}
                     <div
                        className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in"
                        style={{ animationDelay: '0.4s' }}
                     >
                        <>
                           <Button
                              size="lg"
                              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 shadow-xl shadow-violet-600/30 px-8 h-12 text-base font-semibold"
                           >
                              {/* <LayoutDashboard className="w-4 h-4 mr-2" /> */}
                              Start Investing Now
                           </Button>

                           <Button
                              variant="outline"
                              size="lg"
                              className="border-zinc-700 bg-white/5 text-white px-8 h-12 text-base hover:bg-white/10 hover:text-white"
                           >
                              <BookOpen className="w-4 h-4 mr-2" />
                              View Packages
                           </Button>
                        </>
                     </div>

                     {/* Stats */}
                     <div
                        className="mt-16 grid grid-cols-3 gap-8 md:gap-16 animate-fade-in"
                        style={{ animationDelay: '0.5s' }}
                     >
                        {[
                           {
                              value: 6,
                              label: 'Packages',
                              icon: BookOpen,
                           },
                           {
                              value: 15,
                              label: 'Investment Duration',
                              icon: Play,
                           },
                           { value: '10K+', label: 'Investors', icon: Users },
                        ].map((stat) => (
                           <div
                              key={stat.label}
                              className="flex flex-col items-center"
                           >
                              <div className="flex items-center gap-2 mb-1">
                                 <stat.icon className="w-4 h-4 text-violet-400" />
                                 <span className="text-2xl md:text-3xl font-bold text-white">
                                    {stat.value}
                                 </span>
                              </div>
                              <span className="text-sm text-zinc-500">
                                 {stat.label}
                              </span>
                           </div>
                        ))}
                     </div>
                  </div>
               </section>

               {/* Tiers Preview */}
               <section className="px-6 lg:px-12 py-20 max-w-7xl mx-auto">
                  <div className="grid md:grid-cols-3 gap-6">
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
                                 onInvest={() => router(`/packages`)}
                                 color={
                                    color[index % 3] as
                                       | 'green'
                                       | 'blue'
                                       | 'purple'
                                 }
                              />
                           </div>
                        );
                     })}
                  </div>
               </section>

               {/* Testimonials */}
               <section className="px-6 lg:px-12 py-20 max-w-7xl mx-auto">
                  {/* Title */}
                  <div className="text-center mb-16">
                     <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Why Choose{' '}
                        <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                           LUCID FINANCE
                        </span>
                     </h2>

                     <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Built on trust, transparency, and proven results.
                        Experience the difference of professional investment
                        management.
                     </p>
                  </div>

                  {/* Benefit Cards */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                     {benefits.map((benefit, index) => (
                        <div
                           key={index}
                           className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm 
                       transition-all duration-300 hover:shadow-xl hover:bg-zinc-900/40"
                        >
                           {/* Icon Wrapper */}
                           <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                              <benefit.icon className="w-6 h-6 text-primary" />
                           </div>

                           {/* Title */}
                           <h3 className="text-xl font-semibold text-white mb-2">
                              {benefit.title}
                           </h3>

                           {/* Description */}
                           <p className="text-zinc-400 leading-relaxed">
                              {benefit.description}
                           </p>
                        </div>
                     ))}
                  </div>
               </section>

               {/* CTA Section */}
               <section className="px-6 lg:px-12 py-20 max-w-7xl mx-auto">
                  <div className="relative rounded-3xl bg-gradient-to-br from-violet-600/20 via-fuchsia-600/10 to-cyan-600/20 border border-white/10 p-12 md:p-20 text-center overflow-hidden">
                     {/* Animated gradient border */}
                     <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 blur-xl" />

                     <div className="relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-500/30">
                           <Rocket className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                           Ready to level up your investments?
                        </h2>
                        <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10">
                           Start with small packages or unlock everything with
                           Pro and Ultra. Your investment journey begins now.
                        </p>
                        <NavLink to="/packages">
                           <Button
                              size="lg"
                              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 shadow-xl shadow-violet-600/30 px-10 h-14 text-lg font-semibold"
                           >
                              View Pricing
                              <ArrowRight className="w-5 h-5 ml-2" />
                           </Button>
                        </NavLink>
                     </div>
                  </div>
               </section>
            </main>
         </div>
         {/* Footer */}
         <footer className="border-t border-border py-12 bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center text-muted-foreground">
                  <p>&copy; 2024 VIP Invest. All rights reserved.</p>
               </div>
            </div>
         </footer>
      </>
   );
};

export default Home;
