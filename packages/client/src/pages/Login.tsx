import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Link, useNavigate, useLocation } from 'react-router';
import { TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useLogin } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useI18n } from '@/i18n';

const Login = () => {
   const [phone, setPhone] = useState('');
   const [password, setPassword] = useState('');
   const login = useLogin();
   const navigate = useNavigate();
   const location = useLocation() as any;
   const from = location.state?.from?.pathname || '/dashboard';
   const { t } = useI18n();

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
      <div className="min-h-screen bg-[#09090b] text-white overflow-hidden flex items-center justify-center p-4">
         <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
            <div
               className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-600/15 rounded-full blur-[100px] animate-pulse"
               style={{ animationDelay: '1s' }}
            />
            <div
               className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[80px] animate-pulse"
               style={{ animationDelay: '2s' }}
            />
         </div>

         <div
            className="fixed inset-0 pointer-events-none opacity-[0.015]"
            style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
         />

         <Card className="w-full max-w-md p-8 shadow-custom-lg animate-slide-up bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm rounded-2xl">
            {/* Logo + Header */}
            <div className="text-center mb-8">
               <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-custom-md">
                  <TrendingUp className="w-8 h-8 text-primary-foreground" />
               </div>

               <h1 className="text-3xl font-bold text-foreground mb-2">
                  {t('auth.welcome', 'Welcome Back')}
               </h1>
               <p className="text-muted-foreground">
                  {t('auth.loginCta', 'Log In')} to access your investment
                  dashboard
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
                        {t('auth.forgot', 'Forgot password?')}
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
                  {login.isPending
                     ? t('auth.loginCta', 'Log In') + '...'
                     : t('auth.loginCta', 'Log In')}
               </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
               <p className="text-sm text-muted-foreground">
                  {t('auth.noAccount', 'Don’t have an account?')}{' '}
                  <Link
                     to="/register"
                     className="text-primary font-medium hover:underline"
                  >
                     {t('auth.signupNow', 'Sign up now')}
                  </Link>
               </p>
            </div>
         </Card>
      </div>
   );
};

export default Login;
