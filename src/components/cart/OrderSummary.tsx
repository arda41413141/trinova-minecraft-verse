
import { Button } from "@/components/ui/button";
import { CreditCard, Coins } from "lucide-react";

interface OrderSummaryProps {
  totalMoneyPrice: number;
  totalCoins: number;
  isProcessing: boolean;
  isAuthenticated: boolean;
  handleCheckout: () => void;
  moneyItemsExist: boolean;
  coinItemsExist: boolean;
}

const OrderSummary = ({
  totalMoneyPrice,
  totalCoins,
  isProcessing,
  isAuthenticated,
  handleCheckout,
  moneyItemsExist,
  coinItemsExist
}: OrderSummaryProps) => {
  return (
    <div className="glass-card p-6 sticky top-28">
      <h2 className="font-minecraft text-xl text-minecraft-primary mb-6">Sipariş Özeti</h2>
      
      <div className="space-y-3 mb-6">
        {moneyItemsExist && (
          <>
            <div className="flex justify-between text-muted-foreground">
              <span>TL Ara Toplam</span>
              <span>{totalMoneyPrice.toFixed(2)} ₺</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>KDV</span>
              <span>{(totalMoneyPrice * 0.18).toFixed(2)} ₺</span>
            </div>
          </>
        )}
        
        {coinItemsExist && (
          <div className="flex justify-between text-yellow-400">
            <span className="flex items-center">
              <Coins size={16} className="mr-1" />
              Toplam Coin
            </span>
            <span>{totalCoins}</span>
          </div>
        )}
        
        {moneyItemsExist && (
          <>
            <div className="h-px bg-white/10 my-4"></div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Toplam (₺)</span>
              <span>{(totalMoneyPrice * 1.18).toFixed(2)} ₺</span>
            </div>
          </>
        )}
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
  );
};

export default OrderSummary;
