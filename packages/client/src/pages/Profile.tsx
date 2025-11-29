import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, MapPin, Lock, Bell, Shield } from 'lucide-react';

const Profile = () => {
   return (
      <div className="min-h-screen bg-background">
         <Navigation />

         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 animate-slide-up">
               <h1 className="text-3xl font-bold text-foreground mb-2">
                  Profile Settings
               </h1>
               <p className="text-muted-foreground">
                  Manage your account information and preferences
               </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
               {/* Main Content */}
               <div className="lg:col-span-2 space-y-6">
                  {/* Personal Information */}
                  <Card className="p-6 shadow-custom-md">
                     <h2 className="text-xl font-semibold text-foreground mb-6">
                        Personal Information
                     </h2>
                     <form className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-5">
                           <div>
                              <Label htmlFor="first-name">First Name</Label>
                              <Input
                                 id="first-name"
                                 type="text"
                                 defaultValue="John"
                                 className="mt-1.5"
                              />
                           </div>
                           <div>
                              <Label htmlFor="last-name">Last Name</Label>
                              <Input
                                 id="last-name"
                                 type="text"
                                 defaultValue="Doe"
                                 className="mt-1.5"
                              />
                           </div>
                        </div>

                        <div>
                           <Label htmlFor="email">Email Address</Label>
                           <Input
                              id="email"
                              type="email"
                              defaultValue="john.doe@example.com"
                              className="mt-1.5"
                           />
                        </div>

                        <div>
                           <Label htmlFor="phone">Phone Number</Label>
                           <Input
                              id="phone"
                              type="tel"
                              defaultValue="+1 234 567 8900"
                              className="mt-1.5"
                           />
                        </div>

                        <div>
                           <Label htmlFor="address">Address</Label>
                           <Input
                              id="address"
                              type="text"
                              placeholder="123 Main St, City, Country"
                              className="mt-1.5"
                           />
                        </div>

                        <Button className="gradient-primary text-primary-foreground">
                           Save Changes
                        </Button>
                     </form>
                  </Card>

                  {/* Security Settings */}
                  <Card className="p-6 shadow-custom-md">
                     <h2 className="text-xl font-semibold text-foreground mb-6">
                        Security
                     </h2>
                     <form className="space-y-5">
                        <div>
                           <Label htmlFor="current-password">
                              Current Password
                           </Label>
                           <Input
                              id="current-password"
                              type="password"
                              placeholder="••••••••"
                              className="mt-1.5"
                           />
                        </div>

                        <div>
                           <Label htmlFor="new-password">New Password</Label>
                           <Input
                              id="new-password"
                              type="password"
                              placeholder="••••••••"
                              className="mt-1.5"
                           />
                        </div>

                        <div>
                           <Label htmlFor="confirm-password">
                              Confirm New Password
                           </Label>
                           <Input
                              id="confirm-password"
                              type="password"
                              placeholder="••••••••"
                              className="mt-1.5"
                           />
                        </div>

                        <Button variant="outline">Update Password</Button>
                     </form>
                  </Card>

                  {/* Notification Preferences */}
                  <Card className="p-6 shadow-custom-md">
                     <h2 className="text-xl font-semibold text-foreground mb-6">
                        Notifications
                     </h2>
                     <div className="space-y-4">
                        <div className="flex items-center justify-between">
                           <div>
                              <p className="font-medium text-foreground">
                                 Email Notifications
                              </p>
                              <p className="text-sm text-muted-foreground">
                                 Receive updates via email
                              </p>
                           </div>
                           <input
                              type="checkbox"
                              defaultChecked
                              className="w-5 h-5"
                           />
                        </div>
                        <div className="flex items-center justify-between">
                           <div>
                              <p className="font-medium text-foreground">
                                 SMS Notifications
                              </p>
                              <p className="text-sm text-muted-foreground">
                                 Receive text messages
                              </p>
                           </div>
                           <input
                              type="checkbox"
                              defaultChecked
                              className="w-5 h-5"
                           />
                        </div>
                        <div className="flex items-center justify-between">
                           <div>
                              <p className="font-medium text-foreground">
                                 Daily Profit Alerts
                              </p>
                              <p className="text-sm text-muted-foreground">
                                 Daily earnings updates
                              </p>
                           </div>
                           <input
                              type="checkbox"
                              defaultChecked
                              className="w-5 h-5"
                           />
                        </div>
                        <div className="flex items-center justify-between">
                           <div>
                              <p className="font-medium text-foreground">
                                 Withdrawal Updates
                              </p>
                              <p className="text-sm text-muted-foreground">
                                 Status of withdrawals
                              </p>
                           </div>
                           <input
                              type="checkbox"
                              defaultChecked
                              className="w-5 h-5"
                           />
                        </div>
                     </div>
                  </Card>
               </div>

               {/* Sidebar */}
               <div className="space-y-6">
                  <Card className="p-6 shadow-custom-md text-center">
                     <div className="w-24 h-24 rounded-full bg-blue-900 flex items-center justify-center mx-auto mb-4">
                        <User className="w-12 h-12 text-white" />
                     </div>
                     <h3 className="text-xl font-semibold text-foreground mb-1">
                        John Doe
                     </h3>
                     <p className="text-sm text-muted-foreground mb-4">
                        Premium VIP Member
                     </p>
                     <Button variant="outline" size="sm" className="w-full">
                        Change Avatar
                     </Button>
                  </Card>

                  <Card className="p-6 shadow-custom-md">
                     <h3 className="text-lg font-semibold text-foreground mb-4">
                        Account Info
                     </h3>
                     <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                           <User className="w-4 h-4 text-muted-foreground" />
                           <span className="text-muted-foreground">
                              Member since:
                           </span>
                           <span className="font-medium text-foreground">
                              Jan 2024
                           </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                           <Shield className="w-4 h-4 text-muted-foreground" />
                           <span className="text-muted-foreground">
                              VIP Status:
                           </span>
                           <span className="font-medium text-green-400">
                              Premium
                           </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                           <Mail className="w-4 h-4 text-muted-foreground" />
                           <span className="text-muted-foreground">
                              Verified:
                           </span>
                           <span className="font-medium text-green-400">
                              Yes
                           </span>
                        </div>
                     </div>
                  </Card>

                  <Card className="p-6 shadow-custom-md bg-destructive/10 border-destructive/20">
                     <h3 className="text-lg font-semibold text-foreground mb-2">
                        Danger Zone
                     </h3>
                     <p className="text-sm text-muted-foreground mb-4">
                        Permanently delete your account and all associated data
                     </p>
                     <Button variant="destructive" size="sm" className="w-full">
                        Delete Account
                     </Button>
                  </Card>
               </div>
            </div>
         </main>
      </div>
   );
};

export default Profile;
