
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  priceType?: "coin" | "money"; 
  originalPrice?: number;       // For discount display
  isSpecialOffer?: boolean;     // For special offer items
  discountPercentage?: number;  // For discount percentage
  coinAmount?: number;          // For coin packages
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

export interface CoinTransaction {
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
  coinBalance: number;
  transactions: CoinTransaction[];
  addCoins: (amount: number, description?: string) => void;
  useCoins: (amount: number, description?: string) => boolean;
  purchasedItems: PurchasedItem[];
  vipStatus: string | null;
  processCheckout: () => Promise<boolean>;
}

export const STORAGE_KEY = "trinova_cart";
export const COIN_STORAGE_KEY = "trinova_coins";
export const PURCHASED_ITEMS_KEY = "trinova_purchased_items";
export const VIP_STATUS_KEY = "trinova_vip_status";
