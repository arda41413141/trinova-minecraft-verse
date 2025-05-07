
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { Product } from "@/context/cart/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProductCard } from "./ProductCard";
import { Crown, ShoppingBag } from "lucide-react";

const categories = [
  { id: "all", name: "Tümü", icon: <ShoppingBag size={16} /> },
  { id: "rank", name: "VIP Paketleri", icon: <Crown size={16} className="text-yellow-400" /> }
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
  
  // All products should now be VIP-related since we removed item products
  return (
    <>
      <div className="flex justify-center mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={`${activeCategory === category.id ? "bg-gradient-to-r from-purple-600 to-purple-800" : ""} ${isMobile ? "text-sm px-2 py-1" : ""} flex items-center gap-2`}
              size={isMobile ? "sm" : "default"}
            >
              {category.icon}
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* VIP Packages Section */}
      <div className="text-center mb-8">
        <h2 className="font-minecraft text-2xl bg-gradient-to-r from-purple-400 via-purple-600 to-indigo-600 text-transparent bg-clip-text mb-3 animate-pulse-gentle">
          <Crown className="inline-block mr-2" size={24} />
          PREMİUM VIP PAKETLERİ
          <Crown className="inline-block ml-2" size={24} />
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto">
          Özel VIP paketleri ile ekstra avantajlara sahip olun ve sunucuda ayrıcalıklı deneyimler yaşayın.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>
    </>
  );
};

export default ProductsTab;
