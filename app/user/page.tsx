export const dynamic = "force-dynamic";

import { Box, Text } from '@mantine/core';
import UserInfo from '@/components/User/UserInfo';
import { UserInfo as UserInfoType } from '@/types/User/UserInfo';
import { getUserInfo } from '@/lib/user/userinfo';

export default async function UserPage() {
  const user: UserInfoType = await getUserInfo();

  if (!user) {
    return <Text c="red">Failed to load user info. Please log in.</Text>;
  }

  return (
    <Box maw={600} mx="auto" py="xl">
      <UserInfo user={user} />
    </Box>
  );
}