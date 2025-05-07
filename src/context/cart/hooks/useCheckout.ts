
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { CartItem, Product, PurchasedItem } from "../types";

interface CheckoutDependencies {
  addBalance: (amount: number, description?: string) => void;
  useBalance: (amount: number, description?: string) => boolean;
  addPurchasedItem: (product: PurchasedItem) => void;
  setVipStatus: (status: boolean) => void;
  clearCart: () => void;
}

export const useCheckout = ({
  addBalance,
  useBalance,
  addPurchasedItem,
  setVipStatus,
  clearCart
}: CheckoutDependencies) => {
  const { isAuthenticated } = useAuth();

  const processCheckout = async (items: CartItem[]): Promise<{ success: boolean; message: string }> => {
    if (!isAuthenticated) {
      return { success: false, message: "Ödeme yapmak için giriş yapmalısınız" };
    }

    try {
      // Process each item in the cart
      for (const item of items) {
        const { product, quantity } = item;

        // Add balance if it's a balance package
        if (product.category === "credit") {
          // Use balanceAmount from the product directly if available
          if (product.balanceAmount) {
            const balanceAmount = product.balanceAmount * quantity;
            addBalance(balanceAmount, `${product.name} satın alındı`);
          } else {
            // Extract balance amount from the product name (like "100 TL" -> 100)
            const balanceAmountMatch = product.name.match(/(\d+)/);
            if (balanceAmountMatch && balanceAmountMatch[1]) {
              const balanceAmount = parseInt(balanceAmountMatch[1]) * quantity;
              addBalance(balanceAmount, `${product.name} satın alındı`);
            }
          }
        }
        // Process balance purchases (items bought with balance)
        else if (product.priceType === "balance") {
          // Check if user has enough balance
          const totalCost = product.price * quantity;
          if (!useBalance(totalCost, `${product.name} satın alındı`)) {
            return { success: false, message: "Yetersiz bakiye" };
          }
          
          // Add to purchased items
          const purchasedItem: PurchasedItem = {
            ...product,
            purchaseDate: new Date(),
            // Set expiry date for VIP packages
            expiryDate: product.category === "rank" ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : undefined
          };
          addPurchasedItem(purchasedItem);
        }
        // Process money purchases
        else {
          // Add to purchased items
          const purchasedItem: PurchasedItem = {
            ...product,
            purchaseDate: new Date(),
            // Set expiry date for VIP packages
            expiryDate: product.category === "rank" ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : undefined
          };
          addPurchasedItem(purchasedItem);
          
          // If it's a VIP package, update VIP status
          if (product.category === "rank") {
            setVipStatus(true);
          }
        }
      }
      
      // Clear the cart after successful checkout
      clearCart();
      return { success: true, message: "Ödeme başarıyla tamamlandı!" };
    } catch (error) {
      return { success: false, message: "Ödeme işlemi sırasında bir hata oluştu" };
    }
  };

  return { processCheckout };
};
