import { Center, SimpleGrid, Text } from "@mantine/core";
import ShopCard from "@/components/Cards/ShopCard";
import { ShopItem } from "@/types/ShopItem";
import axios from "@/lib/axios";

async function getItems(): Promise<ShopItem[]> {
  const res = await axios.get("/shop/item", {
    validateStatus: () => true,
  });
  if (res.status !== 200) {
    throw new Error("Failed to load items");
  }
  return res.data;
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