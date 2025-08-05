import { CartMenuItem } from "./CartMenuItem";

export type CartType = {
  quantity: number;
  subTotal: number;
  items: CartMenuItem[];
};