import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRegister } from '@/hooks/useAuth';
import { toast } from 'sonner';

const Register = () => {
   const [fullName, setFullName] = useState('');
   const [phone, setPhone] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirm, setConfirm] = useState('');
   const [referral, setReferral] = useState('');
   const reg = useRegister();
   const navigate = useNavigate();

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
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-success/5 flex items-center justify-center p-4">
         <Card className="w-full max-w-md p-8 shadow-custom-lg animate-slide-up">
            <div className="text-center mb-8">
               <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary-foreground" />
               </div>
               <h1 className="text-3xl font-bold text-foreground mb-2">
                  Create Account
               </h1>
               <p className="text-muted-foreground">
                  Start your investment journey today
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
                  {reg.isPending ? 'Creating...' : 'Create Account'}
               </Button>
            </form>

            <div className="mt-6 text-center">
               <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link
                     to="/login"
                     className="text-primary font-medium hover:underline"
                  >
                     Log in
                  </Link>
               </p>
            </div>
         </Card>
      </div>
   );
};

export default Register;
