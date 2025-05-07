
import { PurchasedItem, Product } from "./types";

export const calculateTotalItems = (items: { quantity: number }[]) => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

export const calculateTotalPrice = (items: { product: Product; quantity: number }[]) => {
  return items
    .filter(item => item.product.priceType !== "balance")
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

export const createPurchasedItem = (product: Product): PurchasedItem => {
  return {
    id: product.id,
    name: product.name,
    purchaseDate: new Date().toISOString(),
    // Set expiry date for VIP ranks (30 days from purchase)
    expiryDate: product.category === "rank" 
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() 
      : undefined
  };
};
