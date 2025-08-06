import { Badge, Button, Divider, Group, Image, NumberInput, Stack, Text } from '@mantine/core';
import type { CartMenuItemWithDetails } from '@/types/CartMenuItemWithDetails';

interface CartPageItemProps {
  item: CartMenuItemWithDetails;
  onItemRemove?: (id: number) => void;
  onUpdateCart?: (id: number, quantity: number) => void;
}

export default function CartPageItem({ item, onItemRemove: onRemove, onUpdateCart }: CartPageItemProps) {
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
            <Text fw={700} size="md">
              {item.name}
            </Text>
            <Badge color="blue" size="sm" variant="light" radius="sm">
              x{item.quantity}
            </Badge>
          </Group>
          <Text size="xs" c="dimmed" fw={500}>
            {item.slogan}
          </Text>
          <Text size="xs" c="gray.7" lineClamp={2}>
            {item.description}
          </Text>
          <Group gap="xs" mt={4}>
            {onUpdateCart && (
              <NumberInput
                value={item.quantity}
                min={1}
                max={99}
                size="xs"
                style={{ width: 60 }}
                onChange={(val) => onUpdateCart && onUpdateCart(item.id, Number(val))}
                aria-label="Quantity"
              />
            )}
            {onRemove && (
              <Button
                color="gray"
                variant="outline"
                size="compact-xs"
                onClick={() => onRemove(item.id)}
                style={{ fontWeight: 400, padding: '0 8px', height: 24, minWidth: 0 }}
              >
                remove
              </Button>
            )}
          </Group>
        </Stack>
      </Group>
      <Divider my="xs" />
    </>
  );
}
