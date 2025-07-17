import { Text, Avatar, Divider, Stack } from '@mantine/core';
import type { CartMenuItem } from '@/types/CartMenuItem';


export default function CartMenuItem(item : CartMenuItem) {
  return (
    <>
      <Stack align="center" gap={2} mb={4}>
        <Avatar src={item.image} size={40} radius="md" />
        <Text size="sm" fw={700}>
          ${(item.price).toFixed(2)}
        </Text>
        <Text size="xs" c="dimmed">
          {item.qty}
        </Text>
      </Stack>
      <Divider my="xs" />
    </>
  );
}