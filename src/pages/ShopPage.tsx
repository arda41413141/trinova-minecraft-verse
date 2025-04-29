
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

const categories = [
  { id: "all", name: "Tümü" },
  { id: "rank", name: "Rütbeler" },
  { id: "item", name: "Eşyalar" },
  { id: "credit", name: "Kredi" }
];

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { addItem } = useCart();
  const isMobile = useIsMobile();
  
  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleAddToCart = (product: any, quantity: number) => {
    addItem(product, quantity);
    toast.success(`${product.name} sepetinize eklendi!`);
  };

  return (
    <div className="container mx-auto px-4 py-20 pt-32">
      <h1 className="section-title">Mağaza</h1>
      
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
          <Card key={product.id} className="glass-card overflow-hidden border-minecraft-primary/20 flex flex-col">
            <div className="aspect-square bg-gradient-to-b from-minecraft-primary/5 to-minecraft-primary/20 flex items-center justify-center p-8">
              <img 
                src={product.image || "/placeholder.svg"} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain transition-transform hover:scale-110 duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/placeholder.svg";
                }}
              />
            </div>
            
            <CardHeader>
              <CardTitle className="font-minecraft text-minecraft-primary">{product.name}</CardTitle>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <p className="text-muted-foreground mb-4">{product.description}</p>
              <p className="font-bold text-lg text-white">{product.price.toFixed(2)} ₺</p>
            </CardContent>
            
            <CardFooter>
              <Button className="minecraft-btn w-full" onClick={() => handleAddToCart(product, 1)}>
                <span className="btn-content">Sepete Ekle</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
