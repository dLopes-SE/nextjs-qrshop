import { Address } from '@/types/User/Address';
import { Card, Text, Group, ActionIcon, Tooltip } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';

interface UserAddressProps {
  address: Address;
  onEdit?: () => void;
  onRemove?: () => void;
}

export default function UserAddress({ address, onEdit, onRemove }: UserAddressProps) {
  return (
    <Card shadow="xs" radius="md" p="md" withBorder>
      <Group justify="space-between" align="flex-start">
        <Text fw={600}>{address.fullName}</Text>
        <Group gap={4}>
          <Tooltip label="Edit" withArrow>
            <ActionIcon
              size="sm"
              variant="subtle"
              color="blue"
              onClick={onEdit}
              aria-label="Edit address"
              style={{ border: '1px solid #ced4da' }} // gray border
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
              style={{ border: '1px solid #ced4da' }} // gray border
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
  );
}