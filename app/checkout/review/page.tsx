'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Divider, Group, Loader, Stack, Text } from '@mantine/core';
import { getCart, removeFromCart, updateCartItem } from '@/lib/shop/cart';
import { CartType } from '@/types/Cart/Cart';
import { listAddresses } from '@/lib/user/userinfo';
import { Address } from '@/types/User/Address';
import CartPageItem from '@/components/Cart/CartPageItem';
import { useCartPreview } from '@/providers/CartPreviewProvider';

export default function CheckoutReviewPage() {
  const [cart, setCart] = useState<CartType | null>(null);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState<Address | null>(null);
  const [addressLoading, setAddressLoading] = useState(true);
  const { refreshCartPreview } = useCartPreview();

  useEffect(() => {
    getCart()
      .then((data) => {
        setCart(data);
      })
      .finally(() => setLoading(false));

    listAddresses()
      .then((addresses) => {
        setAddress(addresses[0] ?? null);
      })
      .finally(() => setAddressLoading(false));
  }, []);

  // Cart update handlers
  const handleUpdateCart = async (id: number, quantity: number) => {
    await updateCartItem(id, quantity);
    const res = await getCart();
    setCart(res);
    refreshCartPreview();
  };

  const handleItemRemove = async (id: number) => {
    await removeFromCart(id);
    const res = await getCart();
    setCart(res);
    refreshCartPreview();
  };

  return (
    <Card shadow="md" radius="md" p="xl" withBorder>
      <Stack gap="md">
        <Text fw={700} size="xl" color="indigo.7">
          Review Your Order
        </Text>
        <Divider />

        <Group align="center" gap={8} mt={8}>
          <Text fw={600} size="lg">
            Shipping Information
          </Text>
        </Group>
        <Card
          shadow="xs"
          radius="md"
          p="md"
          withBorder
          style={{
            background: 'linear-gradient(90deg, #f8fafc 60%, #e7f5ff 100%)',
            borderColor: '#3b5bdb22',
          }}
        >
          {addressLoading ? (
            <Loader color="indigo" />
          ) : address ? (
            <Stack gap={4}>
              <Text fw={700} size="md">
                {address.fullName}
              </Text>
              <Text size="sm" c="dimmed">
                {address.addressLine1}
                {address.addressLine2 ? `, ${address.addressLine2}` : ''}, {address.city}, {address.state}, {address.country}
              </Text>
              <Group gap="xs" mt={2}>
                <Text size="sm">
                  <b>Phone:</b> {address.phoneNumber}
                </Text>
                <Text size="sm" ml="md">
                  <b>Postal Code:</b> {address.postalCode}
                </Text>
              </Group>
            </Stack>
          ) : (
            <Text c="dimmed">No shipping address found.</Text>
          )}
        </Card>

        <Divider my="sm" />

        <Text fw={600} size="lg" mt={8} color="indigo.7">
          Items in Your Cart
        </Text>
        {loading ? (
          <Loader color="indigo" />
        ) : cart && cart.items.length > 0 ? (
          <Stack gap="xs">
            {cart.items.map((item) => (
              <CartPageItem
                key={item.id}
                item={item}
                onItemRemove={handleItemRemove}
                onUpdateCart={handleUpdateCart}
              />
            ))}

            <Group justify="space-between">
              <Text fw={700}>Subtotal</Text>
              <Text fw={700} color="orange.6">
                ${cart.subTotal.toFixed(2)}
              </Text>
            </Group>
          </Stack>
        ) : (
          <Text c="dimmed">Your cart is empty.</Text>
        )}

        <Divider my="sm" />

        <Group justify="flex-end" mt="md">
          <Button color="indigo" radius="md" size="md">
            Proceed to Payment
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
