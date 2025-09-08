import { CheckoutRequest } from "@/types/Shop/CheckoutRequest";
import axios from "../axios";
import { OrderType } from "@/types/Order/Order";

export async function createCheckout(payload: CheckoutRequest): Promise<void> {
  return axios
    .post<void>("/order/create", payload)
    .then(() => {})
    .catch(() => {
      throw new Error("Failed to create order");
    });
}

export async function getCheckout(): Promise<OrderType> {
  return axios
    .get<OrderType>("/order/checkout")
    .then((response) => response.data)
    .catch(() => {
      throw new Error("Failed to get checkout");
    });
}