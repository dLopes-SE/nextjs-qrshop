'use client';

import { Card, Stack, Text, Group, Divider, Button } from '@mantine/core';
import { Address } from '@/types/User/Address';
import { UserInfo as UserInfoType } from '@/types/User/UserInfo';
import UserAddress from './UserAddress';

export default function UserInfo({ user }: { user: UserInfoType }) {
  return (
    <Card shadow="md" radius="md" p="xl" withBorder>
      <Stack gap="md">
        <Text fw={700} size="xl" color="indigo.7">
          User Info
        </Text>
        <Divider />
        <Group>
          <Text fw={600}>Name:</Text>
          <Text>{user.name}</Text>
        </Group>
        <Group>
          <Text fw={600}>Email:</Text>
          <Text>{user.email}</Text>
        </Group>
        <Group>
          <Text fw={600}>Phone:</Text>
          <Text>{user.phoneNumber}</Text>
        </Group>
        <Divider my="sm" />
        <Text fw={700} size="lg" color="indigo.7">
          Addresses
        </Text>
        <Stack gap="sm">
          {user.addresses.map((addr: Address) => (
            <UserAddress key={addr.id} address={addr} />
          ))}
        </Stack>
        <Button mt="md" color="indigo" radius="md">
          Add Address
        </Button>
      </Stack>
    </Card>
  );
}