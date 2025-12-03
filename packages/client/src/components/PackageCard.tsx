import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, TrendingUp, Clock, Users } from 'lucide-react';

interface PackageCardProps {
   name: string;
   amount: string;
   dailyProfit: string;
   duration: string;
   totalReturn: string;
   referralBonus: string;
   features: string[];
   color?: 'blue' | 'green' | 'purple'; // ← NEW
   onInvest?: () => void;
}

const colors = {
   blue: {
      main: 'from-blue-500 to-cyan-600',
      text: 'text-blue-400',
      bgSoft: 'bg-blue-500/10',
      iconBg: 'bg-blue-500/20',
      border: 'border-blue-500/40 ring-2 ring-blue-500/40 bg-blue-500/5',
      divider: 'bg-gradient-to-r from-blue-500/60 to-cyan-500/60',
   },
   green: {
      main: 'from-emerald-500 to-teal-600',
      text: 'text-emerald-400',
      bgSoft: 'bg-emerald-500/10',
      iconBg: 'bg-emerald-500/20',
      border:
         'border-emerald-500/40 ring-2 ring-emerald-500/40 bg-emerald-500/5',
      divider: 'bg-gradient-to-r from-emerald-500/60 to-teal-500/60',
   },
   purple: {
      main: 'from-violet-500 to-fuchsia-600',
      text: 'text-violet-400',
      bgSoft: 'bg-violet-500/10',
      iconBg: 'bg-violet-500/20',
      border: 'border-violet-500/40 ring-2 ring-violet-500/40 bg-violet-500/5',
      divider: 'bg-gradient-to-r from-violet-500/60 to-fuchsia-500/60',
   },
};

const PackageCard = ({
   name,
   amount,
   dailyProfit,
   duration,
   totalReturn,
   referralBonus,
   features,
   color = 'green',
   onInvest,
}: PackageCardProps) => {
   const c = colors[color];

   return (
      <Card
         className={`relative p-8 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border ${c.border}`}
      >
         {/* Noise background */}
         <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
         />

         {/* Icon */}
         <div
            className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center shadow-lg bg-gradient-to-br ${c.main}`}
         >
            <TrendingUp className="w-7 h-7 text-white" />
         </div>

         {/* Title */}
         <h3 className="text-2xl font-bold mb-1 text-white">{name}</h3>

         {/* Price */}
         <div className="flex items-baseline gap-2 mb-6">
            <span className={`text-4xl font-extrabold ${c.text}`}>
               {amount} Birr
            </span>
            <span className="text-muted-foreground">investment</span>
         </div>

         {/* Divider */}
         <div className={`h-[2px] w-full rounded-full mb-6 ${c.divider}`} />

         {/* Stats */}
         <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm">
               <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${c.iconBg}`}
               >
                  <TrendingUp className={`w-4 h-4 ${c.text}`} />
               </div>
               <div>
                  <p className="text-muted-foreground text-xs">Daily Profit</p>
                  <p className={`font-semibold ${c.text}`}>{dailyProfit}</p>
               </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
               <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
               </div>
               <div>
                  <p className="text-muted-foreground text-xs">Duration</p>
                  <p className={`${c.text} font-semibold`}>{duration}</p>
               </div>
            </div>
         </div>

         {/* Return box */}
         <div className={`rounded-lg p-4 mb-6 ${c.bgSoft}`}>
            <div className="flex justify-between items-center mb-2">
               <span className="text-sm text-muted-foreground">
                  Total Return
               </span>
               <span className={`text-lg font-bold ${c.text}`}>
                  {totalReturn} Birr
               </span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-sm text-muted-foreground">
                  Referral Bonus
               </span>
               <span className="text-sm font-semibold text-accent flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {referralBonus}
               </span>
            </div>
         </div>

         {/* Features */}
         <ul className="space-y-3 mb-6">
            {features.map((feature, i) => (
               <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className={`w-4 h-4 mt-0.5 ${c.text}`} />
                  <span className="text-muted-foreground">{feature}</span>
               </li>
            ))}
         </ul>

         {/* Button */}
         <Button
            className={`w-full font-semibold bg-gradient-to-r ${c.main} text-white`}
            onClick={onInvest}
         >
            Invest Now
         </Button>
      </Card>
   );
};

export default PackageCard;
