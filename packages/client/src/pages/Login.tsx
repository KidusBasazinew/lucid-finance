import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router';
import { TrendingUp } from 'lucide-react';

const Login = () => {
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
            <form className="space-y-5">
               {/* Email */}
               <div>
                  <Label htmlFor="email" className="text-foreground">
                     Email Address
                  </Label>
                  <Input
                     id="email"
                     type="email"
                     placeholder="you@example.com"
                     className="mt-1.5 bg-background border-border focus:ring-primary"
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
                  />
               </div>

               {/* Login button */}
               <Link to="/dashboard">
                  <Button
                     className="w-full gradient-primary text-primary-foreground shadow-custom-md"
                     size="lg"
                  >
                     Log In
                  </Button>
               </Link>
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
