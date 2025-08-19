import { CartMenuItemWithDetails } from "./CartMenuItemWithDetails";

export type CartType = {
  quantity: number;
  subTotal: number;
  isCartChangeAllowed: boolean;
  items: CartMenuItemWithDetails[];
};