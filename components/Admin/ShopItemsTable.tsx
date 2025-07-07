"use client";
import { useState } from "react";
import { Table, Button, Group, Text } from "@mantine/core";
import { ShopItem } from "@/types/ShopItem";
import ShopItemModal from "./ShopItemModal";

interface ShopItemsTableProps {
  items: ShopItem[];
  onDelete?: (item: ShopItem) => void;
}

export default function ShopItemsTable({ items, onDelete }: ShopItemsTableProps) {
  const [selectedItemId, setSelectedItemId] = useState<string | number | null>(null);

  return (
    <>
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Slogan</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {items.map((item) => (
            <Table.Tr key={item.id}>
              <Table.Td>
                <Text fw={500} c="dimmed">
                  {item.id}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text fw={600}>{item.name}</Text>
              </Table.Td>
              <Table.Td>${item.price}</Table.Td>
              <Table.Td>{item.slogan}</Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <Button
                    size="xs"
                    variant="light"
                    color="teal"
                    onClick={() => setSelectedItemId(item.id)}
                  >
                    Details
                  </Button>
                  <Button
                    size="xs"
                    variant="light"
                    color="red"
                    onClick={() => onDelete?.(item)}
                  >
                    Delete
                  </Button>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <ShopItemModal 
        mode="view"
        itemId={selectedItemId}
        opened={selectedItemId !== null}
        onClose={() => setSelectedItemId(null)}
      />
    </>
  );
}