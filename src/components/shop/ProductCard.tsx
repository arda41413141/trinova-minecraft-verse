
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, Crown, Percent, Tag, Sparkles, Diamond, Star } from "lucide-react";
import { Product } from "@/context/cart/types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const isVIP = product.category === "rank";
  const cardClasses = `glass-card overflow-hidden border-minecraft-primary/20 flex flex-col ${
    product.isSpecialOffer ? 'special-offer-card' : ''
  } ${isVIP ? 'vip-card' : ''}`;

  return (
    <Card className={cardClasses}>
      <div className="relative">
        {product.isSpecialOffer && (
          <div className="absolute top-0 right-0 p-2 z-10">
            <Badge variant="glow" className="flex items-center gap-1">
              <Percent size={12} /> %{product.discountPercentage} İndirim
            </Badge>
          </div>
        )}
        <div className={`aspect-square ${
          isVIP 
            ? 'bg-gradient-to-b from-purple-500/30 to-purple-900/40 vip-background' 
            : product.isSpecialOffer 
              ? 'bg-gradient-to-b from-purple-500/20 to-pink-500/20' 
              : 'bg-gradient-to-b from-minecraft-primary/5 to-minecraft-primary/20'
        } flex items-center justify-center p-8`}>
          {isVIP && (
            <div className="absolute inset-0 vip-sparkle-effect"></div>
          )}
          <img 
            src={product.image || "/placeholder.svg"} 
            alt={product.name} 
            className={`max-h-full max-w-full object-contain transition-transform duration-300 ${
              isVIP ? 'hover:scale-110 animate-float' : 
              product.isSpecialOffer ? 'hover:scale-105 animate-pulse-gentle' : 
              'hover:scale-105'
            }`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/placeholder.svg";
            }}
          />
          {isVIP && (
            <div className="absolute bottom-2 right-2">
              {product.name.includes("Premium") ? (
                <Diamond size={24} className="text-yellow-400 animate-pulse-gentle" />
              ) : product.name.includes("Elite") ? (
                <Crown size={24} className="text-yellow-400 animate-pulse-gentle" />
              ) : (
                <Star size={24} className="text-yellow-400 animate-pulse-gentle" />
              )}
            </div>
          )}
        </div>
      </div>
      
      <CardHeader className={
        isVIP 
          ? 'bg-gradient-to-r from-purple-900/40 to-pink-900/30 glow-effect' 
          : product.isSpecialOffer 
            ? 'bg-gradient-to-r from-purple-900/20 to-pink-900/20' 
            : ''
      }>
        <div className="flex items-center justify-between">
          <CardTitle className="font-minecraft text-minecraft-primary">
            {product.name}
          </CardTitle>
          {isVIP && (
            <Sparkles size={16} className="text-yellow-400 animate-pulse-gentle" />
          )}
          {product.isSpecialOffer && !isVIP && (
            <Tag size={16} className="text-yellow-400" />
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-muted-foreground mb-4">{product.description}</p>
        <div className="flex items-center gap-2">
          {product.priceType === "coin" ? (
            <>
              <Coins size={16} className="text-yellow-400" />
              <div className="flex items-center gap-2">
                <p className="font-bold text-lg text-white">{product.price} Coin</p>
                {product.originalPrice && (
                  <p className="text-sm line-through text-gray-400">{product.originalPrice} Coin</p>
                )}
              </div>
            </>
          ) : product.category === "rank" ? (
            <>
              <Crown size={16} className="text-yellow-400" />
              <div className="flex items-center gap-2">
                <p className="font-bold text-lg text-white">{product.price.toFixed(2)} ₺</p>
                {product.originalPrice && (
                  <p className="text-sm line-through text-gray-400">{product.originalPrice.toFixed(2)} ₺</p>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <p className="font-bold text-lg text-white">{product.price.toFixed(2)} ₺</p>
              {product.originalPrice && (
                <p className="text-sm line-through text-gray-400">{product.originalPrice.toFixed(2)} ₺</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className={`w-full ${
            isVIP 
              ? 'bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:from-purple-700 hover:to-pink-700 sparkle-button'
              : product.isSpecialOffer 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                : 'minecraft-btn'
          }`} 
          onClick={() => onAddToCart(product)}
        >
          <span className="btn-content">Sepete Ekle</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
