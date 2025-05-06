
import { Gift } from "lucide-react";
import { MinecraftBadge } from "../ui/minecraft-badge";
import WheelDialog from "../wheel/WheelDialog";

const WheelButton = () => {
  return (
    <WheelDialog>
      <button className="flex items-center justify-center">
        <MinecraftBadge
          variant="event"
          size="sm"
          className="animate-pulse-gentle hover:bg-amber-500/30 transition-colors"
        >
          <Gift size={14} className="mr-1" />
          <span>Şans Çarkı</span>
        </MinecraftBadge>
      </button>
    </WheelDialog>
  );
};

export default WheelButton;
