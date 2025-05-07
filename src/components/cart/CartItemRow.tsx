
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartItem } from "@/context/cart";
import { Minus, Plus, Trash2, Coins } from "lucide-react";

interface CartItemRowProps {
  item: CartItem;
  handleQuantityChange: (id: string, newQuantity: number) => void;
  removeItem: (productId: string) => void;
}

const CartItemRow = ({ item, handleQuantityChange, removeItem }: CartItemRowProps) => {
  return (
    <div className="p-4 border-b border-white/10 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <img 
          src={item.product.image || "/placeholder.svg"} 
          alt={item.product.name}
          className="w-16 h-16 object-contain bg-white/10 p-2 rounded"
        />
        <div>
          <h3 className="font-medium">{item.product.name}</h3>
          <p className="text-sm text-muted-foreground">{item.product.description?.slice(0, 40)}...</p>
        </div>
      </div>
      
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2 w-24">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Input 
            type="number" 
            value={item.quantity} 
            className="h-8 w-12 text-center p-0"
            onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value))}
            min="1"
          />
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        <span className="font-medium w-20 text-right flex items-center justify-end">
          {item.product.priceType === "balance" ? (
            <>
              <Coins size={14} className="text-yellow-400 mr-1" />
              {item.product.price * item.quantity}
            </>
          ) : (
            `${(item.product.price * item.quantity).toFixed(2)} ₺`
          )}
        </span>
        
        <button 
          className="text-red-500 hover:text-red-400 transition-colors p-2"
          onClick={() => removeItem(item.product.id)}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItemRow;
