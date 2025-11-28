import { NavLink } from '@/components/NavLink';
import { Button } from '@/components/ui/button';
import {
   LayoutDashboard,
   Package,
   Wallet,
   Users,
   User,
   LogOut,
   Menu,
   X,
} from 'lucide-react';
import { useState } from 'react';

const Navigation = () => {
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

   return (
      <nav className="border-b border-border bg-card sticky top-0 z-50 shadow-custom-sm">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
               <div className="flex items-center gap-8">
                  <NavLink to="/" className="flex items-center gap-2">
                     <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary-foreground" />
                     </div>
                     <span className="text-xl font-bold text-foreground">
                        VIP Invest
                     </span>
                  </NavLink>

                  <div className="hidden md:flex items-center gap-1">
                     <NavLink
                        to="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                        activeClassName="bg-secondary text-foreground font-medium"
                     >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                     </NavLink>
                     <NavLink
                        to="/packages"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                        activeClassName="bg-secondary text-foreground font-medium"
                     >
                        <Package className="w-4 h-4" />
                        <span>Packages</span>
                     </NavLink>
                     <NavLink
                        to="/withdraw"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                        activeClassName="bg-secondary text-foreground font-medium"
                     >
                        <Wallet className="w-4 h-4" />
                        <span>Withdraw</span>
                     </NavLink>
                     <NavLink
                        to="/referrals"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                        activeClassName="bg-secondary text-foreground font-medium"
                     >
                        <Users className="w-4 h-4" />
                        <span>Referrals</span>
                     </NavLink>
                  </div>
               </div>

               <div className="hidden md:flex items-center gap-3">
                  <NavLink to="/profile">
                     <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                     >
                        <User className="w-4 h-4" />
                     </Button>
                  </NavLink>
                  <NavLink to="/login">
                     <Button variant="ghost" size="sm" className="gap-2">
                        <LogOut className="w-4 h-4" />
                        Logout
                     </Button>
                  </NavLink>
               </div>

               <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
               >
                  {mobileMenuOpen ? (
                     <X className="w-5 h-5" />
                  ) : (
                     <Menu className="w-5 h-5" />
                  )}
               </Button>
            </div>
         </div>

         {/* Mobile menu */}
         {mobileMenuOpen && (
            <div className="md:hidden border-t border-border bg-card">
               <div className="px-4 py-3 space-y-1">
                  <NavLink
                     to="/dashboard"
                     className="flex items-center gap-2 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                     activeClassName="bg-secondary text-foreground font-medium"
                     onClick={() => setMobileMenuOpen(false)}
                  >
                     <LayoutDashboard className="w-4 h-4" />
                     <span>Dashboard</span>
                  </NavLink>
                  <NavLink
                     to="/packages"
                     className="flex items-center gap-2 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                     activeClassName="bg-secondary text-foreground font-medium"
                     onClick={() => setMobileMenuOpen(false)}
                  >
                     <Package className="w-4 h-4" />
                     <span>Packages</span>
                  </NavLink>
                  <NavLink
                     to="/withdraw"
                     className="flex items-center gap-2 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                     activeClassName="bg-secondary text-foreground font-medium"
                     onClick={() => setMobileMenuOpen(false)}
                  >
                     <Wallet className="w-4 h-4" />
                     <span>Withdraw</span>
                  </NavLink>
                  <NavLink
                     to="/referrals"
                     className="flex items-center gap-2 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                     activeClassName="bg-secondary text-foreground font-medium"
                     onClick={() => setMobileMenuOpen(false)}
                  >
                     <Users className="w-4 h-4" />
                     <span>Referrals</span>
                  </NavLink>
                  <div className="pt-3 border-t border-border mt-3 space-y-1">
                     <NavLink
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                        onClick={() => setMobileMenuOpen(false)}
                     >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                     </NavLink>
                     <NavLink
                        to="/login"
                        className="flex items-center gap-2 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                        onClick={() => setMobileMenuOpen(false)}
                     >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                     </NavLink>
                  </div>
               </div>
            </div>
         )}
      </nav>
   );
};

export default Navigation;
