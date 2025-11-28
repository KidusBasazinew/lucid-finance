import { Card } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
   title: string;
   value: string;
   icon: LucideIcon;
   trend?: string;
   trendUp?: boolean;
   variant?: 'default' | 'success' | 'accent';
}

const StatsCard = ({
   title,
   value,
   icon: Icon,
   trend,
   trendUp,
   variant = 'default',
}: StatsCardProps) => {
   const getIconBgClass = () => {
      switch (variant) {
         case 'success':
            return 'bg-success-light';
         case 'accent':
            return 'bg-accent-light';
         default:
            return 'bg-secondary';
      }
   };

   const getIconColorClass = () => {
      switch (variant) {
         case 'success':
            return 'text-success';
         case 'accent':
            return 'text-accent';
         default:
            return 'text-primary';
      }
   };

   return (
      <Card className="p-6 shadow-custom-md hover:shadow-custom-lg transition-all duration-300">
         <div className="flex items-start justify-between">
            <div className="flex-1">
               <p className="text-sm text-muted-foreground mb-1">{title}</p>
               <h3 className="text-2xl font-bold text-foreground mb-2">
                  {value}
               </h3>
               {trend && (
                  <p
                     className={`text-sm font-medium ${trendUp ? 'text-success' : 'text-destructive'}`}
                  >
                     {trend}
                  </p>
               )}
            </div>
            <div
               className={`w-12 h-12 rounded-xl ${getIconBgClass()} flex items-center justify-center`}
            >
               <Icon className={`w-6 h-6 ${getIconColorClass()}`} />
            </div>
         </div>
      </Card>
   );
};

export default StatsCard;
