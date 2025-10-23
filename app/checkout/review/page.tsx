'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Divider, Group, Loader, Stack, Text } from '@mantine/core';
import { getCheckout } from '@/lib/shop/order';
import CartPageItem from '@/components/Cart/CartPageItem';
import { useCartPreview } from '@/providers/CartPreviewProvider';
import { OrderType } from '@/types/Order/Order';
import { removeFromCart, updateCartItem } from '@/lib/shop/cart';
import { useRouter } from 'next/navigation';

export default function CheckoutReviewPage() {
  const [checkout, setCheckout] = useState<OrderType | null>(null);
  const [loading, setLoading] = useState(true);
  const { cartPreview, refreshCartPreview } = useCartPreview();
  const router = useRouter();

  useEffect(() => {
    getCheckout()
      .then((order) => {
        if (order === undefined || !order?.address) {
          router.push('/cart');
        }

        setCheckout(order);
      })
      .catch(() => router.push('/cart'))
      .finally(() => setLoading(false));
  }, []);

  // Cart update handlers
  const handleUpdateCart = async (id: number, quantity: number) => {
    await updateCartItem(id, quantity);
    setCheckout(await getCheckout());
    refreshCartPreview();
  };

  const handleItemRemove = async (id: number) => {
    await removeFromCart(id);
    setCheckout(await getCheckout());
    refreshCartPreview();
  };

  const handleContinueToPayment = () => {
    setLoading(true);
    router.push('/checkout/payment');
  }

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
            position: 'relative',
          }}
        >
          {loading ? (
            <Loader color="indigo" />
          ) : checkout?.address ? (
            <Stack gap={4}>
              <Text fw={700} size="md">
                {checkout.address.fullName}
              </Text>
              <Text size="sm" c="dimmed">
                {checkout.address.addressLine1}
                {checkout.address.addressLine2 ? `, ${checkout.address.addressLine2}` : ''}, {checkout.address.city}, {checkout.address.state}, {checkout.address.country}
              </Text>
              <Group gap="xs" mt={2}>
                <Text size="sm">
                  <b>Phone:</b> {checkout.address.phoneNumber}
                </Text>
                <Text size="sm" ml="md">
                  <b>Postal Code:</b> {checkout.address.postalCode}
                </Text>
              </Group>
              {/* Edit link in top right corner */}
              <Text
                size="sm"
                c="indigo.6"
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 16,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
                onClick={() => router.push('/checkout/shipping')}
              >
                Edit
              </Text>
            </Stack>
          ) : null}
        </Card>

        <Divider my="sm" />

        <Text fw={600} size="lg" mt={8} color="indigo.7">
          Items in Your Cart
        </Text>
        {loading ? (
          <Loader color="indigo" />
        ) : Array.isArray(checkout?.items) && checkout.items.length > 0 ? (
          <Stack gap="xs">
            {checkout.items.map((item) => (
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
                ${cartPreview?.subTotal.toFixed(2)}
              </Text>
            </Group>
          </Stack>
        ) : (
          <Text c="dimmed">Your cart is empty.</Text>
        )}

        <Divider my="sm" />

        <Group justify="flex-end" mt="md">
          <Button
              color="indigo"
              radius="md"
              size="lg"
              mt="md"
              style={{ fontWeight: 700 }}
              onClick={handleContinueToPayment}
              loading={loading}
            >
            Proceed to Payment
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
