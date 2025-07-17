import { Group, Text, Avatar, Divider, Stack } from '@mantine/core';

interface CartMenuItemProps {
  id: number;
  image: string;
  qty: number;
  price: number;
  showDivider?: boolean;
}

export default function CartMenuItem({ id, image, qty, price, showDivider }: CartMenuItemProps) {
  return (
    <>
      <Stack align="center" gap={2} mb={4}>
        <Avatar src={image} size={40} radius="md" />
        <Text size="sm" fw={700}>
          ${(price * qty).toFixed(2)}
        </Text>
        <Text size="xs" c="dimmed">
          x{qty}
        </Text>
      </Stack>
      {showDivider && <Divider my="xs" />}
    </>
  );
}