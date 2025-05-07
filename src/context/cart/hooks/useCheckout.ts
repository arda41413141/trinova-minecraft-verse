
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { CartItem, Product } from "../types";

interface CheckoutDependencies {
  addBalance: (amount: number, description?: string) => void;
  useBalance: (amount: number, description?: string) => boolean;
  addPurchasedItem: (product: Product) => void;
  setVipStatus: (status: string) => void;
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

  const processCheckout = async (items: CartItem[]): Promise<boolean> => {
    if (!isAuthenticated) {
      toast.error("Ödeme yapmak için giriş yapmalısınız");
      return false;
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
            return false; // Not enough balance
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

  return { processCheckout };
};
