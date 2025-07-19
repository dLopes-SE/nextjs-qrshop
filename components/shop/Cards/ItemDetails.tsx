"use client";

import { useState } from "react";
import { Card, Image, Text, Group, Button, NumberInput, Stack, Grid, Divider, Badge } from "@mantine/core";
import { ShopItem } from "@/types/ShopItem";

interface ItemDetailsProps {
  item: ShopItem;
  cartQuantity?: number;
}

export default function ItemDetails({ item, cartQuantity = 1 }: ItemDetailsProps) {
  const [quantity, setQuantity] = useState(cartQuantity);

  const handleAdd = () => setQuantity(q => Math.min(q + 1, 99));
  const handleRemove = () => setQuantity(q => Math.max(q - 1, 1));

  const handleAddToCart = () => {
    // TODO: Implement add to cart logic
    alert(`Added ${quantity} of ${item.name} to cart!`);
  };

  return (
    <Card shadow="md" padding="lg" radius="md" withBorder style={{ maxWidth: 600 }}>
      <Grid gutter="xl" align="center">
        <Grid.Col span={{ base: 12, sm: 5 }}>
          <Image
            src={item.image}
            alt={item.name}
            radius="md"
            height={340}
            fit="contain"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 7 }}>
          <Stack gap="md">
            <Group justify="space-between">
              <Text fw={700} size="xl">{item.name}</Text>
              <Badge color="blue" size="lg" variant="light" radius="sm">
                ${item.price.toFixed(2)}
              </Badge>
            </Group>
            <Text size="md" c="dimmed">{item.description}</Text>
            <Divider my="xs" />
            <Group>
              <Button variant="light" color="indigo" onClick={handleRemove}>-</Button>
              <NumberInput
                value={quantity}
                onChange={val => setQuantity(Number(val))}
                min={1}
                max={99}
                size="md"
                style={{ width: 80 }}
              />
              <Button variant="light" color="indigo" onClick={handleAdd}>+</Button>
            </Group>
            <Button
              fullWidth
              radius="md"
              color="indigo"
              style={{ fontWeight: 700 }}
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  );
}