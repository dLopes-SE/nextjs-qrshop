'use client';

import { ActionIcon, Menu, Text, Divider, Button, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import CartMenuItem from './CartMenuItem';
import type { CartMenuItem as CartMenuItemType } from '@/types/CartMenuItem';
import axios from '@/lib/axios';

const CartIcon = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

export default function CartMenu() {
  const [cartItems, setCartItems] = useState<CartMenuItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/cart')
      .then(res => {
        setCartItems(res.data || []);
      })
      .catch(() => {
        setCartItems([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <Menu shadow="md" width={300} position="bottom-end">
      <Menu.Target>
        <ActionIcon variant="light" size="lg" radius="xl" color="indigo" aria-label="Cart">
          {CartIcon}
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Stack gap="xs">
          <Stack align="center" gap={2} mt={10} mb={2}>
            <Text fw={700} size="sm" color="indigo.7">Subtotal</Text>
            <Text fw={700} size="lg" color="orange.6">${subtotal.toFixed(2)}</Text>
          </Stack>
          <Divider my="xs" />
          {loading ? (
            <Text size="sm" c="dimmed" ta="center">Loading...</Text>
          ) : cartItems.length === 0 ? (
            <Text size="sm" c="dimmed" ta="center">Your cart is empty.</Text>
          ) : (
            <>
              {cartItems.slice(0, 5).map((item) => (
                <CartMenuItem
                  key={item.id}
                  {...item}
                />
              ))}
              {cartItems.length > 5 && (
                <Text size="xs" mt="xs" c="dimmed" ta="center">...and more</Text>
              )}
            </>
          )}
          <Button
            component="a"
            href="/cart"
            fullWidth
            radius="md"
            variant="light"
            color="indigo"
            style={{ fontWeight: 700 }}
          >
            Go to cart
          </Button>
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
}