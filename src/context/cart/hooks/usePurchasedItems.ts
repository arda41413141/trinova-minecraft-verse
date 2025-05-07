
import { useState, useEffect } from "react";
import { PURCHASED_ITEMS_KEY, PurchasedItem } from "../types";

export const usePurchasedItems = () => {
  const [purchasedItems, setPurchasedItems] = useState<PurchasedItem[]>([]);

  // Load purchased items from localStorage
  useEffect(() => {
    const storedItems = localStorage.getItem(PURCHASED_ITEMS_KEY);
    
    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems);
        // Convert date strings back to Date objects
        const itemsWithDates = parsedItems.map((item: any) => ({
          ...item,
          purchaseDate: item.purchaseDate ? new Date(item.purchaseDate) : new Date(),
          expiryDate: item.expiryDate ? new Date(item.expiryDate) : undefined
        }));
        setPurchasedItems(itemsWithDates);
      } catch (error) {
        console.error("Failed to parse purchased items:", error);
        localStorage.removeItem(PURCHASED_ITEMS_KEY);
      }
    }
  }, []);

  // Update localStorage when purchased items change
  useEffect(() => {
    localStorage.setItem(PURCHASED_ITEMS_KEY, JSON.stringify(purchasedItems));
  }, [purchasedItems]);

  const addPurchasedItem = (product: PurchasedItem) => {
    setPurchasedItems(prev => [...prev, product]);
  };

  return {
    purchasedItems,
    addPurchasedItem
  };
};
