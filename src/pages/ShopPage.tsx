
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/cart";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { ShoppingBag, Wallet, Lock } from "lucide-react";
import ProductsTab from "@/components/shop/ProductsTab";
import BalanceTab from "@/components/shop/BalanceTab";
import { useSearchParams } from "react-router-dom";

const ShopPage = () => {
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>("products");
  
  // Set initial tab based on URL parameter
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "balance") {
      setActiveTab("balance");
    }
  }, [searchParams]);
  
  const handleAddToCart = (product: any) => {
    if (!isAuthenticated) {
      toast.error("Ürün satın almak için giriş yapmalısınız!");
      return;
    }
    addItem(product, 1);
    toast.success(`${product.name} sepete eklendi!`);
  };

  return (
    <div className="container mx-auto px-4 py-20 pt-32">
      <h1 className="section-title font-farex bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        Farex Network Mağaza
      </h1>
      
      {!isAuthenticated && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6 animate-pulse-gentle">
          <div className="flex items-center gap-2 text-red-400">
            <Lock size={16} />
            <span className="font-semibold">Mağaza erişimi için giriş yapmanız gerekmektedir.</span>
          </div>
          <p className="text-red-300 text-sm mt-1">
            Ürünleri görüntüleyebilirsiniz ancak satın alma işlemleri için hesap oluşturmanız gerekir.
          </p>
        </div>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="w-full max-w-md mx-auto bg-minecraft-dark">
          <TabsTrigger value="products" className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white w-1/2">
            <ShoppingBag size={16} className="mr-2" /> Ürünler
          </TabsTrigger>
          <TabsTrigger 
            value="balance" 
            className="data-[state=active]:bg-minecraft-primary data-[state=active]:text-white w-1/2"
            disabled={!isAuthenticated}
          >
            <Wallet size={16} className="mr-2" /> Bakiye Yükle
            {!isAuthenticated && <Lock size={12} className="ml-1" />}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="mt-6">
          <ProductsTab onAddToCart={handleAddToCart} />
        </TabsContent>
        
        <TabsContent value="balance" className="mt-6">
          {isAuthenticated ? (
            <BalanceTab />
          ) : (
            <div className="text-center py-12">
              <Lock size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Giriş Gerekli</h3>
              <p className="text-muted-foreground">
                Bakiye yüklemek için önce hesabınıza giriş yapmalısınız.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShopPage;
