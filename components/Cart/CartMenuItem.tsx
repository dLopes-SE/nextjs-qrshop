import { Text, Avatar, Divider, Stack, Badge, Group } from '@mantine/core';
import type { CartMenuItem as CartMenuItemType } from '@/types/CartMenuItem';
import { useRouter } from 'next/navigation';


export default function CartMenuItem(item : CartMenuItemType) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/shop/${item.itemId}`);
  };

  return (
    <>
      <Stack
        align="center"
        gap={2}
        mb={4}
        style={{ cursor: 'pointer' }}
        onClick={handleClick}
      >
        <Avatar src={item.image} size={40} radius="md" />
        <Text size="sm" fw={700}>
          {item.name}
        </Text>
        <Badge
          color="blue"
          size="lg"
          variant="light"
          radius="sm"
          mt={2}
          style={{ letterSpacing: 1, fontWeight: 600 }}
        >
          {item.quantity}
        </Badge>
      </Stack>
      <Divider my="xs" />
    </>
  );
}