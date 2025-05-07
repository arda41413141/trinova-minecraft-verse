
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Gift, Wallet } from "lucide-react";
import { useCart } from "@/context/cart";
import { cn } from "@/lib/utils";
import { WheelSegment, SPIN_COST } from "./types";
import { wheelSegments } from "./wheelSegments";
import WheelDisplay from "./WheelDisplay";
import WinnerDisplay from "./WinnerDisplay";
import InsufficientBalanceDisplay from "./InsufficientBalanceDisplay";
import { 
  launchPremiumConfetti, 
  launchConfetti, 
  handlePrize,
  determineWinner,
  playSounds 
} from "./prizeUtils";

interface SpinningWheelProps {
  onClose?: () => void;
}

const SpinningWheel = ({ onClose }: SpinningWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<WheelSegment | null>(null);
  const { balance, useBalance, addBalance, addItem } = useCart();
  const [showAnimation, setShowAnimation] = useState(false);
  const [showWinnerAnimation, setShowWinnerAnimation] = useState(false);

  // Check if user can afford to spin
  const canSpin = balance >= SPIN_COST && !isSpinning;
  const segmentAngle = 360 / wheelSegments.length;

  const spinWheel = () => {
    if (!canSpin) return;
    
    // Use balance
    if (!useBalance(SPIN_COST, "Şans çarkı çevirme ücreti")) {
      return;
    }

    setIsSpinning(true);
    setWinner(null);
    setShowAnimation(true);
    setShowWinnerAnimation(false);
    
    // Determine the winner
    const selectedSegment = determineWinner(wheelSegments);
    
    // Calculate rotation to land on the winner
    // Find the segment index
    const winningIndex = wheelSegments.findIndex(segment => segment.id === selectedSegment.id);
    
    // Enhanced rotation for more dramatic effect
    const destinationRotation = 
      3600 + // 10 full rotations for dramatic effect
      (360 - ((winningIndex * segmentAngle) + (segmentAngle / 2)));
    
    setRotation(destinationRotation);
    
    // Sound effect for spinning
    playSounds.spin();
    
    // After animation completes, set the winner and celebrate
    setTimeout(() => {
      setIsSpinning(false);
      setWinner(selectedSegment);
      handlePrize(selectedSegment, addBalance, addItem);
      setShowAnimation(false);
      setShowWinnerAnimation(true);
      
      // Celebrate big wins
      if (selectedSegment.id === "vipBasic" || selectedSegment.id === "discount15") {
        launchPremiumConfetti();
        playSounds.celebrate();
      } else {
        launchConfetti();
        playSounds.win();
      }
    }, 6000); // Match this with the CSS animation duration
  };
  
  return (
    <div className="flex flex-col items-center p-6 relative">
      {/* Premium background glow effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-minecraft-darker to-black opacity-90"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-purple-600 rounded-full filter blur-[120px] opacity-20 animate-pulse-gentle"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-blue-600 rounded-full filter blur-[100px] opacity-20 animate-pulse-gentle" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
      
      <div className="mb-8 text-center relative z-10">
        <h2 className="text-3xl font-minecraft mb-2 bg-gradient-to-r from-purple-400 via-purple-600 to-indigo-600 text-transparent bg-clip-text animate-pulse-gentle">
          PREMİUM ŞANS ÇARKI
        </h2>
        <p className="text-lg text-white/80 mb-4">
          Çarkı çevirmek için <span className="font-bold text-amber-400">{SPIN_COST} TL</span> harcayın!
        </p>
        
        <div className="flex justify-center mb-6">
          <div className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500/20 to-amber-700/20 border border-amber-500/30">
            <Wallet size={18} className="text-amber-400 mr-2" />
            <span className="text-amber-400 font-semibold text-lg">{balance.toFixed(2)} TL</span>
          </div>
        </div>
      </div>
      
      {/* Display wheel or insufficient balance message */}
      {canSpin || isSpinning ? (
        <>
          <WheelDisplay 
            wheelSegments={wheelSegments}
            rotation={rotation}
            isSpinning={isSpinning}
            showAnimation={showAnimation}
          />
          
          <div className="space-y-6 w-full text-center z-10 relative max-w-md">
            <Button 
              onClick={spinWheel} 
              disabled={!canSpin}
              className={cn(
                "w-full py-6 text-lg relative overflow-hidden",
                !canSpin ? "opacity-50 cursor-not-allowed" : 
                !isSpinning && canSpin ? "animate-pulse-gentle hover:scale-105" : "",
                "bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 hover:from-purple-700 hover:to-purple-800",
                "border border-purple-400/30 shadow-lg shadow-purple-500/20"
              )}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 animate-shine"></div>
              
              <div className="flex items-center justify-center">
                <Gift size={24} className="mr-2 text-white" />
                <span className="font-semibold text-white">Çarkı Çevir</span>
              </div>
            </Button>
            
            {/* Winner Display */}
            <WinnerDisplay winner={winner} showWinnerAnimation={showWinnerAnimation} />
          </div>
        </>
      ) : (
        <InsufficientBalanceDisplay balance={balance} onClose={onClose || (() => {})} />
      )}
      
      {onClose && (
        <Button variant="outline" onClick={onClose} className="mt-8 border-white/10 hover:bg-white/5 text-white/70">
          Kapat
        </Button>
      )}
    </div>
  );
};

export default SpinningWheel;
