
import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { BalancePackageCard } from "./BalancePackageCard";
import { BalancePackage } from "@/types/shop";

const balancePackages: BalancePackage[] = [
  {
    id: "balance-1",
    name: "Başlangıç Paketi",
    amount: 100,
    price: 10,
    isFeatured: true,
    bonusAmount: 10
  },
  {
    id: "balance-2",
    name: "Standart Paket",
    amount: 300,
    price: 25,
    discountPercentage: 10,
    bonusAmount: 50
  },
  {
    id: "balance-3",
    name: "Premium Paket",
    amount: 1000,
    price: 75,
    discountPercentage: 15,
    bonusAmount: 250
  },
  {
    id: "balance-4",
    name: "Elit Paket",
    amount: 5000,
    price: 300,
    discountPercentage: 25,
    bonusAmount: 2500
  },
];

const BalanceTab: React.FC = () => {
  return (
    <TabsContent value="balance" className="space-y-6">
      <h3 className="text-xl font-semibold">Bakiye Paketleri</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {balancePackages.map((pkg) => (
          <BalancePackageCard key={pkg.id} balancePackage={pkg} />
        ))}
      </div>
    </TabsContent>
  );
};

export default BalanceTab;
