
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { Product } from "@/context/cart/types";
import { useIsMobile } from "@/hooks/use-mobile";
import ProductCard from "./ProductCard";

const categories = [
  { id: "all", name: "Tümü" },
  { id: "rank", name: "Rütbeler" },
  { id: "item", name: "Eşyalar" }
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

  return (
    <>
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
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>
    </>
  );
};

export default ProductsTab;
