
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { Trash2, Minus, Plus, CreditCard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, processCheckout } = useCart();
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

  return (
    <div className="container mx-auto px-4 py-20 pt-32">
      <h1 className="section-title">Sepetim</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-3xl text-muted-foreground mb-4">Sepetiniz boş</div>
          <p className="mb-8">Sepetinizde henüz ürün bulunmamaktadır.</p>
          <Link to="/shop">
            <Button className="minecraft-btn">
              <span className="btn-content">Alışverişe Başla</span>
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="glass-card mb-6 overflow-hidden">
              <div className="p-4 bg-minecraft-primary/20 border-b border-minecraft-primary/30 flex justify-between">
                <span className="font-medium">Ürün</span>
                <div className="flex items-center gap-10">
                  <span className="font-medium w-24 text-center">Miktar</span>
                  <span className="font-medium w-20 text-center">Fiyat</span>
                  <span className="w-8"></span>
                </div>
              </div>
              
              {items.map((item) => (
                <div key={item.product.id} className="p-4 border-b border-white/10 flex justify-between items-center">
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
                    
                    <span className="font-medium w-20 text-right">
                      {(item.product.price * item.quantity).toFixed(2)} ₺
                    </span>
                    
                    <button 
                      className="text-red-500 hover:text-red-400 transition-colors p-2"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="p-4 flex justify-end">
                <Button 
                  variant="outline" 
                  className="text-muted-foreground"
                  onClick={clearCart}
                >
                  Sepeti Temizle
                </Button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-28">
              <h2 className="font-minecraft text-xl text-minecraft-primary mb-6">Sipariş Özeti</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Ara Toplam</span>
                  <span>{totalPrice.toFixed(2)} ₺</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>KDV</span>
                  <span>{(totalPrice * 0.18).toFixed(2)} ₺</span>
                </div>
                <div className="h-px bg-white/10 my-4"></div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Toplam</span>
                  <span>{(totalPrice * 1.18).toFixed(2)} ₺</span>
                </div>
              </div>
              
              <Button 
                className="minecraft-btn w-full" 
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                <span className="btn-content flex items-center gap-2">
                  <CreditCard size={18} />
                  {isProcessing ? 'İşleniyor...' : 'Ödeme Yap'}
                </span>
              </Button>
              
              {!isAuthenticated && (
                <p className="text-sm text-red-400 mt-4">
                  Ödeme yapabilmek için giriş yapmalısınız.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
