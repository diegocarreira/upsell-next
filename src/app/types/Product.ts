export type Product = {
  id: number;
  name: string;
  description: string;
  sellsNumber?: string;
  originalPrice: number;
  discountedPrice: number;
  savings: number;
  shippingHandling: number;
  imageUrl: string;
  bestSeller?: boolean;
};
