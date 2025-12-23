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
import ProtectedRoute from '@/components/ProtectedRoute';
import { I18nProvider } from './i18n';
import Footer from './components/Footer';

const queryClient = new QueryClient();

const App = () => {
   return (
      <QueryClientProvider client={queryClient}>
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
                  <Footer />
               </BrowserRouter>
            </TooltipProvider>
         </I18nProvider>
      </QueryClientProvider>
   );
};

export default App;
