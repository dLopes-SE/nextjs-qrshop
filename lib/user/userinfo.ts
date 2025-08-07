import serverAxios from '@/lib/serverAxios';
import { UserInfo as UserInfoType } from '@/types/User/UserInfo';

export async function getUserInfo(): Promise<UserInfoType> {
  return serverAxios
    .get<UserInfoType>('/user/info')
    .then((res) => res.data)
    .catch(() => {
      throw new Error('Failed to fetch user info');
    });
}