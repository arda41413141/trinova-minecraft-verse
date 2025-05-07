
import { Gift } from "lucide-react";
import { MinecraftBadge } from "../ui/minecraft-badge";
import WheelDialog from "../wheel/WheelDialog";
import { useCart } from "@/context/cart";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SPIN_COST } from "../wheel/types";

const WheelButton = () => {
  const { balance } = useCart();
  const canSpin = (balance || 0) >= SPIN_COST;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <WheelDialog>
              <button className="flex items-center justify-center">
                <MinecraftBadge
                  variant="event"
                  size="sm"
                  className={cn(
                    "transition-all duration-300 relative overflow-hidden",
                    canSpin ? 
                      "animate-pulse-gentle hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-purple-800/30" : 
                      "bg-gray-500/30"
                  )}
                >
                  {/* Premium shine effect when available */}
                  {canSpin && (
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></span>
                  )}
                  <Gift size={14} className={cn("mr-1", canSpin ? "text-purple-400" : "text-gray-400")} />
                  <span>Premium Çark</span>
                </MinecraftBadge>
              </button>
            </WheelDialog>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{canSpin ? "Premium çarkı çevirmek için tıkla!" : `Çarkı çevirmek için ${SPIN_COST} TL bakiye gerekiyor`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WheelButton;
