
import React from "react";

import CartContext from "./CartContext";
import { calculateTotalItems, calculateTotalPrice } from "./cartUtils";
import { useCartItems } from "./hooks/useCartItems";
import { useBalanceHook } from "./hooks/useBalance"; 
import { usePurchasedItems } from "./hooks/usePurchasedItems";
import { useVipStatus } from "./hooks/useVipStatus";
import { useCheckout } from "./hooks/useCheckout";
import { Product, PurchasedItem } from "./types";

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { items, addItem, removeItem, updateQuantity, clearCart } = useCartItems();
  const { balance, transactions, addBalance, useBalance } = useBalanceHook(); 
  const { purchasedItems, addPurchasedItem } = usePurchasedItems();
  const { vipStatus, setVipStatus } = useVipStatus();
  const { processCheckout: processCheckoutBase } = useCheckout({
    addBalance,
    useBalance,
    addPurchasedItem,
    setVipStatus,
    clearCart
  });

  const totalItems = calculateTotalItems(items);
  const totalPrice = calculateTotalPrice(items);

  // Wrapper for processCheckout to automatically pass the items
  const processCheckout = async () => {
    return await processCheckoutBase(items);
  };

  // Create a function to add products to purchased items
  const addProductToPurchasedItems = (product: Product) => {
    const purchasedItem: PurchasedItem = {
      ...product,
      purchaseDate: new Date(),
      // Set expiry date for VIP packages
      expiryDate: product.category === "rank" ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : undefined
    };
    addPurchasedItem(purchasedItem);
  };

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
        balance,
        transactions,
        addBalance,
        useBalance,
        purchasedItems,
        vipStatus,
        processCheckout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
