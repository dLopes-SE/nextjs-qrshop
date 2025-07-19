import { Center, Loader, Text } from "@mantine/core";
import ItemDetails from "@/components/shop/Cards/ItemDetails";
import { getItem } from "@/lib/shop/items";

export default async function ItemPage({ params }: { params: { itemId: string } }) {
  const { itemId } = params;
  let item: any = null;
  let quantity: number = 1;
  let error: string | null = null;

  try {
    const result = await getItem(itemId);
    item = result.item;
    quantity = result.quantity;
  } catch {
    error = "Failed to load item.";
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text c="red">{error}</Text>
      </Center>
    );
  }

  if (!item) {
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );
  }

  return (
    <Center py="xl">
      <ItemDetails item={item} cartQuantity={quantity} />
    </Center>
  );
}