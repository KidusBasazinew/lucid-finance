import Navigation from '@/components/Navigation';
import PackageCard from '@/components/PackageCard';

const Packages = () => {
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
            'Email notifications',
         ],
      },
      {
         name: 'Growth VIP',
         amount: '1,500',
         dailyProfit: '2.8%',
         duration: '45 days',
         totalReturn: '$3,390',
         referralBonus: '6%',
         features: [
            'All Starter features',
            'Higher daily returns',
            'Priority support',
            'SMS notifications',
            'Investment reports',
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
            'All Growth features',
            'Dedicated account manager',
            'Advanced analytics dashboard',
            'Exclusive investment insights',
            'VIP community access',
         ],
      },
      {
         name: 'Professional VIP',
         amount: '5,000',
         dailyProfit: '3.6%',
         duration: '75 days',
         totalReturn: '$18,500',
         referralBonus: '8%',
         features: [
            'All Premium features',
            'Personal investment advisor',
            'Custom withdrawal schedules',
            'Market trend analysis',
            'Portfolio optimization',
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
            'All Professional features',
            'Maximum daily returns',
            'Instant priority processing',
            'Exclusive market reports',
            'Annual bonus rewards',
            'White-glove service',
         ],
      },
      {
         name: 'Diamond VIP',
         amount: '25,000',
         dailyProfit: '4.5%',
         duration: '120 days',
         totalReturn: '$160,000',
         referralBonus: '12%',
         features: [
            'All Elite features',
            'Highest profit rates',
            'Custom investment strategies',
            'Direct line to management',
            'Quarterly business reviews',
            'Lifetime VIP status',
         ],
      },
   ];

   return (
      <div className="min-h-screen bg-background">
         <Navigation />

         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-12 text-center animate-slide-up">
               <h1 className="text-4xl font-bold text-foreground mb-4">
                  VIP Investment Packages
               </h1>
               <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Choose the package that fits your investment goals. All
                  packages include daily profits, referral bonuses, and secure
                  withdrawals.
               </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {packages.map((pkg, index) => (
                  <div
                     key={index}
                     className="animate-fade-in"
                     style={{ animationDelay: `${index * 0.1}s` }}
                  >
                     <PackageCard {...pkg} />
                  </div>
               ))}
            </div>

            <div className="mt-16 bg-card rounded-xl p-8 shadow-custom-md text-center">
               <h2 className="text-2xl font-bold text-foreground mb-4">
                  Need Help Choosing?
               </h2>
               <p className="text-muted-foreground mb-6">
                  Our investment advisors are ready to help you select the
                  perfect package for your goals
               </p>
               <button className="px-6 py-3 gradient-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Contact Support
               </button>
            </div>
         </main>
      </div>
   );
};

export default Packages;
