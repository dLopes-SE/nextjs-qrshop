'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Button, Center, Group, Modal, Stack, Text, Title } from '@mantine/core';
import ShopItemsTable from '@/components/Admin/ShopItemsTable';
import { createItem, deleteItem, listItems } from '@/lib/shop/items';
import { ShopItem } from '@/types/ShopItem';

const ShopItemModal = dynamic(() => import('@/components/Admin/ShopItemModal'), { ssr: false });

export default function AdminStorePage() {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<ShopItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listItems()
      .then(setItems)
      .catch(() => setError('Failed to load items.'));
  }, []);

  const onCreateItem = (item: Omit<ShopItem, 'id'>) => {
    createItem(item)
      .then((newItem) => {
        setItems((prev) => [...prev, newItem]);
        setModalOpened(false);
      })
      .catch(() => setError('Failed to create item.'));
  };

  const onDeleteItem = (item: ShopItem) => {
    setConfirmDelete(item);
  };

  const handleConfirmDelete = () => {
    if (confirmDelete) {
      deleteItem(confirmDelete.id)
        .then(() => {
          setItems((prev) => prev.filter((i) => i.id !== confirmDelete.id));
          setConfirmDelete(null);
        })
        .catch(() => {
          setError('Failed to delete item.');
          setConfirmDelete(null);
        });
    }
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
      </Group>
      <ShopItemsTable items={items} onDelete={onDeleteItem} />

      <Modal
        opened={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Confirm Delete"
        yOffset={100}
      >
        <Text>
          Are you sure you want to delete item <b>{confirmDelete?.name}</b>?
        </Text>
        <Group mt="md" justify="flex-end">
          <Button variant="default" onClick={() => setConfirmDelete(null)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Group>
      </Modal>
      <ShopItemModal
        mode="create"
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        onCreate={onCreateItem}
      />
    </Stack>
  );
}
