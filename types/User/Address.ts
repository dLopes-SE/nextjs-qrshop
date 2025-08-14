import { AddressPayload } from "./AddressPayload";

export type Address = AddressPayload & {
  id: number;
  isFavourite?: boolean;
};