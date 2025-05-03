
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, Percent, Tag } from "lucide-react";
import { CoinPackage } from "@/types/shop";

interface CoinPackageCardProps {
  package: CoinPackage;
  onAddToCart: (pkg: CoinPackage) => void;
}

const CoinPackageCard = ({ package: pkg, onAddToCart }: CoinPackageCardProps) => {
  return (
    <Card className={`glass-card overflow-hidden ${pkg.isSpecialOffer ? 'border-yellow-500/50 special-offer-card' : 'border-yellow-500/30'} flex flex-col hover:border-yellow-400 transition-all`}>
      <div className="relative">
        {pkg.isSpecialOffer && (
          <div className="absolute top-0 right-0 p-2 z-10">
            <Badge variant="rainbow" className="flex items-center gap-1">
              <Percent size={12} /> %{pkg.discountPercentage} İndirim
            </Badge>
          </div>
        )}
        <div className={`aspect-square ${pkg.isSpecialOffer ? 'bg-gradient-to-b from-yellow-600/20 to-amber-500/20' : 'bg-gradient-to-b from-yellow-600/10 to-yellow-500/20'} flex items-center justify-center p-8`}>
          <img 
            src={pkg.image || "/placeholder.svg"} 
            alt={pkg.name} 
            className={`max-h-full max-w-full object-contain transition-transform hover:scale-110 duration-300 ${pkg.isSpecialOffer ? 'animate-float' : ''}`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/placeholder.svg";
            }}
          />
        </div>
      </div>
      
      <CardHeader className={`${pkg.isSpecialOffer ? 'bg-gradient-to-r from-yellow-900/20 to-amber-900/20' : 'bg-yellow-900/20'}`}>
        <div className="flex items-center justify-between">
          <CardTitle className="font-minecraft text-yellow-400 text-center">
            {pkg.name}
          </CardTitle>
          {pkg.isSpecialOffer && (
            <Tag size={16} className="text-yellow-400" />
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow pt-4">
        <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>
        <div className="flex items-center justify-center gap-2">
          <p className="font-bold text-lg text-white">{pkg.price.toFixed(2)} ₺</p>
          {pkg.originalPrice && (
            <p className="text-sm line-through text-gray-400">{pkg.originalPrice.toFixed(2)} ₺</p>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className={`w-full ${pkg.isSpecialOffer ? 'bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-700 hover:to-amber-600 text-white' : 'bg-yellow-600 hover:bg-yellow-700 text-white'}`}
          onClick={() => onAddToCart(pkg)}
        >
          <Coins size={16} className="mr-2" />
          Satın Al
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CoinPackageCard;
