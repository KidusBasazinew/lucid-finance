import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Packages from './pages/Packages';
import Withdraw from './pages/Withdraw';
import Referrals from './pages/Referrals';
import Profile from './pages/Profile';
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster as Sonner, Toaster } from '@/components/ui/sonner';
import Home from './pages/Home';

const queryClient = new QueryClient();

const App = () => {
   return (
      <QueryClientProvider client={queryClient}>
         <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/packages" element={<Packages />} />
                  <Route path="/withdraw" element={<Withdraw />} />
                  <Route path="/referrals" element={<Referrals />} />
                  <Route path="/profile" element={<Profile />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  {/* <Route path="*" element={<NotFound />} /> */}
               </Routes>
            </BrowserRouter>
         </TooltipProvider>
      </QueryClientProvider>
   );
};

export default App;
