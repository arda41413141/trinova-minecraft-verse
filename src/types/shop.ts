
export interface CoinPackage {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  coinAmount: number;
  image: string;
  description: string;
  isSpecialOffer?: boolean;
  discountPercentage?: number;
}
