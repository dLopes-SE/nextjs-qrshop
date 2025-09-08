import { CartMenuItem } from "./CartMenuItem";
import { OrderStatusEnum } from "../Order/OrderStatusEnum";

export type CartPreviewType = {
  quantity: number;
  subTotal: number;
  isCartChangeAllowed: boolean;
  checkoutStatus: OrderStatusEnum;
  items: CartMenuItem[];
};