import { CartMenuItemWithDetails } from "./CartMenuItemWithDetails";
import { OrderStatusEnum } from "../Order/OrderStatusEnum";

export type CartType = {
  quantity: number;
  subTotal: number;
  isCartChangeAllowed: boolean;
  checkoutStatus: OrderStatusEnum;
  items: CartMenuItemWithDetails[];
};