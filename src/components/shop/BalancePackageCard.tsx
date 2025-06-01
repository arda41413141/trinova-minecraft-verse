
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BalancePackage } from "@/types/shop";
import { useCart } from "@/context/CartContext";
import { Coins, Plus, Sparkles } from "lucide-react";
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
  
  // Format price as whole numbers
  const formattedPrice = `${Math.round(actualPrice)}TL`;
  const formattedOriginalPrice = balancePackage.discountPercentage 
    ? `${Math.round(balancePackage.price)}TL` 
    : null;

  return (
    <Card className={cn(
      "border-0 overflow-hidden transition-all duration-300 hover:scale-105 group",
      balancePackage.isFeatured 
        ? "bg-gradient-to-br from-purple-800/20 to-black ring-1 ring-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 animate-pulse-gentle" 
        : "bg-zinc-900/50 hover:bg-zinc-900/70 hover:shadow-md"
    )}>
      <CardContent className="p-0 relative">
        {/* Animated background particles */}
        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
          <div className="absolute top-2 right-2 animate-bounce-slow">
            <Sparkles size={16} className="text-yellow-400" />
          </div>
          <div className="absolute bottom-2 left-2 animate-float">
            <Sparkles size={12} className="text-blue-400" />
          </div>
        </div>
        
        <div className="px-5 pt-5 pb-4 relative z-10">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg font-farex">{balancePackage.name}</h3>
            {balancePackage.isFeatured && (
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 animate-wiggle">Popüler</Badge>
            )}
          </div>
          
          <div className="flex items-center mb-2 animate-pulse-gentle">
            <Coins className="h-5 w-5 text-yellow-400 mr-2 animate-bounce-slow" />
            <span className="text-2xl font-bold font-farex">{balancePackage.amount}</span>
            {balancePackage.bonusAmount && (
              <div className="ml-2 flex items-center text-green-400 animate-float">
                <Plus className="h-3 w-3" />
                <span className="text-sm font-medium">{balancePackage.bonusAmount}</span>
              </div>
            )}
          </div>
          
          {balancePackage.bonusAmount && (
            <p className="text-xs text-green-400 mb-3 animate-pulse-gentle">
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
              <span className="text-xl font-bold font-farex">{formattedPrice}</span>
              {balancePackage.discountPercentage && (
                <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-400 border-green-500/20 animate-bounce-slow">
                  %{balancePackage.discountPercentage} indirim
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-auto">
          <Button 
            className={cn(
              "w-full rounded-t-none h-12 hover:animate-wiggle transition-all duration-300",
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
              <span className="flex items-center">
                <Coins size={16} className="mr-2 animate-bounce-slow" />
                Satın Al
              </span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
