
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { CartItem, Product } from "../types";

interface CheckoutDependencies {
  addCoins: (amount: number) => void;
  useCoins: (amount: number) => boolean;
  addPurchasedItem: (product: Product) => void;
  setVipStatus: (status: string) => void;
  clearCart: () => void;
}

export const useCheckout = ({
  addCoins,
  useCoins,
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

        // Add coins if it's a coin package
        if (product.category === "credit") {
          // Use coinAmount from the product directly if available
          if (product.coinAmount) {
            const coinAmount = product.coinAmount * quantity;
            addCoins(coinAmount);
            toast.success(`${coinAmount} Coin hesabınıza eklendi!`);
          } else {
            // Extract coin amount from the product name (like "1000 Coin" -> 1000)
            const coinAmountMatch = product.name.match(/(\d+)/);
            if (coinAmountMatch && coinAmountMatch[1]) {
              const coinAmount = parseInt(coinAmountMatch[1]) * quantity;
              addCoins(coinAmount);
              toast.success(`${coinAmount} Coin hesabınıza eklendi!`);
            }
          }
        }
        // Process coin purchases (items bought with coins)
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

  return { processCheckout };
};
