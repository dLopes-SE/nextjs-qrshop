'use client';

import { ActionIcon, Menu, Text, Divider, Button, Stack } from '@mantine/core';
import { useState } from 'react';
import CartMenuItem from './CartMenuItem';

// Mocked cart items
const mockedCartItems = [
  {
    id: 1,
    image: "https://via.placeholder.com/32x32?text=Mouse",
    qty: 2,
    price: 19.99,
  },
  {
    id: 2,
    image: "https://via.placeholder.com/32x32?text=Headphones",
    qty: 1,
    price: 49.99,
  },
  {
    id: 3,
    image: "https://via.placeholder.com/32x32?text=Cable",
    qty: 3,
    price: 5.99,
  },
];

const CartIcon = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

export default function CartMenu() {
  const [cartItems] = useState(mockedCartItems);

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
          {/* Subtotal section on top, no background */}
          <Stack align="center" gap={2} mt={10} mb={2}>
            <Text fw={700} size="sm" color="indigo.7">Subtotal</Text>
            <Text fw={700} size="lg" color="orange.6">${subtotal.toFixed(2)}</Text>
          </Stack>
          <Divider my="xs" />
          {cartItems.length === 0 ? (
            <Text size="sm" c="dimmed" ta="center">Your cart is empty.</Text>
          ) : (
            <>
              {cartItems.slice(0, 5).map((item, idx, arr) => (
                <CartMenuItem
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  qty={item.qty}
                  price={item.price}
                  showDivider={idx < arr.length - 1}
                />
              ))}
              {cartItems.length > 5 && (
                <Text size="xs" mt="xs" c="dimmed" ta="center">...and more</Text>
              )}
            </>
          )}
          <Divider mt="xs" />
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