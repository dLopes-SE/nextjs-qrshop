import serverAxios from '@/lib/serverAxios';
import { AddressPayload } from '@/types/User/AddressPayload';
import { Address } from '@/types/User/Address';
import { UserInfo as UserInfoType } from '@/types/User/UserInfo';
import axios from '@/lib/axios';

export async function getUserInfo(): Promise<UserInfoType> {
  return serverAxios
    .get<UserInfoType>('/user/info')
    .then((res) => res.data)
    .catch(() => {
      throw new Error('Failed to fetch user info');
    });
}

export async function addAddress(address: AddressPayload): Promise<void> {
  return axios
    .post<void>('/user/address', address)
    .then(() => {})
    .catch(() => {
      throw new Error('Failed to add address');
    });
}

export async function updateAddress(id: number, address: AddressPayload): Promise<void> {
  return axios
    .patch<void>(`/user/address/${id}`, address)
    .then(() => {})
    .catch(() => {
      throw new Error('Failed to update address');
    });
}

export async function removeAddress(id: number): Promise<void> {
  return axios
    .delete<void>(`/user/address/${id}`)
    .then(() => {})
    .catch(() => {
      throw new Error('Failed to delete address');
    });
}

export async function setFavouriteAddress(id: number): Promise<void> {
  return axios
    .post<void>(`/user/address/${id}/favourite`)
    .then(() => {})
    .catch(() => {
      throw new Error('Failed to update address');
    });
}

export async function listAddresses(): Promise<Address[]> {
  return axios
    .get<Address[]>('/user/address')
    .then(res => {
      console.log('Addresses response:', res);
      return res.data;
    })
    .catch(() => {
      throw new Error('Failed to fetch addresses');
    });
}