import { CartMenuItemWithDetails } from "./CartMenuItemWithDetails";

export type CartType = {
  quantity: number;
  subTotal: number;
  isCartChangeAllowed: boolean;
  checkoutStatus: string;
  items: CartMenuItemWithDetails[];
};