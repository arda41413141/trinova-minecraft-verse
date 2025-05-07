
import { ShoppingCart, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/cart";
import { MinecraftBadge } from "../ui/minecraft-badge";
import WheelButton from "./WheelButton";

const CartButton = () => {
  const { items, balance } = useCart();
  
  return (
    <div className="flex items-center gap-4">
      {/* Wheel Button */}
      <div className="hidden sm:block">
        <WheelButton />
      </div>
      
      {/* Balance Display */}
      <div className="hidden sm:flex items-center">
        <Link to="/balance">
          <MinecraftBadge 
            variant="default" 
            size="sm" 
            className="bg-green-500/20 text-green-400 border-green-400/30 hover:bg-green-500/30 transition-colors"
          >
            <Wallet size={14} className="mr-1" />
            <span>{balance || 0} ₺</span>
          </MinecraftBadge>
        </Link>
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
