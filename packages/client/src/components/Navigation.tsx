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
import { useLogout, useMe } from '@/hooks/useAuth';
import { useNavigate } from 'react-router';
import { SidebarLink } from './SideBarLink';
import { useI18n } from '@/i18n';

const Navigation = () => {
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

   const logout = useLogout();
   const { data: me } = useMe();
   const navigate = useNavigate();
   const { t, language, setLanguage } = useI18n();
   const handleLogout = async () => {
      await logout.mutateAsync();
      navigate('/login');
   };

   const toggleLanguage = () => {
      setLanguage(language === 'en' ? 'om' : language === 'om' ? 'ah' : 'en');
   };

   return (
      <nav className="sticky top-0 z-50 bg-zinc-900/30 backdrop-blur-lg border-b border-zinc-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
               {/* Logo */}
               <NavLink to="/" className="flex items-center gap-2 group">
                  <div className="relative">
                     <div
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 
                               flex items-center justify-center shadow-lg shadow-violet-500/25 
                               group-hover:shadow-violet-500/40 transition-shadow"
                     >
                        <Package className="w-5 h-5 text-white" />
                     </div>
                     <div
                        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full 
                               bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center"
                     >
                        <div className="w-2 h-2 bg-white rounded-full" />
                     </div>
                  </div>

                  <div className="flex flex-col">
                     <span className="font-bold text-lg tracking-tight leading-none text-white">
                        LUCID
                     </span>
                     <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                        Finance
                     </span>
                  </div>
               </NavLink>

               {me ? (
                  <>
                     {/* Desktop Nav */}
                     <div className="hidden md:flex items-center gap-1">
                        {[
                           {
                              to: '/dashboard',
                              label: t('nav.dashboard', 'Dashboard'),
                              icon: LayoutDashboard,
                           },
                           {
                              to: '/packages',
                              label: t('nav.packages', 'Packages'),
                              icon: Package,
                           },
                           {
                              to: '/withdraw',
                              label: t('nav.withdraw', 'Withdraw'),
                              icon: Wallet,
                           },
                           {
                              to: '/referrals',
                              label: t('nav.referrals', 'Referrals'),
                              icon: Users,
                           },
                           ...(me?.role === 'ADMIN'
                              ? [
                                   {
                                      to: '/admin',
                                      label: t('nav.admin', 'Admin'),
                                      icon: LayoutDashboard,
                                   },
                                ]
                              : []),
                        ].map((item) => {
                           return <SidebarLink item={item} />;
                        })}
                     </div>

                     {/* Desktop Actions */}
                     <div className="hidden md:flex items-center gap-3">
                        <NavLink to="/profile">
                           <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                           >
                              <User className="w-4 h-4" />
                           </Button>
                        </NavLink>

                        <Button
                           variant="ghost"
                           size="sm"
                           onClick={toggleLanguage}
                           className="flex items-center gap-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                        >
                           {language === 'en'
                              ? 'EN'
                              : language === 'om'
                                ? 'OM'
                                : 'AH'}
                        </Button>

                        <Button
                           variant="ghost"
                           size="sm"
                           onClick={handleLogout}
                           className="flex items-center gap-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                        >
                           <LogOut className="w-4 h-4" />
                           {t('nav.logout', 'Logout')}
                        </Button>
                     </div>
                  </>
               ) : (
                  <div className="flex items-center justify-center">
                     <NavLink to="/login">
                        <Button variant="ghost">
                           {t('nav.login', 'Login')}
                        </Button>
                     </NavLink>
                     <NavLink to="/register">
                        <Button
                           variant="ghost"
                           size="sm"
                           onClick={handleLogout}
                           className="flex items-center gap-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                        >
                           <LogOut className="w-4 h-4" />
                           {t('nav.getStarted', 'Get Started')}
                        </Button>
                     </NavLink>
                  </div>
               )}

               {/* Mobile Button */}
               <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden text-zinc-400 hover:text-white hover:bg-zinc-800/50"
               >
                  {mobileMenuOpen ? (
                     <X className="w-5 h-5" />
                  ) : (
                     <Menu className="w-5 h-5" />
                  )}
               </Button>
            </div>
         </div>

         {/* Mobile Menu */}
         {mobileMenuOpen && (
            <div className="md:hidden border-t border-zinc-800 bg-zinc-900/40 backdrop-blur-lg">
               <div className="px-4 py-3 space-y-1">
                  {me ? (
                     <>
                        {[
                           {
                              to: '/dashboard',
                              label: t('nav.dashboard', 'Dashboard'),
                              icon: LayoutDashboard,
                           },
                           {
                              to: '/packages',
                              label: t('nav.packages', 'Packages'),
                              icon: Package,
                           },
                           {
                              to: '/withdraw',
                              label: t('nav.withdraw', 'Withdraw'),
                              icon: Wallet,
                           },
                           {
                              to: '/referrals',
                              label: t('nav.referrals', 'Referrals'),
                              icon: Users,
                           },
                           ...(me?.role === 'ADMIN'
                              ? [
                                   {
                                      to: '/admin',
                                      label: t('nav.admin', 'Admin'),
                                      icon: LayoutDashboard,
                                   },
                                ]
                              : []),
                        ].map((item) => {
                           return <SidebarLink item={item} />;
                        })}

                        <div className="pt-3 border-t border-zinc-800 space-y-1">
                           <NavLink
                              to="/profile"
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800/40"
                           >
                              <User className="w-4 h-4" />
                              {t('nav.profile', 'Profile')}
                           </NavLink>

                           <button
                              onClick={() => {
                                 setMobileMenuOpen(false);
                                 handleLogout();
                              }}
                              className="flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800/40 w-full text-left"
                           >
                              <LogOut className="w-4 h-4" />
                              {t('nav.logout', 'Logout')}
                           </button>
                           <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                 toggleLanguage();
                                 setMobileMenuOpen(false);
                              }}
                              className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800/40"
                           >
                              {language === 'en' ? 'Oromo' : 'English'}
                           </Button>
                        </div>
                     </>
                  ) : (
                     <div className="flex flex-col gap-2">
                        <NavLink
                           to="/login"
                           onClick={() => setMobileMenuOpen(false)}
                        >
                           <Button variant="ghost" className="w-full">
                              {t('nav.login', 'Login')}
                           </Button>
                        </NavLink>
                        <NavLink
                           to="/register"
                           onClick={() => setMobileMenuOpen(false)}
                        >
                           <Button variant="ghost" className="w-full">
                              {t('nav.getStarted', 'Get Started')}
                           </Button>
                        </NavLink>
                        <Button
                           variant="ghost"
                           size="sm"
                           onClick={() => {
                              toggleLanguage();
                              setMobileMenuOpen(false);
                           }}
                           className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800/40"
                        >
                           {language === 'en' ? 'Oromo' : 'English'}
                        </Button>
                     </div>
                  )}
               </div>
            </div>
         )}
      </nav>
   );
};

export default Navigation;
