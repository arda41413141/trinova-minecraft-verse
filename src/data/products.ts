
import { Product } from "../context/cart/types";

// Function to format price as whole number with 150% increase
const formatPrice = (price: number): number => {
  // 150% increase means multiply by 2.5 (original + 150% of original)
  const increasedPrice = price * 2.5;
  // Round to whole number
  return Math.round(increasedPrice);
};

export const products: Product[] = [
  {
    id: "1",
    name: "VIP Paketi",
    price: formatPrice(29.99 * 1.8), // 150% increase then round
    originalPrice: formatPrice(39.99 * 1.8), 
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=600&fit=crop&q=80",
    description: "30 gün boyunca VIP ayrıcalıklardan yararlanın ve özel oyun içi itemler kazanın.",
    category: "rank",
    priceType: "balance",
    isSpecialOffer: true,
    discountPercentage: 25
  },
  {
    id: "vip_premium",
    name: "Premium VIP Paketi",
    price: formatPrice(59.99 * 1.8),
    originalPrice: formatPrice(79.99 * 1.8),
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&h=600&fit=crop&q=80",
    description: "45 gün süresince Premium VIP özellikleri, özel kostümler ve her hafta ekstra kaynak kazanın.",
    category: "rank",
    priceType: "balance",
    isSpecialOffer: true,
    discountPercentage: 25
  },
  {
    id: "vip_elite",
    name: "Elite VIP Paketi",
    price: formatPrice(99.99 * 1.8),
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=600&fit=crop&q=80",
    description: "60 gün Elite VIP ayrıcalıkları, özel komutlar, sınırsız kaynak ve haftalık özel ödüller.",
    category: "rank",
    priceType: "balance"
  },
  {
    id: "2",
    name: "MVP Paketi",
    price: formatPrice(49.99 * 1.8),
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&h=600&fit=crop&q=80",
    description: "30 gün boyunca MVP ayrıcalıklardan yararlanın ve özel oyun içi itemler kazanın.",
    category: "rank",
    priceType: "balance"
  }
];

// Balance packages for purchase with 150% increase
export const balancePackages = [
  {
    id: "balance-1",
    name: "Başlangıç Paketi",
    amount: 100,
    price: formatPrice(10),
    isFeatured: true,
    bonusAmount: 10
  },
  {
    id: "balance-2",
    name: "Standart Paket",
    amount: 300,
    price: formatPrice(25),
    discountPercentage: 10,
    bonusAmount: 50
  },
  {
    id: "balance-3",
    name: "Premium Paket",
    amount: 1000,
    price: formatPrice(75),
    discountPercentage: 15,
    bonusAmount: 250
  },
  {
    id: "balance-4",
    name: "Elit Paket",
    amount: 5000,
    price: formatPrice(300),
    discountPercentage: 25,
    bonusAmount: 2500
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getBalancePackageById = (id: string) => {
  return balancePackages.find(pkg => pkg.id === id);
};
