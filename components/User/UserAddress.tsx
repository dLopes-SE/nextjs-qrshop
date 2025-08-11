import { useState } from 'react';
import { Address } from '@/types/User/Address';
import { Card, Text, Group, ActionIcon, Tooltip } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import AddressModal from './AddressModal';
import { AddressPayload } from '@/types/User/AddressPayload';

interface UserAddressProps {
  address: Address;
  onEdit?: (id: number, values: AddressPayload) => Promise<void>;
  onRemove?: (id: number) => Promise<void>;
  onSetFavourite?: (id: number) => Promise<void>;
}

export default function UserAddress({ address, onEdit, onRemove, onSetFavourite }: UserAddressProps) {
  const [modalOpened, setModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [favLoading, setFavLoading] = useState(false);

  const handleEdit = async (values: AddressPayload) => {
    setLoading(true);
    setModalError(null);
    if (onEdit) {
      await onEdit(address.id, values);
    }
    setModalOpened(false);
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    setModalError(null);
    if (onRemove) {
      await onRemove(address.id);
    }
    setLoading(false);
  };

  const handleSetFavourite = async () => {
    setFavLoading(true);
    setModalError(null);
    if (onSetFavourite) {
      await onSetFavourite(address.id);
    }
    setFavLoading(false);
  };

  return (
    <>
      <Card shadow="xs" radius="md" p="md" withBorder>
        <Group justify="space-between" align="flex-start">
          <Text fw={600}>{address.fullName}</Text>
          <Group gap={4}>
            <Tooltip label="Edit" withArrow>
              <ActionIcon
                size="sm"
                variant="subtle"
                color="blue"
                onClick={() => setModalOpened(true)}
                aria-label="Edit address"
                style={{ border: '1px solid #ced4da' }}
              >
                <IconPencil size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Remove" withArrow>
              <ActionIcon
                size="sm"
                variant="subtle"
                color="red"
                onClick={handleDelete}
                aria-label="Remove address"
                style={{ border: '1px solid #ced4da' }}
                loading={loading}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
        <Text size="sm" mt={4}>
          {address.addressLine1}
          {address.addressLine2 && `, ${address.addressLine2}`}
        </Text>
        <Text size="sm">
          {address.postalCode} {address.city}
          {address.state && `, ${address.state}`}
        </Text>
        <Text size="sm">{address.country}</Text>
        {address.isFavourite ? (
          <Text size="xs" c="orange.6" fw={700} mt={4}>
            Favourite
          </Text>
        ) : (
          <Text
            size="xs"
            c="gray.6"
            fw={500}
            mt={4}
            style={{ cursor: favLoading ? 'not-allowed' : 'pointer', textDecoration: 'underline' }}
            onClick={favLoading ? undefined : handleSetFavourite}
          >
            {favLoading ? 'Setting favourite...' : 'Set favourite'}
          </Text>
        )}
      </Card>
      <AddressModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        onSubmit={handleEdit}
        initialAddress={address}
        isEditing
        loading={loading}
        error={modalError}
      />
    </>
  );
}