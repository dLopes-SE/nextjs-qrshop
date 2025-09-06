import { CheckoutRequest } from "@/types/Shop/CheckoutRequest";
import axios from "../axios";

export async function createOrder(payload: CheckoutRequest): Promise<void> {
  return axios
    .post<void>("/order/create", payload)
    .then(() => {})
    .catch(() => {
      throw new Error("Failed to create order");
    });
}