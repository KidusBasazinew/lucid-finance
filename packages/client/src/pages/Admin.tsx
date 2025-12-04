import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMe } from '@/hooks/useAuth';
import {
   useApproveInvestment,
   useProcessProfits,
   useApproveWithdrawal,
   useRejectWithdrawal,
   useMarkWithdrawalPaid,
   usePendingInvestments,
   usePendingWithdrawals,
} from '@/hooks/useAdmin';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Admin = () => {
   const { data: me } = useMe();
   const navigate = useNavigate();

   const approveInvestment = useApproveInvestment();
   const processProfits = useProcessProfits();
   const approveWithdrawal = useApproveWithdrawal();
   const rejectWithdrawal = useRejectWithdrawal();
   const markWithdrawalPaid = useMarkWithdrawalPaid();

   const pendingInvDef = usePendingInvestments();
   const pendingWdDef = usePendingWithdrawals();
   const pendingInv = useQuery(pendingInvDef);
   const pendingWd = useQuery(pendingWdDef);

   const [investmentId, setInvestmentId] = useState('');
   const [withdrawalId, setWithdrawalId] = useState('');

   if (me && me.role !== 'ADMIN') {
      navigate('/');
      return null;
   }

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
         <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <h1 className="text-2xl font-semibold">Admin</h1>

            <Card className="bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm">
               <CardHeader>
                  <CardTitle>Process Daily Profits</CardTitle>
               </CardHeader>
               <CardContent className="flex items-center gap-3">
                  <Button
                     onClick={() => processProfits.mutate()}
                     disabled={processProfits.isPending}
                  >
                     {processProfits.isPending ? 'Processing…' : 'Run Job Now'}
                  </Button>
                  {processProfits.isSuccess && (
                     <span className="text-sm text-green-500">Done</span>
                  )}
                  {processProfits.isError && (
                     <span className="text-sm text-red-500">Failed</span>
                  )}
               </CardContent>
            </Card>

            <Card className="bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm">
               <CardHeader>
                  <CardTitle>Approve Investment</CardTitle>
               </CardHeader>
               <CardContent>
                  {/* Pending list */}
                  <div className="mb-4">
                     <div className="text-sm text-muted-foreground mb-2">
                        Pending Investments
                     </div>
                     <div className="space-y-2">
                        {(pendingInv.data ?? []).map((item: any) => (
                           <div
                              key={item.id}
                              className="flex items-center justify-between border rounded-md p-3"
                           >
                              <div className="text-sm">
                                 <div className="font-medium">
                                    {item.user?.firstName ?? ''}{' '}
                                    {item.user?.lastName ?? ''} ·{' '}
                                    {item.user?.phone}
                                 </div>
                                 <div className="text-muted-foreground">
                                    Package: {item.package?.name} · Amount: Birr{' '}
                                    {(item.amountCents / 100).toLocaleString()}{' '}
                                    · Status: {item.status}
                                 </div>
                              </div>
                              <Button
                                 size="sm"
                                 onClick={() =>
                                    approveInvestment.mutate(item.id)
                                 }
                              >
                                 Approve
                              </Button>
                           </div>
                        ))}
                        {pendingInv.isLoading && (
                           <div className="text-sm">Loading…</div>
                        )}
                        {pendingInv.isError && (
                           <div className="text-sm text-red-500">
                              Failed to load
                           </div>
                        )}
                     </div>
                  </div>
                  <div className="grid gap-3 max-w-md">
                     <Label htmlFor="invId">Investment ID</Label>
                     <Input
                        id="invId"
                        placeholder="investment id"
                        value={investmentId}
                        onChange={(e) => setInvestmentId(e.target.value)}
                     />
                     <div className="flex gap-2">
                        <Button
                           onClick={() =>
                              investmentId &&
                              approveInvestment.mutate(investmentId)
                           }
                           disabled={
                              !investmentId || approveInvestment.isPending
                           }
                        >
                           {approveInvestment.isPending
                              ? 'Approving…'
                              : 'Approve'}
                        </Button>
                        {approveInvestment.isSuccess && (
                           <span className="text-sm text-green-500">
                              Approved
                           </span>
                        )}
                        {approveInvestment.isError && (
                           <span className="text-sm text-red-500">Failed</span>
                        )}
                     </div>
                  </div>
               </CardContent>
            </Card>

            <Card className="bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm">
               <CardHeader>
                  <CardTitle>Manage Withdrawals</CardTitle>
               </CardHeader>
               <CardContent>
                  {/* Pending withdrawals list */}
                  <div className="mb-4">
                     <div className="text-sm text-muted-foreground mb-2">
                        Pending Withdrawals
                     </div>
                     <div className="space-y-2">
                        {(pendingWd.data ?? []).map((wd: any) => (
                           <div
                              key={wd.id}
                              className="flex items-center justify-between border rounded-md p-3"
                           >
                              <div className="text-sm">
                                 <div className="font-medium">
                                    {wd.user?.firstName ?? ''}{' '}
                                    {wd.user?.lastName ?? ''} · {wd.user?.phone}
                                 </div>
                                 <div className="text-muted-foreground">
                                    Amount: Birr{' '}
                                    {(wd.amountCents / 100).toLocaleString()} ·
                                    Dest: {wd.destination}
                                 </div>
                              </div>
                              <div className="flex gap-2">
                                 <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                       approveWithdrawal.mutate(wd.id)
                                    }
                                 >
                                    Approve
                                 </Button>
                                 <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                       rejectWithdrawal.mutate(wd.id)
                                    }
                                 >
                                    Reject
                                 </Button>
                                 <Button
                                    size="sm"
                                    onClick={() =>
                                       markWithdrawalPaid.mutate(wd.id)
                                    }
                                 >
                                    Mark Paid
                                 </Button>
                              </div>
                           </div>
                        ))}
                        {pendingWd.isLoading && (
                           <div className="text-sm">Loading…</div>
                        )}
                        {pendingWd.isError && (
                           <div className="text-sm text-red-500">
                              Failed to load
                           </div>
                        )}
                     </div>
                  </div>
                  <div className="grid gap-3 max-w-md">
                     <Label htmlFor="wdId">Withdrawal ID</Label>
                     <Input
                        id="wdId"
                        placeholder="withdrawal id"
                        value={withdrawalId}
                        onChange={(e) => setWithdrawalId(e.target.value)}
                     />
                     <div className="flex gap-2 flex-wrap">
                        <Button
                           variant="outline"
                           onClick={() =>
                              withdrawalId &&
                              approveWithdrawal.mutate(withdrawalId)
                           }
                           disabled={
                              !withdrawalId || approveWithdrawal.isPending
                           }
                        >
                           {approveWithdrawal.isPending
                              ? 'Approving…'
                              : 'Approve'}
                        </Button>
                        <Button
                           variant="outline"
                           onClick={() =>
                              withdrawalId &&
                              rejectWithdrawal.mutate(withdrawalId)
                           }
                           disabled={
                              !withdrawalId || rejectWithdrawal.isPending
                           }
                        >
                           {rejectWithdrawal.isPending
                              ? 'Rejecting…'
                              : 'Reject'}
                        </Button>
                        <Button
                           onClick={() =>
                              withdrawalId &&
                              markWithdrawalPaid.mutate(withdrawalId)
                           }
                           disabled={
                              !withdrawalId || markWithdrawalPaid.isPending
                           }
                        >
                           {markWithdrawalPaid.isPending
                              ? 'Marking…'
                              : 'Mark Paid'}
                        </Button>
                     </div>
                     {(approveWithdrawal.isSuccess ||
                        rejectWithdrawal.isSuccess ||
                        markWithdrawalPaid.isSuccess) && (
                        <span className="text-sm text-green-500">Updated</span>
                     )}
                     {(approveWithdrawal.isError ||
                        rejectWithdrawal.isError ||
                        markWithdrawalPaid.isError) && (
                        <span className="text-sm text-red-500">
                           Action failed
                        </span>
                     )}
                  </div>
               </CardContent>
            </Card>
         </main>
      </div>
   );
};

export default Admin;
