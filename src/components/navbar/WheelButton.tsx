
import { Gift } from "lucide-react";
import { MinecraftBadge } from "../ui/minecraft-badge";
import WheelDialog from "../wheel/WheelDialog";
import { useCart } from "@/context/cart";
import { cn } from "@/lib/utils";

const WheelButton = () => {
  const { coinBalance } = useCart();
  const canSpin = (coinBalance || 0) >= 50;
  
  return (
    <WheelDialog>
      <button className="flex items-center justify-center">
        <MinecraftBadge
          variant="event"
          size="sm"
          className={cn(
            "transition-all duration-300",
            canSpin ? "animate-pulse-gentle hover:bg-amber-500/30" : "bg-gray-500/30"
          )}
        >
          <Gift size={14} className={cn("mr-1", canSpin ? "text-amber-400" : "text-gray-400")} />
          <span>Şans Çarkı</span>
        </MinecraftBadge>
      </button>
    </WheelDialog>
  );
};

export default WheelButton;
