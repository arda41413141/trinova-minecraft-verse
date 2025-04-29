
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const CartButton = () => {
  const { items } = useCart();
  
  return (
    <Link to="/cart" className="relative">
      <ShoppingCart className="text-white hover:text-minecraft-primary transition-colors" />
      {items.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-minecraft-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {items.length}
        </span>
      )}
    </Link>
  );
};

export default CartButton;
