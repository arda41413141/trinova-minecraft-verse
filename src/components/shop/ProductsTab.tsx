
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { Product } from "@/context/cart/types";
import { useIsMobile } from "@/hooks/use-mobile";
import ProductCard from "./ProductCard";
import { Crown, ShoppingBag, Diamond } from "lucide-react";

const categories = [
  { id: "all", name: "Tümü", icon: <ShoppingBag size={16} /> },
  { id: "rank", name: "VIP Paketleri", icon: <Crown size={16} className="text-yellow-400" /> },
  { id: "item", name: "Eşyalar", icon: <Diamond size={16} /> }
];

interface ProductsTabProps {
  onAddToCart: (product: Product) => void;
}

const ProductsTab = ({ onAddToCart }: ProductsTabProps) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const isMobile = useIsMobile();
  
  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);
  
  // Separate VIP products for special highlighting
  const vipProducts = filteredProducts.filter(p => p.category === "rank");
  const nonVipProducts = filteredProducts.filter(p => p.category !== "rank");

  return (
    <>
      <div className="flex justify-center mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={`${activeCategory === category.id ? "bg-minecraft-primary" : ""} ${isMobile ? "text-sm px-2 py-1" : ""} flex items-center gap-2`}
              size={isMobile ? "sm" : "default"}
            >
              {category.icon}
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* VIP Packages Section - only show if we have VIP packages in the current filter */}
      {vipProducts.length > 0 && activeCategory !== "item" && (
        <>
          <div className="text-center mb-8">
            <h2 className="font-minecraft text-2xl text-minecraft-primary mb-3 animate-pulse-gentle">
              <Crown className="inline-block mr-2" size={24} />
              VIP Paketleri
              <Crown className="inline-block ml-2" size={24} />
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Özel VIP paketleri ile ekstra avantajlara sahip olun ve sunucuda ayrıcalıklı deneyimler yaşayın.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {vipProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
              />
            ))}
          </div>
        </>
      )}
      
      {/* Regular Items Section */}
      {nonVipProducts.length > 0 && activeCategory !== "rank" && (
        <>
          {vipProducts.length > 0 && activeCategory === "all" && (
            <div className="text-center mb-8 mt-12">
              <h2 className="font-minecraft text-2xl text-minecraft-primary mb-3">
                <Diamond className="inline-block mr-2" size={24} />
                Özel Eşyalar
              </h2>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {nonVipProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ProductsTab;
