import serverAxios from '@/lib/serverAxios';
import { AddressPayload } from '@/types/User/AddressPayload';
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