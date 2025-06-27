import { Center, SimpleGrid, Text } from "@mantine/core";
import ShopCard from "@/components/Cards/ShopCard";
import { ShopItem } from "@/types/ShopItem";

async function getItems(): Promise<ShopItem[]> {
  const res = await fetch("https://localhost:7256/shop/item", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to load items");
  }
  return res.json();
}

export default async function ShopPage() {
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
        <Text c="red">{error}</Text>
      </Center>
    );
  }

  return (
    <Center py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {items.map((item) => (
          <ShopCard key={item.id} item={item} />
        ))}
      </SimpleGrid>
    </Center>
  );
}