import { Address } from "./Address";

export type AddressPayload = Omit<Address, 'id'>;
