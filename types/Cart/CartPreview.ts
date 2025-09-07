import { CartMenuItem } from "./CartMenuItem";
import { OrderStatusEnum } from "./OrderStatusEnum";

export type CartPreviewType = {
  quantity: number;
  subTotal: number;
  isCartChangeAllowed: boolean;
  checkoutStatus: OrderStatusEnum;
  items: CartMenuItem[];
};