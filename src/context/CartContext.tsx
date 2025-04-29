
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  priceType?: "coin" | "money"; // New field to determine if product is purchased with coins or money
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  coinBalance: number;
  addCoins: (amount: number) => void;
  useCoins: (amount: number) => boolean;
}

const STORAGE_KEY = "trinova_cart";
const COIN_STORAGE_KEY = "trinova_coins";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coinBalance, setCoinBalance] = useState<number>(0);

  // Load cart and coins from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem(STORAGE_KEY);
    const storedCoins = localStorage.getItem(COIN_STORAGE_KEY);
    
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    
    if (storedCoins) {
      try {
        setCoinBalance(JSON.parse(storedCoins));
      } catch (error) {
        localStorage.removeItem(COIN_STORAGE_KEY);
      }
    }
  }, []);

  // Update localStorage when cart or coins change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);
  
  useEffect(() => {
    localStorage.setItem(COIN_STORAGE_KEY, JSON.stringify(coinBalance));
  }, [coinBalance]);

  const addItem = (product: Product, quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        // Update existing item
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        return [...prevItems, { product, quantity }];
      }
    });
    toast.success(`${product.name} sepete eklendi`);
  };

  const removeItem = (productId: string) => {
    setItems(prevItems => {
      const newItems = prevItems.filter(item => item.product.id !== productId);
      return newItems;
    });
    toast.info("Ürün sepetten kaldırıldı");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.info("Sepet temizlendi");
  };

  const addCoins = (amount: number) => {
    setCoinBalance(prev => prev + amount);
    toast.success(`${amount} Coin hesabınıza eklendi`);
  };

  const useCoins = (amount: number): boolean => {
    if (coinBalance >= amount) {
      setCoinBalance(prev => prev - amount);
      toast.info(`${amount} Coin kullanıldı`);
      return true;
    } else {
      toast.error("Yetersiz coin bakiyesi");
      return false;
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        coinBalance,
        addCoins,
        useCoins,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
