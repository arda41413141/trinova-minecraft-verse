
import React from "react";
import { coinPackages } from "@/data/products";
import CoinPackageCard from "./CoinPackageCard";
import { CoinPackage } from "@/types/shop";

interface CoinsTabProps {
  coinBalance: number;
  onAddToCart: (pkg: CoinPackage) => void;
}

const CoinsTab = ({ coinBalance, onAddToCart }: CoinsTabProps) => {
  return (
    <>
      <div className="text-center mb-6">
        <h2 className="font-minecraft text-2xl text-minecraft-primary mb-3">Coin Satın Al</h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-2">
          Coin satın alarak mağazamızdaki özel eşyaları ve özellikleri açabilirsin.
        </p>
        <p className="text-yellow-400 font-medium">Mevcut Bakiye: {coinBalance} Coin</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {coinPackages.map((pkg) => (
          <CoinPackageCard key={pkg.id} package={pkg} onAddToCart={onAddToCart} />
        ))}
      </div>
    </>
  );
};

export default CoinsTab;
