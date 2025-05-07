
export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  category: string;
  priceType: "money" | "balance";
  isSpecialOffer?: boolean;
  discountPercentage?: number;
  originalPrice?: number; // Added for display purposes
  balanceAmount?: number; // For balance packages
  purchaseDate?: Date; // For purchased items
  expiryDate?: Date; // For items with expiration like VIP
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PurchasedItem extends Product {
  purchaseDate: Date;
  expiryDate?: Date;
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
  purchasedItems: PurchasedItem[];
  vipStatus: boolean;
  processCheckout: () => Promise<{ success: boolean; message: string }>;
}

// Storage keys
export const STORAGE_KEY = "trinova_cart";
export const PURCHASED_ITEMS_KEY = "trinova_purchased_items";
export const BALANCE_STORAGE_KEY = "trinova_balance";
export const VIP_STATUS_KEY = "trinova_vip_status";
