'use client';

import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Alert, Card, Divider, Loader, Stack, Text } from '@mantine/core';
import StripePaymentForm from '@/components/Checkout/StripePaymentForm';
import { getCheckout, createPaymentIntent } from '@/lib/shop/order';
import { useCartPreview } from '@/providers/CartPreviewProvider';
import { OrderType } from '@/types/Order/Order';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PaymentPage() {
  const [checkout, setCheckout] = useState<OrderType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const { cartPreview } = useCartPreview();

  useEffect(() => {
    getCheckout()
      .then(async (order) => {
        setCheckout(order);
        // Use the helper to create a PaymentIntent and get the client secret
        const data = await createPaymentIntent(order.id);
        setClientSecret(data);
      })
      .catch(() => setError('Failed to load checkout information.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card shadow="md" radius="md" p="xl" withBorder>
      <Stack gap="md">
        <Text fw={700} size="xl" color="indigo.7">
          Payment
        </Text>
        <Divider />
        {loading ? (
          <Loader color="indigo" />
        ) : error ? (
          <Alert color="red">{error}</Alert>
        ) : checkout ? (
          <>
            <Text size="xl" fw={500}>
              Order Total:{' '}
              <span style={{ color: '#fd7e14' }}>${cartPreview?.subTotal?.toFixed(2)}</span>
            </Text>
            {clientSecret ? (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <StripePaymentForm clientSecret={clientSecret} />
              </Elements>
            ) : (
              <Loader color="indigo" />
            )}
          </>
        ) : (
          <Text c="dimmed">No checkout found.</Text>
        )}
      </Stack>
    </Card>
  );
}
