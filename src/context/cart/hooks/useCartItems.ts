
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { CartItem, Product, STORAGE_KEY } from "../types";

export const useCartItems = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem(STORAGE_KEY);
    
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

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

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  };
};
