
import { Product } from "../context/CartContext";

export const products: Product[] = [
  {
    id: "1",
    name: "VIP Paketi",
    price: 29.99,
    image: "/images/products/vip.png",
    description: "30 gün boyunca VIP ayrıcalıklardan yararlanın ve özel oyun içi itemler kazanın.",
    category: "rank"
  },
  {
    id: "2",
    name: "MVP Paketi",
    price: 49.99,
    image: "/images/products/mvp.png",
    description: "30 gün boyunca MVP ayrıcalıklardan yararlanın ve özel oyun içi itemler kazanın.",
    category: "rank"
  },
  {
    id: "3",
    name: "Elmas Kılıç",
    price: 9.99,
    image: "/images/products/diamond_sword.png",
    description: "Özel büyülere sahip elmas kılıç.",
    category: "item"
  },
  {
    id: "4",
    name: "100 Kredi",
    price: 4.99,
    image: "/images/products/credits.png",
    description: "100 sunucu kredisi satın alın.",
    category: "credit"
  },
  {
    id: "5",
    name: "Özel Zırh Seti",
    price: 19.99,
    image: "/images/products/armor.png",
    description: "Özel tasarım zırh seti.",
    category: "item"
  },
  {
    id: "6",
    name: "500 Kredi",
    price: 19.99,
    image: "/images/products/credits.png",
    description: "500 sunucu kredisi satın alın. %20 bonus!",
    category: "credit"
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};
