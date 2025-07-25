'use client';

import { useState } from 'react';
import { useSession } from "next-auth/react";
import { IconTrash } from '@tabler/icons-react';
import {
  Badge,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Image,
  NumberInput,
  Stack,
  Text,
} from '@mantine/core';
import { addToCart, removeFromCart, updateCartItem } from '@/lib/shop/cart';
import { ShopItem } from '@/types/ShopItem';

interface ItemDetailsProps {
  item: ShopItem;
  cartQuantity?: number;
}

export default function ItemDetails({ item, cartQuantity = 1 }: ItemDetailsProps) {
  const { data: session } = useSession();
  const [quantity, setQuantity] = useState<number>(cartQuantity);
  const [quantityToAdd, setQuantityToAdd] = useState<number>(1);
  const [inputError, setInputError] = useState<string | undefined>(undefined);

  const handleNumberInputChange = (value: number | undefined) => {
    setInputError(undefined); // Reset error on input change

    const isItemInCart = quantity > 0;
    if (value === undefined || value < 1 || value > 99) {
      setInputError('Please enter a valid quantity (1-99)');
      return;
    }

    isItemInCart ? updateCartItemQuantity(value || 1) : setQuantityToAdd(value || 1);
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      setInputError('Item already in cart. Please update the quantity instead.');
      return;
    }

    if (quantityToAdd < 1 || quantityToAdd > 99) {
      setInputError('Please enter a valid quantity (1-99)');
      return;
    }

    addToCart(item.id, quantityToAdd)
      .then(() => {
        setQuantity(quantityToAdd);
        setQuantityToAdd(1);
      })
      .catch((error) => {
        setInputError(error.message);
      });
  };

  const updateCartItemQuantity = (quantity: number) => {
    if (quantity < 1 || quantity > 99) {
      setInputError('Please enter a valid quantity (1-99)');
      return;
    }

    updateCartItem(item.id, quantity)
      .then(() => {
        setQuantity(quantity);
        setQuantityToAdd(1);
      })
      .catch((error) => {
        setInputError(error.message);
      });
  };

  const handleRemoveFromCart = () => {
    removeFromCart(item.id)
      .then(() => {
        setQuantity(0);
        setQuantityToAdd(1);
      })
      .catch((error) => {
        setInputError(error.message);
      });
  };

  return (
    <Card shadow="md" padding="lg" radius="md" withBorder style={{ maxWidth: 600 }}>
      <Grid gutter="xl" align="center">
        <Grid.Col span={{ base: 12, sm: 5 }}>
          <Image src={item.image} alt={item.name} radius="md" height={340} fit="contain" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 7 }}>
          <Stack gap="md">
            <Group justify="space-between">
              <Text fw={700} size="xl">
                {item.name}
              </Text>
              <Badge color="blue" size="lg" variant="light" radius="sm">
                ${item.price.toFixed(2)}
              </Badge>
            </Group>
            <Text size="md" c="dimmed">
              {item.description}
            </Text>
            <Divider my="xs" />
            {session && (
              <>
                <Group>
                  {quantity > 0 && (
                    <Button
                      variant="outline"
                      color="red"
                      onClick={handleRemoveFromCart}
                      aria-label="Remove from cart"
                    >
                      <IconTrash size={20} />
                    </Button>
                  )}
                  <NumberInput
                    value={quantity > 0 ? quantity : quantityToAdd}
                    onChange={(val) => handleNumberInputChange(Number(val))}
                    min={1}
                    max={99}
                    size="md"
                    style={{ width: 120 }}
                    error={inputError}
                  />
                </Group>
                {quantity <= 0 && (
                  <Button
                    fullWidth
                    radius="md"
                    color="indigo"
                    style={{ fontWeight: 700 }}
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </Button>
                )}
              </>
            )}
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  );
}
