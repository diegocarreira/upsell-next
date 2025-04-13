import { OrderTotals } from "./OrderTotals";

export type Order = {
  id: string;
  date: string;
  totals: OrderTotals;
};
