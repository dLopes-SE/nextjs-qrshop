import { Center, Text } from "@mantine/core";
import ItemDetails from "@/components/shop/Cards/ItemDetails";
import { getItem } from "@/lib/shop/items";

export default async function ItemPage({ params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = await params;

  const result = await getItem(itemId);

  if (!result || !result.shopItem) {
    return (
      <Center h="100vh">
        <Text c="red">Failed to load item.</Text>
      </Center>
    );
  }

  return (
    <Center py="xl">
      <ItemDetails item={result.shopItem} cartItemId={result.cartItemId} cartQuantity={result.quantity} />
    </Center>
  );
}