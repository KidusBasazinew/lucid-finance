import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, TrendingUp, Clock, Users } from 'lucide-react';

interface PackageCardProps {
   name: string;
   amount: string;
   dailyProfit: string;
   duration: string;
   totalReturn: string;
   referralBonus: string;
   featured?: boolean;
   features: string[];
   onInvest?: () => void;
}

const PackageCard = ({
   name,
   amount,
   dailyProfit,
   duration,
   totalReturn,
   referralBonus,
   featured = false,
   features,
   onInvest,
}: PackageCardProps) => {
   return (
      <Card
         className={`p-6 relative overflow-hidden transition-all duration-300 hover:shadow-custom-lg ${
            featured ? 'border-2 border-green-400 shadow-custom-md' : ''
         }`}
      >
         {featured && (
            <Badge className="absolute top-4 right-4 bg-green-400 text-foreground">
               Most Popular
            </Badge>
         )}

         <div className="mb-6">
            <h3 className="text-2xl font-bold text-foreground mb-2">{name}</h3>
            <div className="flex items-baseline gap-2">
               <span className="text-4xl font-bold text-primary">
                  {amount} Birr
               </span>
               <span className="text-muted-foreground">investment</span>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm">
               <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-400" />
               </div>
               <div>
                  <p className="text-muted-foreground text-xs">Daily Profit</p>
                  <p className="font-semibold text-green-400">{dailyProfit}</p>
               </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
               <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <Clock className="w-4 h-4 text-primary" />
               </div>
               <div>
                  <p className="text-muted-foreground text-xs">Duration</p>
                  <p className="font-semibold text-foreground">{duration}</p>
               </div>
            </div>
         </div>

         <div className="bg-muted rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
               <span className="text-sm text-muted-foreground">
                  Total Return
               </span>
               <span className="text-lg font-bold text-green-400">
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

         <ul className="space-y-3 mb-6">
            {features.map((feature, index) => (
               <li key={index} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
               </li>
            ))}
         </ul>

         <Button
            className={`w-full ${featured ? 'gradient-green text-green-foreground hover:opacity-90' : ''}`}
            onClick={onInvest}
         >
            Invest Now
         </Button>
      </Card>
   );
};

export default PackageCard;
