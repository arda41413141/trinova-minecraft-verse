
import { Product } from "../context/CartContext";

export const products: Product[] = [
  {
    id: "1",
    name: "VIP Paketi",
    price: 29.99,
    image: "/images/products/vip.png",
    description: "30 gün boyunca VIP ayrıcalıklardan yararlanın ve özel oyun içi itemler kazanın.",
    category: "rank",
    priceType: "money"
  },
  {
    id: "2",
    name: "MVP Paketi",
    price: 49.99,
    image: "/images/products/mvp.png",
    description: "30 gün boyunca MVP ayrıcalıklardan yararlanın ve özel oyun içi itemler kazanın.",
    category: "rank",
    priceType: "money"
  },
  {
    id: "3",
    name: "Elmas Kılıç",
    price: 500,
    image: "/images/products/diamond_sword.png",
    description: "Özel büyülere sahip elmas kılıç.",
    category: "item",
    priceType: "coin"
  },
  {
    id: "4",
    name: "100 Kredi",
    price: 4.99,
    image: "/images/products/credits.png",
    description: "100 sunucu kredisi satın alın.",
    category: "credit",
    priceType: "money"
  },
  {
    id: "5",
    name: "Özel Zırh Seti",
    price: 750,
    image: "/images/products/armor.png",
    description: "Özel tasarım zırh seti.",
    category: "item",
    priceType: "coin"
  },
  {
    id: "6",
    name: "500 Kredi",
    price: 19.99,
    image: "/images/products/credits.png",
    description: "500 sunucu kredisi satın alın. %20 bonus!",
    category: "credit",
    priceType: "money"
  }
];

// Coin packages for purchase
export const coinPackages = [
  {
    id: "coin1",
    name: "100 Coin",
    price: 4.99,
    coinAmount: 100,
    image: "/images/products/coin_small.png",
    description: "100 Coin satın alın."
  },
  {
    id: "coin2",
    name: "500 Coin",
    price: 19.99,
    coinAmount: 500,
    image: "/images/products/coin_medium.png",
    description: "500 Coin satın alın - %5 bonus!"
  },
  {
    id: "coin3",
    name: "1000 Coin",
    price: 34.99,
    coinAmount: 1000,
    image: "/images/products/coin_large.png",
    description: "1000 Coin satın alın - %10 bonus!"
  },
  {
    id: "coin4",
    name: "5000 Coin",
    price: 149.99,
    coinAmount: 5000,
    image: "/images/products/coin_premium.png",
    description: "5000 Coin satın alın - %25 bonus!"
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getCoinPackageById = (id: string) => {
  return coinPackages.find(pkg => pkg.id === id);
};
