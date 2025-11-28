import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router';
import { TrendingUp } from 'lucide-react';

const Register = () => {
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

            <form className="space-y-5">
               <div>
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input
                     id="fullname"
                     type="text"
                     placeholder="John Doe"
                     className="mt-1.5"
                  />
               </div>

               <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                     id="email"
                     type="email"
                     placeholder="you@example.com"
                     className="mt-1.5"
                  />
               </div>

               <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                     id="password"
                     type="password"
                     placeholder="••••••••"
                     className="mt-1.5"
                  />
               </div>

               <div>
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                     id="confirm-password"
                     type="password"
                     placeholder="••••••••"
                     className="mt-1.5"
                  />
               </div>

               <div>
                  <Label htmlFor="referral">Referral Code (Optional)</Label>
                  <Input
                     id="referral"
                     type="text"
                     placeholder="Enter referral code"
                     className="mt-1.5"
                  />
               </div>

               <Link to="/dashboard">
                  <Button
                     className="w-full gradient-success text-success-foreground"
                     size="lg"
                  >
                     Create Account
                  </Button>
               </Link>
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
