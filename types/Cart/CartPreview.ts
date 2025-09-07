import { CartMenuItem } from "./CartMenuItem";

export type CartPreviewType = {
  quantity: number;
  subTotal: number;
  isCartChangeAllowed: boolean;
  checkoutStatus: string;
  items: CartMenuItem[];
};