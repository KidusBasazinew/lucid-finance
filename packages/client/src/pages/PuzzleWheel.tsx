import { useEffect, useMemo, useRef, useState } from 'react';
import { PrizeWheel } from '@mertercelik/react-prize-wheel';
import type { Sector, PrizeWheelRef } from '@mertercelik/react-prize-wheel';
import '@mertercelik/react-prize-wheel/style.css';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog';
import { useMe } from '@/hooks/useAuth';
import { useClaimWheelReward } from '@/hooks/useWheel';
import { useReserveWheelSpin } from '@/hooks/useWheel';
import { isAuthenticated } from '@/lib/auth';

export function PuzzleWheelDialog({
   open,
   onOpenChange,
}: {
   open: boolean;
   onOpenChange: (open: boolean) => void;
}) {
   const wheelRef = useRef<PrizeWheelRef>(null);

   const [isSpinning, setIsSpinning] = useState(false);
   const [winner, setWinner] = useState<Sector | null>(null);
   // Track if user has spun in this session
   const [hasSpun, setHasSpun] = useState(false);

   const authed = isAuthenticated();
   const { data: me } = useMe(authed);
   const claim = useClaimWheelReward();
   const reserve = useReserveWheelSpin();

   /**
    * Total probability weight = 28
    * Percentage = (probability / 28) * 100
    */
   const sectors = useMemo(
      () => [
         { id: 1, label: '3,000', probability: 0.00001 },
         { id: 2, label: '100', probability: 3 },
         { id: 3, label: '500', probability: 0.01 },
         { id: 4, label: '50', probability: 5 },
         { id: 5, label: '200', probability: 2 },
         { id: 6, label: '10,000', probability: 0.00001 },
         { id: 7, label: '200', probability: 2 },
         { id: 8, label: '200', probability: 2 },
         { id: 9, label: '100', probability: 3 },
         { id: 10, label: '200', probability: 1 },
         { id: 11, label: '50', probability: 5 },
         { id: 14, label: '5,000', probability: 0.00001 },
         { id: 15, label: '200', probability: 5 },
      ],
      []
   );

   // Only allow dialog to open if not claimed and not spun in this session
   const alreadyClaimed =
      Boolean((me as any)?.wheelRewardClaimed) || (hasSpun && !winner);

   // Prevent reopening dialog after spin, but keep open if winner is present
   useEffect(() => {
      if (alreadyClaimed && open && !winner) onOpenChange(false);
   }, [alreadyClaimed, open, onOpenChange, winner]);

   const parsedWinnerBirr = useMemo(() => {
      if (!winner?.label) return null;
      const clean = String(winner.label).replace(/,/g, '').trim();
      const n = Number.parseInt(clean, 10);
      return Number.isFinite(n) ? n : null;
   }, [winner]);

   const handleSpinStart = () => {
      setIsSpinning(true);
      setWinner(null);
   };

   const handleSpinEnd = (sector: Sector) => {
      setIsSpinning(false);
      setWinner(sector);
      setHasSpun(true); // Mark as spun for this session

      // Reserve on backend immediately so the user can't spin again after refresh
      reserve.mutateAsync().catch((e) => {
         // If reserve fails (already reserved), close dialog and notify
         toast.error(
            e?.response?.data?.message || e?.message || 'Failed to reserve spin'
         );
         setWinner(null);
         setHasSpun(false);
         onOpenChange(false);
      });
   };

   const handleCollect = async () => {
      if (!parsedWinnerBirr) {
         toast.error('Invalid reward');
         return;
      }
      try {
         await claim.mutateAsync({ amountBirr: parsedWinnerBirr });
         toast.success(`Collected Birr ${parsedWinnerBirr.toLocaleString()}`);
         setHasSpun(false);
         setWinner(null);
         onOpenChange(false);
      } catch (e: any) {
         const msg =
            e?.response?.data?.message ||
            e?.message ||
            'Failed to collect reward';
         toast.error(msg);
      }
   };

   if (!authed) return null;
   if (alreadyClaimed && !winner) return null;

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className="max-w-3xl">
            <DialogHeader>
               <DialogTitle>Spin & Win</DialogTitle>
               <DialogDescription>
                  Spin the wheel to get a reward, then collect it.
               </DialogDescription>
            </DialogHeader>

            <div className="relative flex flex-col items-center gap-4">
               <PrizeWheel
                  ref={wheelRef}
                  sectors={sectors}
                  onSpinStart={handleSpinStart}
                  onSpinEnd={handleSpinEnd}
                  duration={6}
                  minSpins={4}
                  maxSpins={4}
                  frameColor="#ffd700"
                  middleColor="#ffd700"
                  middleDotColor="#8b7500"
                  winIndicatorColor="#ffd700"
                  winIndicatorDotColor="#8b7500"
                  sticksColor="#ffd700"
                  wheelColors={['#0a1d3f', '#0a2249']}
                  borderColor="#ffd700"
                  borderWidth={3}
                  textColor="#ffffff"
                  textFontSize={30}
                  wheelShadowColor="#000"
                  wheelShadowOpacity={0.2}
                  middleShadowColor="#000"
                  middleShadowOpacity={0.25}
                  indicatorShadowColor="#000"
                  indicatorShadowOpacity={0.3}
               />

               <Button
                  onClick={() => wheelRef.current?.spin()}
                  disabled={isSpinning || Boolean(winner)}
               >
                  {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
               </Button>

               {winner && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                     <div className="relative w-72 rounded-2xl bg-gradient-to-br from-gray-500/90 to-gray-600/90 p-6 text-white shadow-2xl backdrop-blur-lg animate-in fade-in zoom-in">
                        <div className="absolute -inset-2 rounded-3xl bg-purple-400/30 blur-xl" />

                        <div className="relative z-10 text-center">
                           <div className="text-sm uppercase tracking-wide opacity-90">
                              Congratulations
                           </div>
                           <img
                              src="/balloon.png"
                              alt="Balloon"
                              className="w-20 h-20 mx-auto mt-4"
                           />
                           <div className="mt-2 text-3xl font-black">
                              {parsedWinnerBirr
                                 ? `Birr ${parsedWinnerBirr.toLocaleString()}`
                                 : 'Reward'}
                           </div>

                           <div className="mt-1 text-sm opacity-90">
                              Added to your wallet after collecting
                           </div>

                           <Button
                              onClick={handleCollect}
                              disabled={!parsedWinnerBirr || claim.isPending}
                              className="mt-5 h-11 w-full rounded-xl bg-green-500"
                           >
                              {claim.isPending ? 'Collecting...' : 'Collect'}
                           </Button>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </DialogContent>
      </Dialog>
   );
}

// Backward-compatible export
export const PuzzleWheelPage = PuzzleWheelDialog;
