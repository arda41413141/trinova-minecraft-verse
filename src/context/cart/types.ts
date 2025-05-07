
export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  category: string;
  priceType: "money" | "balance"; // Changed from "coin" to "balance"
  isSpecialOffer?: boolean;
  discountPercentage?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  balance: number;
  transactions: any[];
  addBalance: (amount: number, description?: string) => void;
  useBalance: (amount: number, description?: string) => boolean;
  purchasedItems: Product[];
  vipStatus: boolean;
  processCheckout: () => Promise<{ success: boolean; message: string }>;
}

// Storage keys
export const STORAGE_KEY = "trinova_cart";
export const PURCHASED_ITEMS_KEY = "trinova_purchased_items";
export const BALANCE_STORAGE_KEY = "trinova_balance";
export const VIP_STATUS_KEY = "trinova_vip_status";
