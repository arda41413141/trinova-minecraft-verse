
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BalancePackage } from "@/types/shop";
import { useCart } from "@/context/CartContext";
import { Coins, Plus } from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

interface BalancePackageCardProps {
  balancePackage: BalancePackage;
}

export const BalancePackageCard: React.FC<BalancePackageCardProps> = ({ balancePackage }) => {
  const { addBalance } = useCart();
  const [loading, setLoading] = useState(false);

  const handlePurchase = () => {
    setLoading(true);
    
    // Simulate a payment process
    setTimeout(() => {
      const totalAmount = balancePackage.amount + (balancePackage.bonusAmount || 0);
      
      addBalance(totalAmount, `${balancePackage.name} satın alındı`);
      
      // Show confetti for a fun effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#F8F8FF', '#9b87f5', '#7E69AB']
      });
      
      toast.success(`${totalAmount} TL bakiyenize eklendi!`, {
        description: "Bakiyeniz başarıyla yüklendi"
      });
      
      setLoading(false);
    }, 1500);
  };

  const actualPrice = balancePackage.discountPercentage 
    ? balancePackage.price * (1 - balancePackage.discountPercentage / 100) 
    : balancePackage.price;
  
  // Format price to match requested pattern (150.99TL)
  const formattedPrice = `${actualPrice.toFixed(2)}TL`;
  const formattedOriginalPrice = balancePackage.discountPercentage 
    ? `${balancePackage.price.toFixed(2)}TL` 
    : null;

  return (
    <Card className={cn(
      "border-0 overflow-hidden transition-all duration-300",
      balancePackage.isFeatured 
        ? "bg-gradient-to-br from-purple-800/20 to-black ring-1 ring-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20" 
        : "bg-zinc-900/50 hover:bg-zinc-900/70 hover:shadow-md"
    )}>
      <CardContent className="p-0">
        <div className="px-5 pt-5 pb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg">{balancePackage.name}</h3>
            {balancePackage.isFeatured && (
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">Popüler</Badge>
            )}
          </div>
          
          <div className="flex items-center mb-2">
            <Coins className="h-5 w-5 text-yellow-400 mr-2" />
            <span className="text-2xl font-bold">{balancePackage.amount}</span>
            {balancePackage.bonusAmount && (
              <div className="ml-2 flex items-center text-green-400">
                <Plus className="h-3 w-3" />
                <span className="text-sm font-medium">{balancePackage.bonusAmount}</span>
              </div>
            )}
          </div>
          
          {balancePackage.bonusAmount && (
            <p className="text-xs text-green-400 mb-3">
              +{balancePackage.bonusAmount} bonus bakiye!
            </p>
          )}
          
          <div className="my-4">
            <div className="flex items-center">
              {balancePackage.discountPercentage && formattedOriginalPrice && (
                <span className="line-through text-muted-foreground text-sm mr-2">
                  {formattedOriginalPrice}
                </span>
              )}
              <span className="text-xl font-bold">{formattedPrice}</span>
              {balancePackage.discountPercentage && (
                <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-400 border-green-500/20">
                  %{balancePackage.discountPercentage} indirim
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-auto">
          <Button 
            className={cn(
              "w-full rounded-t-none h-12",
              balancePackage.isFeatured 
                ? "bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900" 
                : "bg-zinc-800 hover:bg-zinc-700"
            )}
            disabled={loading}
            onClick={handlePurchase}
          >
            {loading ? (
              <span className="flex items-center">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent rounded-full"></div>
                İşleniyor...
              </span>
            ) : (
              "Satın Al"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
