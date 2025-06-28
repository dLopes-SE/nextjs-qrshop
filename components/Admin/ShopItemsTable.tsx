"use client";
import { Table, Button, Group, Text } from "@mantine/core";
import { ShopItem } from "@/types/ShopItem";

interface ShopItemsTableProps {
  items: ShopItem[];
  onEdit?: (item: ShopItem) => void;
  onDelete?: (item: ShopItem) => void;
}

export default function ShopItemsTable({ items, onEdit, onDelete }: ShopItemsTableProps) {
  return (
    <Table striped highlightOnHover withTableBorder>
      <Table.Thead>
        <Table.Tr>
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
              <Text fw={600}>{item.name}</Text>
            </Table.Td>
            <Table.Td>${item.price}</Table.Td>
            <Table.Td>{item.slogan}</Table.Td>
            <Table.Td>
              <Group gap="xs">
                <Button size="xs" variant="light" color="blue" onClick={() => onEdit?.(item)}>
                  Edit
                </Button>
                <Button size="xs" variant="light" color="red" onClick={() => onDelete?.(item)}>
                  Delete
                </Button>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}