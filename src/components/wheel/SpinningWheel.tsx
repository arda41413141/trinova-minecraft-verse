
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Gift, Percent, Star, Wallet, Crown, Diamond } from "lucide-react";
import { MinecraftBadge } from "@/components/ui/minecraft-badge";
import { useCart } from "@/context/cart";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import confetti from 'canvas-confetti';

// Define the wheel segments/prizes with modern styling
export interface WheelSegment {
  id: string;
  name: string;
  color: string;
  gradient: string;
  icon: React.ReactNode;
  chance: number; // Probability weight
  description: string;
}

const wheelSegments: WheelSegment[] = [
  {
    id: "discount5",
    name: "5% İndirim",
    color: "from-blue-600 to-blue-800",
    gradient: "linear-gradient(135deg, #60a5fa, #1e40af)",
    icon: <Percent size={24} className="text-white" />,
    chance: 30,
    description: "Tüm alışverişlerinizde 5% indirim"
  },
  {
    id: "discount10",
    name: "10% İndirim",
    color: "from-green-600 to-green-800",
    gradient: "linear-gradient(135deg, #4ade80, #15803d)",
    icon: <Percent size={24} className="text-white" />,
    chance: 20,
    description: "Tüm alışverişlerinizde 10% indirim"
  },
  {
    id: "discount15",
    name: "15% İndirim",
    color: "from-purple-600 to-purple-900",
    gradient: "linear-gradient(135deg, #a855f7, #6b21a8)",
    icon: <Percent size={24} className="text-white" />,
    chance: 15,
    description: "Tüm alışverişlerinizde 15% indirim"
  },
  {
    id: "balance100",
    name: "100 TL",
    color: "from-amber-500 to-amber-700",
    gradient: "linear-gradient(135deg, #f59e0b, #b45309)",
    icon: <Wallet size={24} className="text-white" />,
    chance: 25,
    description: "100 TL bakiye kazandınız!"
  },
  {
    id: "vipBasic",
    name: "VIP Paketi",
    color: "from-pink-600 to-rose-900",
    gradient: "linear-gradient(135deg, #ec4899, #881337)",
    icon: <Crown size={24} className="text-yellow-300" />,
    chance: 10, // Lowest chance
    description: "Temel VIP Paketi kazandınız!"
  },
];

const SPIN_COST = 50; // Cost in TL to spin the wheel

interface SpinningWheelProps {
  onClose?: () => void;
}

const SpinningWheel = ({ onClose }: SpinningWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<WheelSegment | null>(null);
  const { balance, useBalance, addBalance, addItem } = useCart();
  const wheelRef = useRef<HTMLDivElement>(null);
  const segmentAngle = 360 / wheelSegments.length;
  const [showAnimation, setShowAnimation] = useState(false);
  const [showWinnerAnimation, setShowWinnerAnimation] = useState(false);

  // Check if user can afford to spin
  const canSpin = balance >= SPIN_COST && !isSpinning;

  // Calculate total chance weight
  const totalChance = wheelSegments.reduce((sum, segment) => sum + segment.chance, 0);

  // Premium confetti effect
  const launchPremiumConfetti = () => {
    const duration = 4000;
    const animationEnd = Date.now() + duration;
    
    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }
    
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      const particleCount = 50 * (timeLeft / duration);
      
      // Gold and premium colored confetti
      confetti({
        particleCount: Math.floor(particleCount),
        spread: 70,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#FFD700', '#FFA500', '#F8F8FF', '#9b87f5', '#7E69AB'],
        shapes: ['circle', 'square'],
      });
      
      confetti({
        particleCount: Math.floor(particleCount),
        spread: 70,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#FFD700', '#FFA500', '#F8F8FF', '#9b87f5', '#7E69AB'],
        shapes: ['circle', 'square'],
      });
    }, 250);
  };
  
  // Regular confetti effect
  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#F8F8FF', '#9b87f5', '#7E69AB'],
    });
  };

  const spinWheel = () => {
    if (!canSpin) return;
    
    // Use balance
    if (!useBalance(SPIN_COST, "Şans çarkı çevirme ücreti")) {
      toast.error("Yeterli bakiye yok!");
      return;
    }

    setIsSpinning(true);
    setWinner(null);
    setShowAnimation(true);
    setShowWinnerAnimation(false);
    
    // Randomly determine the winner based on weighted chances
    const randomValue = Math.random() * totalChance;
    let cumulativeChance = 0;
    
    let selectedSegment: WheelSegment | undefined;
    for (const segment of wheelSegments) {
      cumulativeChance += segment.chance;
      if (randomValue < cumulativeChance) {
        selectedSegment = segment;
        break;
      }
    }
    
    if (!selectedSegment) {
      selectedSegment = wheelSegments[0]; // Fallback
    }

    // Calculate rotation to land on the winner
    // Find the segment index
    const winningIndex = wheelSegments.findIndex(segment => segment.id === selectedSegment!.id);
    
    // Enhanced rotation for more dramatic effect
    const destinationRotation = 
      3600 + // 10 full rotations for dramatic effect
      (360 - ((winningIndex * segmentAngle) + (segmentAngle / 2)));
    
    setRotation(destinationRotation);
    
    // Sound effect for spinning
    const spinSound = new Audio('/sounds/wheel-spin.mp3');
    spinSound.volume = 0.3;
    spinSound.play().catch(e => console.warn("Failed to play spin sound", e));
    
    // After animation completes, set the winner and celebrate
    setTimeout(() => {
      setIsSpinning(false);
      setWinner(selectedSegment!);
      handlePrize(selectedSegment!);
      setShowAnimation(false);
      setShowWinnerAnimation(true);
      
      // Celebrate big wins
      if (selectedSegment!.id === "vipBasic" || selectedSegment!.id === "discount15") {
        launchPremiumConfetti();
        const celebrationSound = new Audio('/sounds/celebration.mp3');
        celebrationSound.volume = 0.5;
        celebrationSound.play().catch(e => console.warn("Failed to play celebration sound", e));
      } else {
        launchConfetti();
        const winSound = new Audio('/sounds/win-sound.mp3');
        winSound.volume = 0.4;
        winSound.play().catch(e => console.warn("Failed to play win sound", e));
      }
    }, 6000); // Match this with the CSS animation duration
  };
  
  // Handle the prize award
  const handlePrize = (segment: WheelSegment) => {
    switch(segment.id) {
      case "discount5":
      case "discount10":
      case "discount15":
        // Store discount code in localStorage
        const discountAmount = segment.id === "discount5" ? 5 : segment.id === "discount10" ? 10 : 15;
        localStorage.setItem("minecraft_discount", JSON.stringify({
          code: `DISCOUNT${discountAmount}`,
          amount: discountAmount,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
        }));
        toast.success(`${segment.name} kazandınız! Bir sonraki alışverişinizde geçerli.`);
        break;
      case "balance100":
        addBalance(100);
        toast.success("100 TL bakiye kazandınız!");
        break;
      case "vipBasic":
        // Get first VIP product from products
        import("@/data/products").then(({ products }) => {
          const vipProduct = products.find(p => p.category === "rank");
          if (vipProduct) {
            addItem(vipProduct, 1);
            toast.success("VIP Paketi kazandınız! Sepetinize eklendi.");
          }
        });
        break;
      default:
        toast.info("Bir ödül kazandınız!");
    }
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
      
      {/* Wheel container with premium border */}
      <div className="relative w-80 h-80 mb-10">
        {/* Animated glowing ring */}
        <div className={cn(
          "absolute inset-[-8px] rounded-full transition-all duration-1000",
          "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500",
          isSpinning ? "animate-spin opacity-70" : "opacity-30",
          showWinnerAnimation && "animate-pulse-gentle opacity-70"
        )} style={{filter: "blur(8px)"}}></div>
        
        {/* Elite border around wheel */}
        <div className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 z-10"></div>
        
        {/* Pointer/Ticker at the top */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 z-20">
          <div className={cn(
            "w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg",
            "border-2 border-white rotate-45 transform translate-y-1/2",
            isSpinning ? "animate-wheel-tick" : ""
          )}></div>
        </div>
        
        {/* Spinning Wheel */}
        <div 
          ref={wheelRef}
          className={cn(
            "wheel-container w-full h-full rounded-full overflow-hidden relative z-10",
            "border-4 border-white/20 shadow-[0_0_15px_rgba(139,92,246,0.5)]",
            isSpinning ? "spinning" : ""
          )}
          style={{
            transform: `rotate(${rotation}deg)`, 
            transition: isSpinning ? 'transform 6s cubic-bezier(0.2, 0.8, 0.3, 1)' : 'none',
            background: 'radial-gradient(circle at center, #1A1F2C 0%, #13151A 100%)'
          }}
        >
          {wheelSegments.map((segment, index) => {
            const startAngle = index * segmentAngle;
            return (
              <div 
                key={segment.id}
                className="absolute w-full h-full origin-bottom-right"
                style={{
                  clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(Math.PI * startAngle / 180)}% ${50 + 50 * Math.sin(Math.PI * startAngle / 180)}%, ${50 + 50 * Math.cos(Math.PI * (startAngle + segmentAngle) / 180)}% ${50 + 50 * Math.sin(Math.PI * (startAngle + segmentAngle) / 180)}%, 50% 50%)`,
                  transform: `rotate(${index * segmentAngle}deg)`,
                  background: segment.gradient,
                  boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.2)",
                }}
              >
                <div 
                  className="absolute text-white font-bold text-sm w-full h-full flex items-center justify-center"
                  style={{ transform: `rotate(${segmentAngle / 2}deg) translateY(-70px)` }}
                >
                  <div className="transform -rotate-90 flex flex-col items-center">
                    <div className="bg-black/40 p-2 rounded-full mb-1 backdrop-blur-sm">
                      {segment.icon}
                    </div>
                    <span className="mt-1 text-xs font-bold text-white drop-shadow-lg">
                      {segment.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Center decoration */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br from-purple-600 to-purple-900 border-2 border-white/40">
            <Gift size={28} className="text-white" />
          </div>
        </div>
        
        {/* Animated particles during spin */}
        {showAnimation && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-2 h-2 rounded-full bg-white"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.7 + 0.3,
                  animation: `sparkle ${Math.random() * 3 + 2}s linear infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}
      </div>
      
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
        
        {winner && (
          <div className={cn(
            "mt-4 p-6 border rounded-md transition-all duration-500 transform",
            showWinnerAnimation 
              ? "scale-105 bg-gradient-to-b from-black/80 to-black/70 border-purple-500/50 shadow-lg shadow-purple-500/20" 
              : "border-minecraft-primary/30 bg-black/30"
          )}>
            <h3 className={cn(
              "text-xl font-minecraft mb-3",
              showWinnerAnimation ? "bg-gradient-to-r from-purple-400 via-purple-600 to-indigo-600 text-transparent bg-clip-text" : "text-minecraft-primary"
            )}>
              Tebrikler!
            </h3>
            <p className="text-white mb-4">{winner.description}</p>
            <div className="flex justify-center">
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center transform transition-transform duration-500",
                "bg-gradient-to-br from-purple-600 to-purple-900 border-2 border-white/20",
                showWinnerAnimation && "animate-pulse-gentle scale-110"
              )}>
                {winner.icon}
              </div>
            </div>
            
            {showWinnerAnimation && (
              <div className="mt-6 flex justify-center">
                <Button 
                  variant="outline" 
                  className="border-purple-400/50 text-purple-400 hover:bg-purple-500/20"
                  onClick={() => {
                    if (winner.id === "vipBasic") {
                      window.location.href = "/shop";
                    }
                  }}
                >
                  {winner.id === "vipBasic" ? "VIP Paketimi Göster" : "Harika!"}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {onClose && (
        <Button variant="outline" onClick={onClose} className="mt-8 border-white/10 hover:bg-white/5 text-white/70">
          Kapat
        </Button>
      )}
    </div>
  );
};

export default SpinningWheel;
