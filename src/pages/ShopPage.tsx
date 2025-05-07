
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/cart";
import { toast } from "sonner";
import { ShoppingBag, Coins } from "lucide-react";
import ProductsTab from "@/components/shop/ProductsTab";
import CoinsTab from "@/components/shop/CoinsTab";
import { useSearchParams } from "react-router-dom";

const ShopPage = () => {
  const { addItem, coinBalance } = useCart();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>("products");
  
  // Set initial tab based on URL parameter
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "coins") {
      setActiveTab("coins");
    }
  }, [searchParams]);
  
  const handleAddToCart = (product: any) => {
    addItem(product, 1);
    toast.success(`${product.name} sepete eklendi!`);
  };

  return (
    <div className="container mx-auto px-4 py-20 pt-32">
      <h1 className="section-title">Mağaza</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="w-full max-w-md mx-auto bg-minecraft-dark">
          <TabsTrigger value="products" className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white w-1/2">
            <ShoppingBag size={16} className="mr-2" /> Ürünler
          </TabsTrigger>
          <TabsTrigger value="coins" className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white w-1/2">
            <Coins size={16} className="mr-2" /> Coin Satın Al
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="mt-6">
          <ProductsTab onAddToCart={handleAddToCart} />
        </TabsContent>
        
        <TabsContent value="coins" className="mt-6">
          <CoinsTab coinBalance={coinBalance} onAddToCart={handleAddToCart} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShopPage;
