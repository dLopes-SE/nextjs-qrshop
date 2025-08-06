'use client';

import { useEffect, useState } from 'react';
import { Center, Stack, Text, Divider, Button, Group, Paper, Loader, Grid, Box } from '@mantine/core';
import CartPageItem from '@/components/Cart/CartPageItem';
import { getCart, updateCartItem } from '@/lib/shop/cart';
import type { CartMenuItemWithDetails } from '@/types/CartMenuItemWithDetails';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartMenuItemWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [subTotal, setSubTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    getCart()
      .then(res => {
        setCartItems(res.items || []);
        setSubTotal(res.subTotal || 0);
        setTotalItems(res.quantity || 0);
      })
      .catch(() => {
        setCartItems([]);
        setTotalItems(0);
      })
      .finally(() => setLoading(false));
  }, []);

  // Handler for updating cart item quantity
  const onUpdateCart = async (quantity: number) => {
    setTotalItems(quantity);
  };

  if (loading) {
    return (
      <Center h="80vh">
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <Center py="xl">
      <Paper shadow="md" radius="md" p="xl" style={{ minWidth: 350, maxWidth: 900, width: "100%" }}>
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="md" style={{ width: '100%' }}>
              <Text fw={700} size="xl" ta="left" color="indigo.7">
                Your Cart
              </Text>
              <Divider my="xs" />
              {cartItems.length === 0 ? (
                <Text size="md" c="dimmed" ta="center">
                  Your cart is empty.
                </Text>
              ) : (
                cartItems.map((item) => (
                  <CartPageItem key={item.id} item={item} onUpdateQuantity={onUpdateCart} />
                ))
              )}
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Box
              style={{
                position: 'sticky',
                top: 32,
                background: '#fff',
                borderRadius: 12,
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                padding: 24,
                minWidth: 220,
              }}
            >
              <Stack gap="md">
                <Text fw={700} size="lg" color="indigo.7" ta="center">
                  Order Summary
                </Text>
                <Divider my="xs" />
                <Group justify="space-between">
                  <Text size="md" c="gray.7">
                    Items
                  </Text>
                  <Text size="md" fw={600}>
                    {totalItems}
                  </Text>
                </Group>
                <Group justify="space-between">
                  <Text fw={700} size="lg" color="orange.6">
                    Subtotal
                  </Text>
                  <Text fw={700} size="lg" color="orange.6">
                    ${subTotal.toFixed(2)}
                  </Text>
                </Group>
                <Button
                  fullWidth
                  radius="md"
                  color="indigo"
                  style={{ fontWeight: 700, marginTop: 16 }}
                  size="lg"
                  disabled={cartItems.length === 0}
                >
                  Checkout
                </Button>
              </Stack>
            </Box>
          </Grid.Col>
        </Grid>
      </Paper>
    </Center>
  );
}
