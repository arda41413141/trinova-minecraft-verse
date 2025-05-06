
import { ShoppingCart, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/cart";
import { MinecraftBadge } from "../ui/minecraft-badge";
import WheelButton from "./WheelButton";

const CartButton = () => {
  const { items, coinBalance } = useCart();
  
  return (
    <div className="flex items-center gap-4">
      {/* Wheel Button */}
      <div className="hidden sm:block">
        <WheelButton />
      </div>
      
      {/* Coin Balance Display */}
      <div className="hidden sm:flex items-center">
        <MinecraftBadge 
          variant="default" 
          size="sm" 
          className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30 hover:bg-yellow-500/30 transition-colors"
        >
          <Coins size={14} className="mr-1" />
          <span>{coinBalance || 0}</span>
        </MinecraftBadge>
      </div>
      
      {/* Shopping Cart */}
      <Link to="/cart" className="relative">
        <ShoppingCart className="text-white hover:text-minecraft-primary transition-colors" />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-minecraft-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </Link>
    </div>
  );
};

export default CartButton;
