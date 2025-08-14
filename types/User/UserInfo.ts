import { Address } from "./AddressPayload";

export type UserInfo = {
  email: string;
  name: string;
  phoneNumber: string;
  addresses: Address[];
}