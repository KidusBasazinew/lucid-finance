import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRegister } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useI18n } from '@/i18n';

const Register = () => {
   const [fullName, setFullName] = useState('');
   const [phone, setPhone] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirm, setConfirm] = useState('');
   const [referral, setReferral] = useState('');
   const reg = useRegister();
   const navigate = useNavigate();
   const { t } = useI18n();

   const [searchParams] = useSearchParams();

   useEffect(() => {
      const ref = searchParams.get('ref');
      if (ref) setReferral(ref);
   }, [searchParams]);

   const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (password !== confirm) {
         toast.error('Passwords do not match');
         return;
      }
      const [firstName, ...rest] = fullName.trim().split(' ');
      const lastName = rest.join(' ');
      try {
         await reg.mutateAsync({
            phone,
            password,
            email: email || undefined,
            firstName: firstName || undefined,
            lastName: lastName || undefined,
            referralCode: referral || undefined,
         });
         toast.success('Account created');
         navigate('/dashboard');
      } catch (err: any) {
         const msg = err?.response?.data?.message || 'Registration failed';
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
            <div className="text-center mb-8">
               <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary-foreground" />
               </div>
               <h1 className="text-3xl font-bold text-foreground mb-2">
                  {t('auth.createAccount', 'Create Account')}
               </h1>
               <p className="text-muted-foreground">
                  {t(
                     'auth.startJourney',
                     'Start your investment journey today'
                  )}
               </p>
            </div>

            <form className="space-y-5" onSubmit={onSubmit}>
               <div>
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input
                     id="fullname"
                     type="text"
                     placeholder="John Doe"
                     className="mt-1.5"
                     value={fullName}
                     onChange={(e) => setFullName(e.target.value)}
                  />
               </div>

               <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                     id="phone"
                     type="tel"
                     placeholder="e.g. +15551234567"
                     className="mt-1.5"
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                     required
                  />
               </div>

               <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                     id="email"
                     type="email"
                     placeholder="you@example.com"
                     className="mt-1.5"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>

               <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                     id="password"
                     type="password"
                     placeholder="••••••••"
                     className="mt-1.5"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>

               <div>
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                     id="confirm-password"
                     type="password"
                     placeholder="••••••••"
                     className="mt-1.5"
                     value={confirm}
                     onChange={(e) => setConfirm(e.target.value)}
                  />
               </div>

               <div>
                  <Label htmlFor="referral">Referral Code (Optional)</Label>
                  <Input
                     id="referral"
                     type="text"
                     placeholder="Enter referral code"
                     className="mt-1.5"
                     value={referral}
                     onChange={(e) => setReferral(e.target.value)}
                  />
               </div>

               <Button
                  className="w-full"
                  size="lg"
                  type="submit"
                  disabled={reg.isPending}
               >
                  {reg.isPending
                     ? `${t('auth.createAccount', 'Create Account')}...`
                     : t('auth.createAccount', 'Create Account')}
               </Button>
            </form>

            <div className="mt-6 text-center">
               <p className="text-sm text-muted-foreground">
                  {t('auth.haveAccount', 'Already have an account?')}{' '}
                  <Link
                     to="/login"
                     className="text-primary font-medium hover:underline"
                  >
                     {t('auth.loginInstead', 'Log in')}
                  </Link>
               </p>
            </div>
         </Card>
      </div>
   );
};

export default Register;
