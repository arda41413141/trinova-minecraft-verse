
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  priceType?: "coin" | "money"; // Field to determine if product is purchased with coins or money
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PurchasedItem {
  id: string;
  name: string;
  purchaseDate: string;
  expiryDate?: string;
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
  purchasedItems: PurchasedItem[];
  vipStatus: string | null;
  processCheckout: () => Promise<boolean>;
}

const STORAGE_KEY = "trinova_cart";
const COIN_STORAGE_KEY = "trinova_coins";
const PURCHASED_ITEMS_KEY = "trinova_purchased_items";
const VIP_STATUS_KEY = "trinova_vip_status";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coinBalance, setCoinBalance] = useState<number>(0);
  const [purchasedItems, setPurchasedItems] = useState<PurchasedItem[]>([]);
  const [vipStatus, setVipStatus] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  // Load cart, coins, and purchased items from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem(STORAGE_KEY);
    const storedCoins = localStorage.getItem(COIN_STORAGE_KEY);
    const storedPurchasedItems = localStorage.getItem(PURCHASED_ITEMS_KEY);
    const storedVipStatus = localStorage.getItem(VIP_STATUS_KEY);
    
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
    
    if (storedPurchasedItems) {
      try {
        setPurchasedItems(JSON.parse(storedPurchasedItems));
      } catch (error) {
        localStorage.removeItem(PURCHASED_ITEMS_KEY);
      }
    }

    if (storedVipStatus) {
      try {
        setVipStatus(JSON.parse(storedVipStatus));
      } catch (error) {
        localStorage.removeItem(VIP_STATUS_KEY);
      }
    }
  }, []);

  // Update localStorage when cart, coins, or purchased items change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);
  
  useEffect(() => {
    localStorage.setItem(COIN_STORAGE_KEY, JSON.stringify(coinBalance));
  }, [coinBalance]);
  
  useEffect(() => {
    localStorage.setItem(PURCHASED_ITEMS_KEY, JSON.stringify(purchasedItems));
  }, [purchasedItems]);

  useEffect(() => {
    if (vipStatus) {
      localStorage.setItem(VIP_STATUS_KEY, JSON.stringify(vipStatus));
    }
  }, [vipStatus]);

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

  const processCheckout = async (): Promise<boolean> => {
    if (!isAuthenticated) {
      toast.error("Ödeme yapmak için giriş yapmalısınız");
      return false;
    }

    try {
      // Process each item in the cart
      for (const item of items) {
        const { product, quantity } = item;

        // Add coins if it's a coin package
        if (product.category === "credit") {
          // Extract coin amount from the product name (like "1000 Coin" -> 1000)
          const coinAmountMatch = product.name.match(/(\d+)/);
          if (coinAmountMatch && coinAmountMatch[1]) {
            const coinAmount = parseInt(coinAmountMatch[1]) * quantity;
            addCoins(coinAmount);
          }
        }
        // Process coin purchases
        else if (product.priceType === "coin") {
          // Check if user has enough coins
          const totalCost = product.price * quantity;
          if (!useCoins(totalCost)) {
            return false; // Not enough coins
          }
          
          // Add to purchased items
          addPurchasedItem(product);
        }
        // Process money purchases
        else {
          // Add to purchased items
          addPurchasedItem(product);
          
          // If it's a VIP package, update VIP status
          if (product.category === "rank") {
            setVipStatus(product.name);
          }
        }
      }
      
      // Clear the cart after successful checkout
      clearCart();
      toast.success("Ödeme başarıyla tamamlandı!");
      return true;
    } catch (error) {
      toast.error("Ödeme işlemi sırasında bir hata oluştu");
      return false;
    }
  };

  const addPurchasedItem = (product: Product) => {
    const newItem: PurchasedItem = {
      id: product.id,
      name: product.name,
      purchaseDate: new Date().toISOString(),
      // Set expiry date for VIP ranks (30 days from purchase)
      expiryDate: product.category === "rank" 
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() 
        : undefined
    };
    
    setPurchasedItems(prev => [...prev, newItem]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = items
    .filter(item => item.product.priceType !== "coin")
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0);

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
        purchasedItems,
        vipStatus,
        processCheckout,
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
