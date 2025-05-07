import { Product } from "../context/cart/types";

export const products: Product[] = [
  {
    id: "1",
    name: "VIP Paketi",
    price: 29.99,
    originalPrice: 39.99, 
    image: "/images/products/vip-rank.png",
    description: "30 gün boyunca VIP ayrıcalıklardan yararlanın ve özel oyun içi itemler kazanın.",
    category: "rank",
    priceType: "balance",
    isSpecialOffer: true,
    discountPercentage: 25
  },
  {
    id: "vip_premium",
    name: "Premium VIP Paketi",
    price: 59.99,
    originalPrice: 79.99,
    image: "/images/products/premium-vip.png",
    description: "45 gün süresince Premium VIP özellikleri, özel kostümler ve her hafta ekstra kaynak kazanın.",
    category: "rank",
    priceType: "balance",
    isSpecialOffer: true,
    discountPercentage: 25
  },
  {
    id: "vip_elite",
    name: "Elite VIP Paketi",
    price: 99.99,
    image: "/images/products/elite-vip.png",
    description: "60 gün Elite VIP ayrıcalıkları, özel komutlar, sınırsız kaynak ve haftalık özel ödüller.",
    category: "rank",
    priceType: "balance"
  },
  {
    id: "2",
    name: "MVP Paketi",
    price: 49.99,
    image: "/images/products/mvp-rank.png",
    description: "30 gün boyunca MVP ayrıcalıklardan yararlanın ve özel oyun içi itemler kazanın.",
    category: "rank",
    priceType: "balance"
  },
  {
    id: "3",
    name: "Elmas Kılıç",
    price: 500,
    image: "/images/products/diamond-sword.png",
    description: "Özel büyülere sahip elmas kılıç.",
    category: "item",
    priceType: "balance"
  },
  {
    id: "4",
    name: "Özel Zırh Seti",
    price: 750,
    originalPrice: 833, // Original price before 10% discount
    image: "/images/products/diamond-armor.png",
    description: "Özel tasarım zırh seti.",
    category: "item",
    priceType: "balance",
    isSpecialOffer: true,
    discountPercentage: 10
  }
];

// Coin packages for purchase
export const coinPackages = [
  {
    id: "coin1",
    name: "100 Coin",
    price: 4.99,
    originalPrice: 5.54, // Original price before 10% discount
    coinAmount: 100,
    image: "/images/products/coins-100.png",
    description: "100 Coin satın alın.",
    isSpecialOffer: true,
    discountPercentage: 10
  },
  {
    id: "coin2",
    name: "500 Coin",
    price: 19.99,
    coinAmount: 500,
    image: "/images/products/coins-500.png",
    description: "500 Coin satın alın - %5 bonus!"
  },
  {
    id: "coin3",
    name: "1000 Coin",
    price: 34.99,
    coinAmount: 1000,
    image: "/images/products/coins-1000.png",
    description: "1000 Coin satın alın - %10 bonus!"
  },
  {
    id: "coin4",
    name: "5000 Coin",
    price: 149.99,
    coinAmount: 5000,
    image: "/images/products/coins-5000.png",
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
