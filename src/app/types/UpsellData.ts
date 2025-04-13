import { Product } from "./Product";

export type UpsellData = {
  title: string;
  subtitle: string;
  copy: string;
  subcopy: string;
  products: Product[];
  guarantee: string;
  primaryCTA: string;
  secondaryCTA: string;
};
