import { CartMenuItem } from "./CartMenuItem";

export type CartPreviewType = {
  quantity: number;
  subTotal: number;
  items: CartMenuItem[];
};