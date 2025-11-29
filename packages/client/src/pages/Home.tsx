import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import {
   TrendingUp,
   Shield,
   Users,
   Wallet,
   ArrowRight,
   CheckCircle,
   BarChart3,
   DollarSign,
} from 'lucide-react';
import PackageCard from '@/components/PackageCard';

const Home = () => {
   const packages = [
      {
         name: 'Starter VIP',
         amount: '500',
         dailyProfit: '2.5%',
         duration: '30 days',
         totalReturn: '$875',
         referralBonus: '5%',
         features: [
            'Daily profit deposits',
            'Instant withdrawals',
            '24/7 support access',
            'Mobile app access',
         ],
      },
      {
         name: 'Premium VIP',
         amount: '2,500',
         dailyProfit: '3.2%',
         duration: '60 days',
         totalReturn: '$7,300',
         referralBonus: '7%',
         featured: true,
         features: [
            'Higher daily returns',
            'Priority withdrawals',
            'Dedicated account manager',
            'Advanced analytics dashboard',
            'Exclusive investment insights',
         ],
      },
      {
         name: 'Elite VIP',
         amount: '10,000',
         dailyProfit: '4.0%',
         duration: '90 days',
         totalReturn: '$46,000',
         referralBonus: '10%',
         features: [
            'Maximum daily returns',
            'Instant priority processing',
            'Personal investment advisor',
            'VIP customer support',
            'Exclusive market reports',
            'Annual bonus rewards',
         ],
      },
   ];

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
      <div className="min-h-screen bg-background">
         {/* Header */}
         <header className="border-b border-border bg-card sticky top-0 z-50 shadow-custom-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex justify-between items-center h-16">
                  <div className="flex items-center gap-2">
                     <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                     </div>
                     <span className="text-xl font-bold text-foreground">
                        VIP Invest
                     </span>
                  </div>
                  <div className="flex items-center gap-3">
                     <Link to="/login">
                        <Button variant="ghost">Login</Button>
                     </Link>
                     <Link to="/register">
                        <Button className="bg-primary">Get Started</Button>
                     </Link>
                  </div>
               </div>
            </div>
         </header>

         {/* Hero Section */}
         <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background pt-20 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center max-w-3xl mx-auto animate-slide-up">
                  <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                     Invest Smart, Profit
                     <span className="block bg-primary bg-clip-text text-transparent">
                        Daily
                     </span>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8">
                     Join thousands of investors earning consistent daily
                     returns with our premium VIP investment packages. Secure,
                     transparent, and profitable.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <Link to="/register">
                        <Button
                           size="lg"
                           className="bg-green-400 text-white gap-2 text-lg px-8"
                        >
                           Start Investing Now
                           <ArrowRight className="w-5 h-5" />
                        </Button>
                     </Link>
                     <Link to="/packages">
                        <Button
                           size="lg"
                           variant="outline"
                           className="text-lg px-8"
                        >
                           View Packages
                        </Button>
                     </Link>
                  </div>
               </div>
            </div>
         </section>

         {/* Benefits Section */}
         <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-foreground mb-4">
                     Why Choose VIP Invest?
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                     Built on trust, transparency, and proven results.
                     Experience the difference of professional investment
                     management.
                  </p>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {benefits.map((benefit, index) => (
                     <div
                        key={index}
                        className="bg-card rounded-xl p-6 shadow-custom-md hover:shadow-custom-lg transition-all duration-300"
                     >
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                           <benefit.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                           {benefit.title}
                        </h3>
                        <p className="text-muted-foreground">
                           {benefit.description}
                        </p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* VIP Packages Section */}
         <section className="py-20 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-foreground mb-4">
                     Choose Your VIP Package
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                     Select the investment plan that matches your goals. All
                     packages include daily profits and referral bonuses.
                  </p>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {packages.map((pkg, index) => (
                     <PackageCard key={index} {...pkg} />
                  ))}
               </div>
            </div>
         </section>

         {/* How It Works */}
         <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-foreground mb-4">
                     How It Works
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                     Get started in minutes with our simple, secure process
                  </p>
               </div>

               <div className="grid md:grid-cols-4 gap-8">
                  {[
                     {
                        icon: CheckCircle,
                        title: 'Sign Up',
                        desc: 'Create your free account in seconds',
                     },
                     {
                        icon: DollarSign,
                        title: 'Choose Package',
                        desc: 'Select your preferred VIP investment plan',
                     },
                     {
                        icon: BarChart3,
                        title: 'Watch Growth',
                        desc: 'Track your daily profits in real-time',
                     },
                     {
                        icon: Wallet,
                        title: 'Withdraw',
                        desc: 'Access your earnings anytime, instantly',
                     },
                  ].map((step, index) => (
                     <div key={index} className="relative">
                        <div className="text-center">
                           <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                              <step.icon className="w-8 h-8 text-primary-foreground" />
                           </div>
                           <h3 className="text-xl font-semibold text-foreground mb-2">
                              {step.title}
                           </h3>
                           <p className="text-muted-foreground">{step.desc}</p>
                        </div>
                        {index < 3 && (
                           <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-border -translate-x-1/2" />
                        )}
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* CTA Section */}
         <section className="py-20 bg-primary text-primary-foreground">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
               <h2 className="text-4xl font-bold mb-4">
                  Ready to Start Earning?
               </h2>
               <p className="text-xl mb-8 opacity-90">
                  Join VIP Invest today and take control of your financial
                  future
               </p>
               <Link to="/register">
                  <Button
                     size="lg"
                     variant="secondary"
                     className="gap-2 text-lg px-8"
                  >
                     Create Your Account
                     <ArrowRight className="w-5 h-5" />
                  </Button>
               </Link>
            </div>
         </section>

         {/* Footer */}
         <footer className="border-t border-border py-12 bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center text-muted-foreground">
                  <p>&copy; 2024 VIP Invest. All rights reserved.</p>
               </div>
            </div>
         </footer>
      </div>
   );
};

export default Home;
