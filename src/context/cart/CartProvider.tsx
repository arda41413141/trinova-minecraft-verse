
import React from "react";
import CartContext from "./CartContext";
import { calculateTotalItems, calculateTotalPrice } from "./cartUtils";
import { useCartItems } from "./hooks/useCartItems";
import { useCoinBalance } from "./hooks/useCoinBalance";
import { usePurchasedItems } from "./hooks/usePurchasedItems";
import { useVipStatus } from "./hooks/useVipStatus";
import { useCheckout } from "./hooks/useCheckout";

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { items, addItem, removeItem, updateQuantity, clearCart } = useCartItems();
  const { coinBalance, addCoins, useCoins } = useCoinBalance();
  const { purchasedItems, addPurchasedItem } = usePurchasedItems();
  const { vipStatus, setVipStatus } = useVipStatus();
  const { processCheckout: processCheckoutBase } = useCheckout({
    addCoins,
    useCoins,
    addPurchasedItem,
    setVipStatus,
    clearCart
  });

  const totalItems = calculateTotalItems(items);
  const totalPrice = calculateTotalPrice(items);
  
  // Wrapper for processCheckout that passes the current items
  const processCheckout = async () => {
    return processCheckoutBase(items);
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
