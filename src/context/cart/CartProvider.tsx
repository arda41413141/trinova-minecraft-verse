
import React from "react";
import CartContext from "./CartContext";
import { calculateTotalItems, calculateTotalPrice } from "./cartUtils";
import { useCartItems } from "./hooks/useCartItems";
import { useBalance } from "./hooks/useBalance"; // Fixed import order - moved before it's used
import { usePurchasedItems } from "./hooks/usePurchasedItems";
import { useVipStatus } from "./hooks/useVipStatus";
import { useCheckout } from "./hooks/useCheckout";

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { items, addItem, removeItem, updateQuantity, clearCart } = useCartItems();
  const { balance, transactions, addBalance, useBalance } = useBalance();
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
        balance,
        transactions,
        addBalance,
        useBalance,
        purchasedItems,
        vipStatus,
        processCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
