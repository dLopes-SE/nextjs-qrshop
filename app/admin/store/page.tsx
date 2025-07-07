"use client";

import { useEffect, useState } from "react";
import { Button, Center, Stack, Title, Group } from "@mantine/core";
import ShopItemsTable from "@/components/Admin/ShopItemsTable";
import { ShopItem } from "@/types/ShopItem";
import dynamic from "next/dynamic";
import { listItems, createItem } from "@/lib/shop/items";

const ShopItemModal = dynamic(() => import("@/components/Admin/ShopItemModal"), { ssr: false });

export default function AdminStorePage() {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    listItems()
      .then(setItems)
      .catch(() => setError("Failed to load items."));
  }, []);

  const onCreateItem = (item: Omit<ShopItem, "id">) => {
    createItem(item)
      .then((newItem) => {
        setItems((prev) => [...prev, newItem]);
        setModalOpened(false);
      })
      .catch(() => setError("Failed to create item."));
  };

  if (error) {
    return (
      <Center h="100vh">
        <Title order={3} c="red">
          {error}
        </Title>
      </Center>
    );
  }

  return (
    <Stack p="md">
      <Group justify="space-between">
        <Title order={2}>Manage Shop Items</Title>
        <Button color="green" size="md" onClick={() => setModalOpened(true)}>
          Add New Item
        </Button>
        <ShopItemModal
          mode="create"
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          onCreate={(item) => onCreateItem(item)}
        />
      </Group>
      <ShopItemsTable items={items} />
    </Stack>
  );
}