
export interface BalancePackage {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  balanceAmount: number;
  image: string;
  description: string;
  isSpecialOffer?: boolean;
  discountPercentage?: number;
  category?: string;
}
