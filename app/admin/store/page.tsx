import { Button, Center, Stack, Title, Group } from "@mantine/core";
import ShopItemsTable from "@/components/Admin/ShopItemsTable";
import { ShopItem } from "@/types/ShopItem";

async function getItems(): Promise<ShopItem[]> {
  const res = await fetch("https://localhost:7256/shop/item", { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to load items");
  }
  return res.json();
}

export default async function AdminStorePage() {
  let items: ShopItem[] = [];
  let error: string | null = null;

  try {
    items = await getItems();
  } catch {
    error = "Failed to load items.";
  }

  if (error) {
    return (
      <Center h="100vh">
        <Title order={3} c="red">{error}</Title>
      </Center>
    );
  }

  return (
    <Stack p="md">
      <Group justify="space-between">
        <Title order={2}>Manage Shop Items</Title>
        <Button color="green" size="md">Add New Item</Button>
      </Group>
      <ShopItemsTable items={items} />
    </Stack>
  );
}