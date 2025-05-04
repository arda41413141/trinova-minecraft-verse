
import { CartItem } from "@/context/cart";
import CartItemRow from "./CartItemRow";

interface CartItemSectionProps {
  title: string;
  bgClass: string;
  borderClass: string;
  items: CartItem[];
  handleQuantityChange: (id: string, newQuantity: number) => void;
  removeItem: (productId: string) => void;
}

const CartItemSection = ({ 
  title, 
  bgClass, 
  borderClass,
  items,
  handleQuantityChange,
  removeItem
}: CartItemSectionProps) => {
  if (items.length === 0) return null;
  
  return (
    <div className="glass-card mb-6 overflow-hidden">
      <div className={`p-4 ${bgClass} ${borderClass} flex justify-between`}>
        <span className="font-medium">{title}</span>
        <div className="flex items-center gap-10">
          <span className="font-medium w-24 text-center">Miktar</span>
          <span className="font-medium w-20 text-center">Fiyat</span>
          <span className="w-8"></span>
        </div>
      </div>
      
      {items.map((item) => (
        <CartItemRow
          key={item.product.id}
          item={item}
          handleQuantityChange={handleQuantityChange}
          removeItem={removeItem}
        />
      ))}
    </div>
  );
};

export default CartItemSection;
