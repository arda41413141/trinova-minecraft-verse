
import { useState, useEffect } from "react";
import { Product, PurchasedItem, PURCHASED_ITEMS_KEY } from "../types";
import { createPurchasedItem } from "../cartUtils";

export const usePurchasedItems = () => {
  const [purchasedItems, setPurchasedItems] = useState<PurchasedItem[]>([]);

  // Load purchased items from localStorage
  useEffect(() => {
    const storedPurchasedItems = localStorage.getItem(PURCHASED_ITEMS_KEY);
    
    if (storedPurchasedItems) {
      try {
        setPurchasedItems(JSON.parse(storedPurchasedItems));
      } catch (error) {
        localStorage.removeItem(PURCHASED_ITEMS_KEY);
      }
    }
  }, []);

  // Update localStorage when purchased items change
  useEffect(() => {
    localStorage.setItem(PURCHASED_ITEMS_KEY, JSON.stringify(purchasedItems));
  }, [purchasedItems]);

  const addPurchasedItem = (product: Product) => {
    const newItem = createPurchasedItem(product);
    setPurchasedItems(prev => [...prev, newItem]);
  };

  return {
    purchasedItems,
    addPurchasedItem
  };
};
