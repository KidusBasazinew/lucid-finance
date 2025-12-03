import { NavLink } from 'react-router';
import { cn } from '@/lib/utils'; // assuming you have a cn utility

interface NavItem {
   to: string;
   label: string;
   icon: React.FC<React.SVGProps<SVGSVGElement>>; // lowercase 'icon'
}

interface Props {
   item: NavItem;
}

export const SidebarLink = ({ item }: Props) => {
   const linkClass = ({ isActive }: { isActive: boolean }) =>
      cn(
         'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
         isActive
            ? 'bg-violet-500/20 text-violet-400 font-semibold'
            : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
      );

   const Icon = item.icon; // use lowercase property

   return (
      <NavLink to={item.to} className={linkClass}>
         <Icon className="w-5 h-5" />
         <span>{item.label}</span>
      </NavLink>
   );
};
