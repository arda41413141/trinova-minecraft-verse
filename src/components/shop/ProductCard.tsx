
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/context/cart/types";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Info, Coins } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Calculate the actual price after discount
  const actualPrice = product.isSpecialOffer && product.discountPercentage
    ? product.price - (product.price * product.discountPercentage / 100)
    : product.price;

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      if (onAddToCart) {
        onAddToCart(product);
      } else {
        addItem(product, quantity);
        toast.success(`${product.name} sepete eklendi`);
      }
      setIsAdding(false);
      setQuantity(1);
    }, 500);
  };

  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-300 hover:shadow-lg border-minecraft-primary/10",
      product.isSpecialOffer ? "bg-gradient-to-br from-minecraft-darker to-minecraft-dark" : ""
    )}>
      <div className="relative overflow-hidden pt-4 px-4">
        {product.isSpecialOffer && (
          <div className="absolute top-0 right-0">
            <Badge variant="destructive" className="rounded-bl-md rounded-tr-md">
              %{product.discountPercentage} İndirim
            </Badge>
          </div>
        )}
        
        <div className="aspect-square bg-white/5 rounded-lg overflow-hidden flex items-center justify-center p-4 group-hover:scale-105 transition-transform">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500">Resim yok</span>
            </div>
          )}
        </div>
      </div>

      <CardContent className="p-4 pt-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg line-clamp-1">{product.name}</h3>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                  <Info size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p className="max-w-60 text-sm">{product.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 h-10">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            {product.priceType === "balance" ? (
              <div className="flex items-center">
                <Coins size={16} className="text-yellow-400 mr-1" />
                <span className="font-semibold">{actualPrice}</span>
              </div>
            ) : (
              <div>
                {product.isSpecialOffer && (
                  <span className="text-sm line-through text-muted-foreground mr-2">
                    {product.price.toFixed(2)} ₺
                  </span>
                )}
                <span className="font-semibold">{actualPrice.toFixed(2)} ₺</span>
              </div>
            )}
          </div>

          <Button 
            size="sm" 
            className="h-8"
            disabled={isAdding}
            onClick={handleAddToCart}
          >
            {isAdding ? (
              <span className="flex items-center">
                <div className="h-4 w-4 mr-1 border-2 border-t-transparent rounded-full animate-spin" />
                Ekleniyor
              </span>
            ) : (
              <span className="flex items-center">
                <ShoppingCart size={14} className="mr-1" />
                Sepete Ekle
              </span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
