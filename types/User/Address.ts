export type Address = {
  id: number;
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  isFavourite?: boolean;
};