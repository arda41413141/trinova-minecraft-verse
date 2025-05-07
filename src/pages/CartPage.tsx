
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import EmptyCart from '@/components/cart/EmptyCart';
import CartItemSection from '@/components/cart/CartItemSection';
import OrderSummary from '@/components/cart/OrderSummary';

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, processCheckout } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error("Ödeme yapmak için giriş yapmalısınız");
      return;
    }
    
    setIsProcessing(true);
    
    // Process payment using our new function
    const success = await processCheckout();
    if (success) {
      navigate("/profile");
    }
    
    setIsProcessing(false);
  };

  // Separate items by price type (money vs balance)
  const moneyItems = items.filter(item => item.product.priceType !== "balance");
  const balanceItems = items.filter(item => item.product.priceType === "balance");

  // Calculate total price for money items
  const totalMoneyPrice = moneyItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 
    0
  );

  // Calculate total balance needed
  const totalBalance = balanceItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 
    0
  );

  return (
    <div className="container mx-auto px-4 py-20 pt-32">
      <h1 className="section-title">Sepetim</h1>
      
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Money Items Section */}
            <CartItemSection
              title="TL ile Satın Alınacak Ürünler"
              bgClass="bg-minecraft-primary/20"
              borderClass="border-b border-minecraft-primary/30"
              items={moneyItems}
              handleQuantityChange={handleQuantityChange}
              removeItem={removeItem}
            />
            
            {/* Balance Items Section */}
            <CartItemSection
              title="Bakiye ile Satın Alınacak Ürünler"
              bgClass="bg-yellow-600/20"
              borderClass="border-b border-yellow-500/30"
              items={balanceItems}
              handleQuantityChange={handleQuantityChange}
              removeItem={removeItem}
            />
            
            {items.length > 0 && (
              <div className="p-4 flex justify-end">
                <Button 
                  variant="outline" 
                  className="text-muted-foreground"
                  onClick={clearCart}
                >
                  Sepeti Temizle
                </Button>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <OrderSummary 
              totalMoneyPrice={totalMoneyPrice}
              totalCoins={totalBalance}
              isProcessing={isProcessing}
              isAuthenticated={isAuthenticated}
              handleCheckout={handleCheckout}
              moneyItemsExist={moneyItems.length > 0}
              coinItemsExist={balanceItems.length > 0}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
