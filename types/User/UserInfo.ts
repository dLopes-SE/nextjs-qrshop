import { Address } from "./Address";

export type UserInfo = {
  email: string;
  name: string;
  phoneNumber: string;
  addresses: Address[];
}