import { Group, Text, Image, Stack, Badge, Button, NumberInput, Divider } from '@mantine/core';
import type { CartMenuItemWithDetails } from '@/types/CartMenuItemWithDetails';
import { useState } from 'react';

interface CartPageItemProps {
  item: CartMenuItemWithDetails;
  onRemove?: (id: number) => void;
  onUpdateQuantity?: (quantity: number) => void;
}

export default function CartPageItem({ item, onRemove, onUpdateQuantity: onUpdateCart }: CartPageItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (val: number | undefined) => {
    if (val && val > 0) {
      setQuantity(val);
      onUpdateCart?.(quantity);
    }
  };

  return (
    <>
      <Group align="flex-start" gap="md" wrap="nowrap" style={{ width: '100%', padding: '12px 0' }}>
        <Image
          src={item.image}
          alt={item.name}
          radius="md"
          fit="cover"
          style={{ width: 56, height: 56, flexShrink: 0, objectFit: 'cover' }}
        />
        <Stack gap={2} style={{ flex: 1 }}>
          <Group justify="space-between" align="flex-start">
            <Text fw={700} size="md">{item.name}</Text>
            <Badge color="blue" size="sm" variant="light" radius="sm">
              x{quantity}
            </Badge>
          </Group>
          <Text size="xs" c="dimmed" fw={500}>{item.slogan}</Text>
          <Text size="xs" c="gray.7" lineClamp={2}>{item.description}</Text>
          <Group gap="xs" mt={4}>
            <NumberInput
              value={quantity}
              min={1}
              max={99}
              size="xs"
              style={{ width: 60 }}
              onChange={val => handleQuantityChange(Number(val))}
              aria-label="Quantity"
            />
            {onRemove && (
              <Button
                color="red"
                variant="subtle"
                size="xs"
                onClick={() => onRemove(item.id)}
              >
                Remove
              </Button>
            )}
          </Group>
        </Stack>
      </Group>
      <Divider my="xs" />
    </>
  );
}