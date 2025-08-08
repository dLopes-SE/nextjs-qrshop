import { useState } from 'react';
import { Address } from '@/types/User/Address';
import { Card, Text, Group, ActionIcon, Tooltip } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import AddressModal from './AddressModal';

interface UserAddressProps {
  address: Address;
  onEdit?: () => void;
  onRemove?: () => void;
}

export default function UserAddress({ address, onEdit, onRemove }: UserAddressProps) {
  const [modalOpened, setModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const handleEdit = async (values: any) => {
    setLoading(true);
    setModalError(null);
    try {
      // You should implement patchAddress for editing, here is just a placeholder
      // await patchAddress(address.id, values);
      if (onEdit) {
        onEdit();
      }
      setModalOpened(false);
    } catch {
      setModalError("Failed to update address");
    } finally {
      setLoading(false);
    }
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
                onClick={onRemove}
                aria-label="Remove address"
                style={{ border: '1px solid #ced4da' }}
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
        {address.isFavourite && (
          <Text size="xs" c="orange.6" fw={700} mt={4}>
            Favourite
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