import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Link, useNavigate, useLocation } from 'react-router';
import { TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useLogin } from '@/hooks/useAuth';
import { toast } from 'sonner';

const Login = () => {
   const [phone, setPhone] = useState('');
   const [password, setPassword] = useState('');
   const login = useLogin();
   const navigate = useNavigate();
   const location = useLocation() as any;
   const from = location.state?.from?.pathname || '/dashboard';

   const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         await login.mutateAsync({ phone, password });
         toast.success('Logged in');
         navigate(from, { replace: true });
      } catch (err: any) {
         const msg = err?.response?.data?.message || 'Login failed';
         toast.error(msg);
      }
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-success/5 flex items-center justify-center p-4">
         <Card className="w-full max-w-md p-8 shadow-custom-lg animate-slide-up bg-card text-card-foreground border border-border rounded-2xl">
            {/* Logo + Header */}
            <div className="text-center mb-8">
               <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-custom-md">
                  <TrendingUp className="w-8 h-8 text-primary-foreground" />
               </div>

               <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome Back
               </h1>
               <p className="text-muted-foreground">
                  Log in to access your investment dashboard
               </p>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={onSubmit}>
               {/* Phone */}
               <div>
                  <Label htmlFor="phone" className="text-foreground">
                     Phone Number
                  </Label>
                  <Input
                     id="phone"
                     type="tel"
                     placeholder="e.g. +15551234567"
                     className="mt-1.5 bg-background border-border focus:ring-primary"
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                  />
               </div>

               {/* Password */}
               <div>
                  <div className="flex justify-between items-center mb-1.5">
                     <Label htmlFor="password" className="text-foreground">
                        Password
                     </Label>
                     <Link
                        to="#"
                        className="text-sm text-primary hover:underline"
                     >
                        Forgot password?
                     </Link>
                  </div>
                  <Input
                     id="password"
                     type="password"
                     placeholder="••••••••"
                     className="bg-background border-border focus:ring-primary"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>

               {/* Login button */}
               <Button
                  className="w-full "
                  size="lg"
                  type="submit"
                  disabled={login.isPending}
               >
                  {login.isPending ? 'Logging in...' : 'Log In'}
               </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
               <p className="text-sm text-muted-foreground">
                  Don’t have an account?{' '}
                  <Link
                     to="/register"
                     className="text-primary font-medium hover:underline"
                  >
                     Sign up now
                  </Link>
               </p>
            </div>
         </Card>
      </div>
   );
};

export default Login;
