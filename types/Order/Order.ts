import { CartMenuItemWithDetails } from "../Cart/CartMenuItemWithDetails";
import { AddressPayload } from "../User/AddressPayload";
import { OrderStatusEnum } from "./OrderStatusEnum";

export type OrderType = {
  id: number;
  status: OrderStatusEnum;
  addressId?: number;
  address: AddressPayload | null;
  items: CartMenuItemWithDetails[];
}