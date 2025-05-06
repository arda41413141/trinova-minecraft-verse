
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Coins, Gift, Percent, Star } from "lucide-react";
import { MinecraftBadge } from "@/components/ui/minecraft-badge";
import { useCart } from "@/context/cart";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import confetti from 'canvas-confetti';

// Define the wheel segments/prizes
export interface WheelSegment {
  id: string;
  name: string;
  color: string;
  icon: React.ReactNode;
  chance: number; // Probability weight
  description: string;
}

const wheelSegments: WheelSegment[] = [
  {
    id: "discount5",
    name: "5% İndirim",
    color: "bg-blue-500",
    icon: <Percent size={24} className="text-white" />,
    chance: 30,
    description: "Tüm alışverişlerinizde 5% indirim"
  },
  {
    id: "discount10",
    name: "10% İndirim",
    color: "bg-green-500",
    icon: <Percent size={24} className="text-white" />,
    chance: 20,
    description: "Tüm alışverişlerinizde 10% indirim"
  },
  {
    id: "discount15",
    name: "15% İndirim",
    color: "bg-purple-500",
    icon: <Percent size={24} className="text-white" />,
    chance: 15,
    description: "Tüm alışverişlerinizde 15% indirim"
  },
  {
    id: "coins100",
    name: "100 Coin",
    color: "bg-yellow-500",
    icon: <Coins size={24} className="text-white" />,
    chance: 25,
    description: "100 Coin kazandınız!"
  },
  {
    id: "vipBasic",
    name: "VIP Paketi",
    color: "bg-amber-600",
    icon: <Star size={24} className="text-yellow-300" />,
    chance: 10, // Lowest chance
    description: "Temel VIP Paketi kazandınız!"
  },
];

const SPIN_COST = 50; // Cost in coins to spin the wheel

interface SpinningWheelProps {
  onClose?: () => void;
}

const SpinningWheel = ({ onClose }: SpinningWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<WheelSegment | null>(null);
  const { coinBalance, useCoins, addCoins, addItem } = useCart();
  const wheelRef = useRef<HTMLDivElement>(null);
  const segmentAngle = 360 / wheelSegments.length;
  const [showSparkles, setShowSparkles] = useState(false);

  // Check if user can afford to spin
  const canSpin = coinBalance >= SPIN_COST && !isSpinning;

  // Calculate total chance weight
  const totalChance = wheelSegments.reduce((sum, segment) => sum + segment.chance, 0);

  const launchConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };
    
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      const particleCount = 50 * (timeLeft / duration);
      
      // Random colors for confetti particles
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
      });
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
      });
    }, 250);
  };

  const spinWheel = () => {
    if (!canSpin) return;
    
    // Use coins
    if (!useCoins(SPIN_COST)) {
      toast.error("Yeterli coin yok!");
      return;
    }

    setIsSpinning(true);
    setWinner(null);
    setShowSparkles(false);
    
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
    
    // Calculate the rotation to ensure the wheel lands on the winning segment
    // We add multiple full rotations (e.g., 5 * 360) for a nice spinning effect
    // Then add a specific rotation to land on the winning segment
    // We subtract from 360 because the wheel rotates clockwise but our segments are arranged counterclockwise
    const destinationRotation = 
      2880 + // 8 full rotations for effect (increased for more dramatic spin)
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
      
      // Celebrate big wins
      if (selectedSegment!.id === "vipBasic" || selectedSegment!.id === "discount15") {
        setShowSparkles(true);
        launchConfetti();
        const celebrationSound = new Audio('/sounds/celebration.mp3');
        celebrationSound.volume = 0.5;
        celebrationSound.play().catch(e => console.warn("Failed to play celebration sound", e));
      } else {
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
      case "coins100":
        addCoins(100);
        toast.success("100 Coin kazandınız!");
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
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-500 to-transparent rounded-full blur-xl"></div>
      </div>
      
      <div className="mb-6 text-center relative z-10">
        <h2 className="text-3xl font-minecraft text-minecraft-primary mb-2 glow-effect">Şans Çarkı</h2>
        <p className="text-muted-foreground mb-4">Çarkı çevirmek için {SPIN_COST} coin harcayın!</p>
        
        <div className="flex justify-center mb-4">
          <MinecraftBadge 
            variant="default" 
            size="default" 
            className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30 animate-pulse-gentle"
          >
            <Coins size={16} className="mr-2" />
            <span>{coinBalance || 0} Coin</span>
          </MinecraftBadge>
        </div>
      </div>
      
      {/* Wheel container with fancy border */}
      <div className="relative w-80 h-80 mb-8">
        {/* Sparkle effects */}
        {showSparkles && (
          <>
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-300 blur-md rounded-full animate-pulse z-0"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-purple-300 blur-md rounded-full animate-pulse z-0"></div>
            <div className="absolute top-1/2 -left-6 w-6 h-6 bg-blue-300 blur-md rounded-full animate-pulse z-0"></div>
            <div className="absolute bottom-1/4 -right-6 w-6 h-6 bg-green-300 blur-md rounded-full animate-pulse z-0"></div>
          </>
        )}
        
        {/* Pointer/Ticker at the top */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 z-20">
          <div className="w-8 h-8 bg-white shadow-lg border-4 border-minecraft-primary rotate-45 transform translate-y-1/2 animate-pulse"></div>
        </div>
        
        {/* Fancy border around wheel */}
        <div className="absolute inset-0 rounded-full border-8 border-minecraft-primary/50 glow-effect z-10"></div>
        
        {/* Spinning Wheel */}
        <div 
          ref={wheelRef}
          className={cn(
            "wheel-container w-full h-full rounded-full overflow-hidden border-4 border-minecraft-primary relative shadow-xl z-10",
            isSpinning ? "spinning" : ""
          )}
          style={{
            transform: `rotate(${rotation}deg)`, 
            transition: isSpinning ? 'transform 6s cubic-bezier(0.2, 0.8, 0.3, 1)' : 'none',
            boxShadow: '0 0 15px rgba(139, 92, 246, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.3)'
          }}
        >
          {wheelSegments.map((segment, index) => {
            const startAngle = index * segmentAngle;
            return (
              <div 
                key={segment.id}
                className={cn(
                  "absolute w-full h-full origin-bottom-right", 
                  segment.color,
                  "shadow-inner"
                )}
                style={{
                  clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(Math.PI * startAngle / 180)}% ${50 + 50 * Math.sin(Math.PI * startAngle / 180)}%, ${50 + 50 * Math.cos(Math.PI * (startAngle + segmentAngle) / 180)}% ${50 + 50 * Math.sin(Math.PI * (startAngle + segmentAngle) / 180)}%, 50% 50%)`,
                  transform: `rotate(${index * segmentAngle}deg)`,
                  background: `linear-gradient(to top, ${segment.color.replace('bg-', '')} 60%, rgba(255,255,255,0.2) 100%)`,
                }}
              >
                <div 
                  className="absolute text-white font-bold text-sm w-full h-full flex items-center justify-center"
                  style={{ transform: `rotate(${segmentAngle / 2}deg) translateY(-70px)` }}
                >
                  <div className="transform -rotate-90 flex flex-col items-center">
                    <div className="bg-black/20 p-2 rounded-full mb-1">
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
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-minecraft-primary border-4 border-white flex items-center justify-center shadow-lg">
            <Gift size={24} className="text-white" />
          </div>
        </div>
      </div>
      
      <div className="space-y-4 w-full text-center z-10 relative">
        <Button 
          onClick={spinWheel} 
          disabled={!canSpin}
          className={cn(
            "minecraft-btn w-full text-lg transition-all duration-300",
            !canSpin && "opacity-50 cursor-not-allowed",
            !isSpinning && canSpin && "animate-pulse-gentle hover:scale-105"
          )}
        >
          <div className="btn-content flex items-center">
            <Gift size={20} className="mr-2" />
            Çarkı Çevir
          </div>
        </Button>
        
        {winner && (
          <div className={cn(
            "mt-4 p-6 border rounded-md transition-all duration-500 transform",
            showSparkles ? "scale-105 vip-card" : "border-minecraft-primary/30 bg-black/30"
          )}>
            <h3 className="text-xl font-minecraft text-minecraft-primary mb-3">Tebrikler!</h3>
            <p className="text-white mb-4">{winner.description}</p>
            <div className="flex justify-center">
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center transform transition-transform duration-500",
                winner.color,
                showSparkles && "animate-pulse-gentle scale-110"
              )}>
                {winner.icon}
              </div>
            </div>
            
            {showSparkles && (
              <div className="mt-4 flex justify-center">
                <Button 
                  variant="outline" 
                  className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-500/20"
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
        <Button variant="outline" onClick={onClose} className="mt-6 border-minecraft-primary/30 hover:bg-minecraft-primary/20">
          Kapat
        </Button>
      )}
    </div>
  );
};

export default SpinningWheel;
