
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Coins, Gift, Percent, Star } from "lucide-react";
import { MinecraftBadge } from "@/components/ui/minecraft-badge";
import { useCart } from "@/context/cart";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
    icon: <Percent size={24} />,
    chance: 30,
    description: "Tüm alışverişlerinizde 5% indirim"
  },
  {
    id: "discount10",
    name: "10% İndirim",
    color: "bg-green-500",
    icon: <Percent size={24} />,
    chance: 20,
    description: "Tüm alışverişlerinizde 10% indirim"
  },
  {
    id: "discount15",
    name: "15% İndirim",
    color: "bg-purple-500",
    icon: <Percent size={24} />,
    chance: 15,
    description: "Tüm alışverişlerinizde 15% indirim"
  },
  {
    id: "coins100",
    name: "100 Coin",
    color: "bg-yellow-500",
    icon: <Coins size={24} />,
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

  // Check if user can afford to spin
  const canSpin = coinBalance >= SPIN_COST && !isSpinning;

  // Calculate total chance weight
  const totalChance = wheelSegments.reduce((sum, segment) => sum + segment.chance, 0);

  const spinWheel = () => {
    if (!canSpin) return;
    
    // Use coins
    if (!useCoins(SPIN_COST)) {
      toast.error("Yeterli coin yok!");
      return;
    }

    setIsSpinning(true);
    setWinner(null);
    
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
      1800 + // 5 full rotations for effect
      (360 - ((winningIndex * segmentAngle) + (segmentAngle / 2)));
    
    setRotation(destinationRotation);
    
    // After animation completes, set the winner
    setTimeout(() => {
      setIsSpinning(false);
      setWinner(selectedSegment!);
      handlePrize(selectedSegment!);
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
    <div className="flex flex-col items-center p-6">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-minecraft text-minecraft-primary mb-2">Şans Çarkı</h2>
        <p className="text-muted-foreground mb-4">Çarkı çevirmek için {SPIN_COST} coin harcayın!</p>
        
        <div className="flex justify-center mb-4">
          <MinecraftBadge 
            variant="default" 
            size="default" 
            className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30"
          >
            <Coins size={16} className="mr-2" />
            <span>{coinBalance || 0} Coin</span>
          </MinecraftBadge>
        </div>
      </div>
      
      <div className="relative w-72 h-72 mb-8">
        {/* Pointer/Ticker at the top */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 z-10">
          <div className="w-8 h-8 bg-white border-4 border-minecraft-primary rotate-45 transform translate-y-1/2"></div>
        </div>
        
        {/* Spinning Wheel */}
        <div 
          ref={wheelRef}
          className="wheel-container w-full h-full rounded-full overflow-hidden border-4 border-minecraft-primary relative"
          style={{
            transform: `rotate(${rotation}deg)`, 
            transition: isSpinning ? 'transform 5s cubic-bezier(0.2, 0.8, 0.3, 1)' : 'none'
          }}
        >
          {wheelSegments.map((segment, index) => {
            const startAngle = index * segmentAngle;
            return (
              <div 
                key={segment.id}
                className={cn(
                  "absolute w-full h-full origin-bottom-right", 
                  segment.color
                )}
                style={{
                  clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(Math.PI * startAngle / 180)}% ${50 + 50 * Math.sin(Math.PI * startAngle / 180)}%, ${50 + 50 * Math.cos(Math.PI * (startAngle + segmentAngle) / 180)}% ${50 + 50 * Math.sin(Math.PI * (startAngle + segmentAngle) / 180)}%, 50% 50%)`,
                  transform: `rotate(${index * segmentAngle}deg)`
                }}
              >
                <div 
                  className="absolute text-white font-bold text-sm w-full h-full flex items-center justify-center"
                  style={{ transform: `rotate(${segmentAngle / 2}deg) translateY(-70px)` }}
                >
                  <div className="transform -rotate-90 flex flex-col items-center">
                    {segment.icon}
                    <span className="mt-1 text-xs">{segment.name}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="space-y-4 w-full text-center">
        <Button 
          onClick={spinWheel} 
          disabled={!canSpin}
          className={cn(
            "minecraft-btn w-full text-lg",
            !canSpin && "opacity-50 cursor-not-allowed"
          )}
        >
          <div className="btn-content flex items-center">
            <Gift size={20} className="mr-2" />
            Çarkı Çevir
          </div>
        </Button>
        
        {winner && (
          <div className="mt-4 p-4 border border-minecraft-primary/30 rounded-md bg-black/30">
            <h3 className="text-lg font-minecraft text-minecraft-primary mb-2">Tebrikler!</h3>
            <p className="text-white mb-2">{winner.description}</p>
            <div className="flex justify-center">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                winner.color
              )}>
                {winner.icon}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {onClose && (
        <Button variant="outline" onClick={onClose} className="mt-4">
          Kapat
        </Button>
      )}
    </div>
  );
};

export default SpinningWheel;
