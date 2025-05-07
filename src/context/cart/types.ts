
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  priceType?: "balance" | "money"; 
  originalPrice?: number;       // For discount display
  isSpecialOffer?: boolean;     // For special offer items
  discountPercentage?: number;  // For discount percentage
  balanceAmount?: number;       // For balance packages
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PurchasedItem {
  id: string;
  name: string;
  purchaseDate: string;
  expiryDate?: string;
}

export interface BalanceTransaction {
  id: string;
  amount: number;
  type: "purchase" | "usage";
  description: string;
  date: Date;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  balance: number;
  transactions: BalanceTransaction[];
  addBalance: (amount: number, description?: string) => void;
  useBalance: (amount: number, description?: string) => boolean;
  purchasedItems: PurchasedItem[];
  vipStatus: string | null;
  processCheckout: () => Promise<boolean>;
}

export const STORAGE_KEY = "trinova_cart";
export const BALANCE_STORAGE_KEY = "trinova_balance";
export const PURCHASED_ITEMS_KEY = "trinova_purchased_items";
export const VIP_STATUS_KEY = "trinova_vip_status";
