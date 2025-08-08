'use client';

import { useState } from 'react';
import { Card, Stack, Text, Group, Divider, Button } from '@mantine/core';
import { Address } from '@/types/User/Address';
import { UserInfo as UserInfoType } from '@/types/User/UserInfo';
import UserAddress from './UserAddress';
import AddressModal from './AddressModal';
import { addAddress } from '@/lib/user/userinfo';
import { AddressPayload } from '@/types/User/AddressPayload';

export default function UserInfo({ user }: { user: UserInfoType }) {
  const [modalOpened, setModalOpened] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Optionally, you may want to manage addresses state locally for instant UI update
  // const [addresses, setAddresses] = useState<Address[]>(user.addresses);

  const handleAddAddress = async (values: AddressPayload) => {
    setLoading(true);
    setModalError(null);
    try {
      await addAddress(values);
      setModalOpened(false);
      // Optionally, update addresses state here if you want instant UI update
      // setAddresses((prev) => [...prev, { ...values, id: newId }]);
    } catch {
      setModalError('Failed to add address');
    } finally {
      setLoading(false);
    }
  };

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
        <Button mt="md" color="indigo" radius="md" onClick={() => setModalOpened(true)}>
          Add Address
        </Button>
        <AddressModal
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          onSubmit={handleAddAddress}
          isEditing={false}
          loading={loading}
          error={modalError}
        />
      </Stack>
    </Card>
  );
}