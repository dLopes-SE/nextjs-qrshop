import { Center, SimpleGrid, Text } from "@mantine/core";
import ShopCard from "@/components/shop/Cards/ShopCard";
import { ShopItem } from "@/types/Shop/ShopItem";
import axios from "@/lib/axios";

async function getItems(): Promise<ShopItem[]> {
  const res = await axios.get("/shop/item");
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