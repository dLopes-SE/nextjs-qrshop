import { AddressPayload } from "../User/AddressPayload";

export type CheckoutRequest = {
  addressId?: number | null; // present if using a saved address
  addressRequest?: AddressPayload | null; // present if using a custom address
};