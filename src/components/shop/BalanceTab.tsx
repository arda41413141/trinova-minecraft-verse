
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BalancePackageCard from "./BalancePackageCard";

interface BalancePackage {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  balanceAmount: number;
  image: string;
  description: string;
  isSpecialOffer?: boolean;
  discountPercentage?: number;
}

interface BalanceTabProps {
  balance: number;
  onAddToCart: (pkg: any) => void;
}

const BalanceTab = ({ balance, onAddToCart }: BalanceTabProps) => {
  const [balancePackages, setBalancePackages] = useState<BalancePackage[]>([]);

  useEffect(() => {
    // Simulate fetching balance packages from an API
    const packages = [
      {
        id: "balance-100",
        name: "100 TL Bakiye",
        price: 100,
        balanceAmount: 100,
        image: "/lovable-uploads/0585c4c9-e636-41c7-b94e-61b141055264.png",
        description: "100 TL bakiye yükleyin",
        category: "credit"
      },
      {
        id: "balance-250",
        name: "250 TL Bakiye",
        price: 250,
        balanceAmount: 250,
        image: "/lovable-uploads/0585c4c9-e636-41c7-b94e-61b141055264.png",
        description: "250 TL bakiye yükleyin",
        category: "credit"
      },
      {
        id: "balance-500",
        name: "500 TL Bakiye",
        price: 500,
        balanceAmount: 500,
        image: "/lovable-uploads/0585c4c9-e636-41c7-b94e-61b141055264.png",
        description: "500 TL bakiye yükleyin",
        category: "credit"
      },
      {
        id: "balance-1000",
        name: "1000 TL Bakiye",
        price: 950,
        balanceAmount: 1000,
        originalPrice: 1000,
        isSpecialOffer: true,
        discountPercentage: 5,
        image: "/lovable-uploads/0585c4c9-e636-41c7-b94e-61b141055264.png",
        description: "1000 TL bakiye yükleyin, %5 bonus kazanın",
        category: "credit"
      },
      {
        id: "balance-2000",
        name: "2000 TL Bakiye",
        price: 1800,
        balanceAmount: 2000,
        originalPrice: 2000,
        isSpecialOffer: true,
        discountPercentage: 10,
        image: "/lovable-uploads/0585c4c9-e636-41c7-b94e-61b141055264.png",
        description: "2000 TL bakiye yükleyin, %10 bonus kazanın",
        category: "credit"
      }
    ];
    
    setBalancePackages(packages);
  }, []);

  return (
    <div>
      <div className="mb-8">
        <Card className="glass-card border-white/20">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-center text-lg">
              Mevcut Bakiyeniz: <span className="text-green-400">{balance} TL</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-center">
            <p className="text-muted-foreground">
              Bakiye yükleyerek tüm sunucu özelliklerine erişim sağlayabilirsiniz.
              Yüklediğiniz bakiye ile oyun içi özel eşyalar, yetkiler ve daha fazlasını satın alabilirsiniz.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {balancePackages.map(pkg => (
          <BalancePackageCard 
            key={pkg.id} 
            package={pkg} 
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>
    </div>
  );
};

export default BalanceTab;
