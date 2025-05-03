import { ShoppingCart, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/cart";

const CartButton = () => {
  const { items, coinBalance } = useCart();
  
  return (
    <div className="flex items-center gap-4">
      {/* Coin Balance Display */}
      <div className="hidden sm:flex items-center gap-1 text-yellow-400">
        <Coins size={16} />
        <span className="text-sm font-medium">{coinBalance || 0}</span>
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
