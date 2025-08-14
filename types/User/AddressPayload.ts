export type AddressPayload = {
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
};