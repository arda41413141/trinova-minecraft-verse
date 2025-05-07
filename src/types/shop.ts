
export interface BalancePackage {
  id: string;
  name: string;
  amount: number;
  price: number;
  discountPercentage?: number;
  isFeatured?: boolean;
  bonusAmount?: number;
}
