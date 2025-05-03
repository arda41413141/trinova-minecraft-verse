
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/context/cart";
import { products, coinPackages } from "@/data/products";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Coins, ShoppingBag, Crown, Percent, Tag } from "lucide-react";

const categories = [
  { id: "all", name: "Tümü" },
  { id: "rank", name: "Rütbeler" },
  { id: "item", name: "Eşyalar" }
];

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { addItem, coinBalance } = useCart();
  const isMobile = useIsMobile();
  
  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleAddToCart = (product: any) => {
    addItem(product, 1);
    toast.success(`${product.name} sepete eklendi!`);
  };

  return (
    <div className="container mx-auto px-4 py-20 pt-32">
      <h1 className="section-title">Mağaza</h1>
      
      <Tabs defaultValue="products" className="mb-8">
        <TabsList className="w-full max-w-md mx-auto bg-minecraft-dark">
          <TabsTrigger value="products" className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white w-1/2">
            <ShoppingBag size={16} className="mr-2" /> Ürünler
          </TabsTrigger>
          <TabsTrigger value="coins" className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white w-1/2">
            <Coins size={16} className="mr-2" /> Coin Satın Al
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="mt-6">
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className={`${activeCategory === category.id ? "bg-minecraft-primary" : ""} ${isMobile ? "text-sm px-2 py-1" : ""}`}
                  size={isMobile ? "sm" : "default"}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart} 
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="coins" className="mt-6">
          <div className="text-center mb-6">
            <h2 className="font-minecraft text-2xl text-minecraft-primary mb-3">Coin Satın Al</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-2">
              Coin satın alarak mağazamızdaki özel eşyaları ve özellikleri açabilirsin.
            </p>
            <p className="text-yellow-400 font-medium">Mevcut Bakiye: {coinBalance} Coin</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {coinPackages.map((pkg) => (
              <CoinPackageCard key={pkg.id} package={pkg} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ProductCardProps {
  product: any;
  onAddToCart: (product: any) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className={`glass-card overflow-hidden border-minecraft-primary/20 flex flex-col ${product.isSpecialOffer ? 'special-offer-card' : ''}`}>
      <div className="relative">
        {product.isSpecialOffer && (
          <div className="absolute top-0 right-0 p-2 z-10">
            <Badge variant="glow" className="flex items-center gap-1">
              <Percent size={12} /> %{product.discountPercentage} İndirim
            </Badge>
          </div>
        )}
        <div className={`aspect-square ${product.isSpecialOffer ? 'bg-gradient-to-b from-purple-500/20 to-pink-500/20' : 'bg-gradient-to-b from-minecraft-primary/5 to-minecraft-primary/20'} flex items-center justify-center p-8`}>
          <img 
            src={product.image || "/placeholder.svg"} 
            alt={product.name} 
            className={`max-h-full max-w-full object-contain transition-transform hover:scale-110 duration-300 ${product.isSpecialOffer ? 'animate-pulse-gentle' : ''}`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/placeholder.svg";
            }}
          />
        </div>
      </div>
      
      <CardHeader className={product.isSpecialOffer ? 'bg-gradient-to-r from-purple-900/20 to-pink-900/20' : ''}>
        <div className="flex items-center justify-between">
          <CardTitle className="font-minecraft text-minecraft-primary">
            {product.name}
          </CardTitle>
          {product.isSpecialOffer && (
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
          className={`w-full ${product.isSpecialOffer ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' : 'minecraft-btn'}`} 
          onClick={() => onAddToCart(product)}
        >
          <span className="btn-content">Sepete Ekle</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

interface CoinPackageCardProps {
  package: any;
  onAddToCart: (product: any) => void;
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

export default ShopPage;
