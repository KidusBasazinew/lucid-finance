import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Packages from './pages/Packages';
import Withdraw from './pages/Withdraw';
import Referrals from './pages/Referrals';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster as Sonner, Toaster } from '@/components/ui/sonner';
import Home from './pages/Home';
import { isAuthenticated } from '@/lib/auth';
import { useMe } from '@/hooks/useAuth';
import { useMyWallet } from '@/hooks/useWallet';
import { useInvestments } from '@/hooks/useInvestments';
import { useState } from 'react';
import { PuzzleWheelDialog } from './pages/PuzzleWheel';
import ProtectedRoute from '@/components/ProtectedRoute';
import { I18nProvider } from './i18n';
import Footer from './components/Footer';

const queryClient = new QueryClient();

const AppContent = () => {
   const [wheelOpen, setWheelOpen] = useState(false);
   const authed = isAuthenticated();
   const { data: me } = useMe(authed);
   const { data: wallet } = useMyWallet();
   const { data: investments } = useInvestments({ page: 1, limit: 1 });

   const alreadyClaimed = Boolean((me as any)?.wheelRewardClaimed);
   const hasPositiveBalance = (wallet?.balanceCents ?? 0) > 0;
   const hasInvestment =
      Array.isArray(investments?.data) &&
      investments.data.some((inv: any) => inv.status === 'ACTIVE');

   const openSpinner = () => setWheelOpen(true);

   return (
      <I18nProvider>
         <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                     path="/dashboard"
                     element={
                        <ProtectedRoute>
                           <Dashboard />
                        </ProtectedRoute>
                     }
                  />
                  <Route path="/packages" element={<Packages />} />
                  <Route
                     path="/withdraw"
                     element={
                        <ProtectedRoute>
                           <Withdraw />
                        </ProtectedRoute>
                     }
                  />
                  <Route
                     path="/referrals"
                     element={
                        <ProtectedRoute>
                           <Referrals />
                        </ProtectedRoute>
                     }
                  />
                  <Route
                     path="/profile"
                     element={
                        <ProtectedRoute>
                           <Profile />
                        </ProtectedRoute>
                     }
                  />
                  <Route
                     path="/admin"
                     element={
                        <ProtectedRoute>
                           <Admin />
                        </ProtectedRoute>
                     }
                  />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  {/* <Route path="*" element={<NotFound />} /> */}
               </Routes>
               <PuzzleWheelDialog
                  open={wheelOpen}
                  onOpenChange={setWheelOpen}
               />

               {authed &&
                  !alreadyClaimed &&
                  (hasPositiveBalance || hasInvestment) && (
                     <div className="fixed top-20 left-10 z-50 cursor-pointer pointer-events-auto">
                        <img
                           src="/gift.png"
                           className="w-10 h-10 animate-pulse cursor-pointer"
                           onClick={openSpinner}
                           alt="Spin Wheel"
                        />
                     </div>
                  )}
               <Footer />
            </BrowserRouter>
         </TooltipProvider>
      </I18nProvider>
   );
};

const App = () => {
   return (
      <QueryClientProvider client={queryClient}>
         <AppContent />
      </QueryClientProvider>
   );
};

export default App;
