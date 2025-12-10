import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMe } from '@/hooks/useAuth';
import { toast } from 'sonner';

const Profile = () => {
   const { data: me } = useMe();
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [address, setAddress] = useState('');

   useEffect(() => {
      if (me) {
         setFirstName(me.firstName ?? '');
         setLastName(me.lastName ?? '');
         setEmail(me.email ?? '');
         setPhone(me.phone ?? '');
      }
   }, [me]);

   const onSaveProfile = (e: React.FormEvent) => {
      e.preventDefault();
      toast.info('Profile updates not supported yet.');
   };

   const onUpdatePassword = (e: React.FormEvent) => {
      e.preventDefault();
      toast.info('Password update not implemented yet.');
   };

   const displayName =
      me?.firstName || me?.lastName
         ? `${me?.firstName ?? ''} ${me?.lastName ?? ''}`.trim()
         : me?.email || me?.phone || 'User';
   const memberSince = me?.createdAt
      ? new Date(me.createdAt).toLocaleDateString(undefined, {
           month: 'short',
           year: 'numeric',
        })
      : '—';
   const verified = me?.email ? 'Yes' : 'No';
   const roleLabel = me?.role === 'ADMIN' ? 'Admin' : 'Member';

   return (
      <div className="min-h-screen bg-[#09090b] text-white overflow-hidden">
         <Navigation />

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

         <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  <Card className="p-6 shadow-custom-md bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm">
                     <h2 className="text-xl font-semibold text-foreground mb-6">
                        Personal Information
                     </h2>
                     <form className="space-y-5" onSubmit={onSaveProfile}>
                        <div className="grid md:grid-cols-2 gap-5">
                           <div>
                              <Label htmlFor="first-name">First Name</Label>
                              <Input
                                 id="first-name"
                                 type="text"
                                 value={firstName}
                                 onChange={(e) => setFirstName(e.target.value)}
                                 className="mt-1.5"
                              />
                           </div>
                           <div>
                              <Label htmlFor="last-name">Last Name</Label>
                              <Input
                                 id="last-name"
                                 type="text"
                                 value={lastName}
                                 onChange={(e) => setLastName(e.target.value)}
                                 className="mt-1.5"
                              />
                           </div>
                        </div>

                        <div>
                           <Label htmlFor="email">Email Address</Label>
                           <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="mt-1.5"
                           />
                        </div>

                        <div>
                           <Label htmlFor="phone">Phone Number</Label>
                           <Input
                              id="phone"
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="mt-1.5"
                           />
                        </div>

                        <div>
                           <Label htmlFor="address">Address</Label>
                           <Input
                              id="address"
                              type="text"
                              placeholder="123 Main St, City, Country"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              className="mt-1.5"
                           />
                        </div>
                        <Button
                           size="lg"
                           className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 shadow-xl shadow-violet-600/30 px-8 h-12 text-base font-semibold"
                        >
                           {/* <LayoutDashboard className="w-4 h-4 mr-2" /> */}
                           Save Changes
                        </Button>
                     </form>
                  </Card>

                  {/* Security Settings */}
                  <Card className="p-6 shadow-custom-md bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm">
                     <h2 className="text-xl font-semibold text-foreground mb-6">
                        Security
                     </h2>
                     <form className="space-y-5" onSubmit={onUpdatePassword}>
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
                  <Card className="p-6 shadow-custom-md bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm">
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
                  <Card className="p-6 shadow-custom-md text-center bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm">
                     <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <User className="w-12 h-12 text-white" />
                     </div>
                     <h3 className="text-xl font-semibold text-foreground mb-1">
                        {displayName}
                     </h3>
                     <p className="text-sm text-muted-foreground mb-4">
                        {roleLabel}
                     </p>
                     <Button
                        variant="outline"
                        size="lg"
                        className="border-zinc-700 bg-white/5 text-white px-8 h-12 text-base hover:bg-white/10 hover:text-white"
                     >
                        Change Avatar
                     </Button>
                  </Card>

                  <Card className="p-6 shadow-custom-md bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm">
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
                              {memberSince}
                           </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                           <Shield className="w-4 h-4 text-muted-foreground" />
                           <span className="text-muted-foreground">
                              VIP Status:
                           </span>
                           <span className="font-medium text-green-400">
                              {roleLabel}
                           </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                           <Mail className="w-4 h-4 text-muted-foreground" />
                           <span className="text-muted-foreground">
                              Verified:
                           </span>
                           <span className="font-medium text-green-400">
                              {verified}
                           </span>
                        </div>
                     </div>
                  </Card>

                  <Card className="p-6 shadow-custom-md bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm">
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
