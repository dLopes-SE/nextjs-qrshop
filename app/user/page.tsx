import { Box } from '@mantine/core';
import UserInfo from '@/components/User/UserInfo';
import { UserInfo as UserInfoType } from '@/types/User/UserInfo';
import { Address } from '@/types/User/Address';
import { getUserInfo } from '@/lib/user/userinfo';

export default async function UserPage() {
  let user : UserInfoType = await getUserInfo();

  return (
    <Box maw={600} mx="auto" py="xl">
      <UserInfo user={user} />
    </Box>
  );
}