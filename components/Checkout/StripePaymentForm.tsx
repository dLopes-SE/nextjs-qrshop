import { useState } from 'react';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { Alert, Button, Loader, Paper, Stack, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';

const ELEMENT_STYLE = {
  base: {
    fontSize: '16px',
    color: '#1a1b1e',
    letterSpacing: '0.025em',
    fontFamily: 'inherit',
    '::placeholder': {
      color: '#adb5bd',
    },
    padding: '12px 16px',
    backgroundColor: '#f8fafc',
    borderRadius: '6px',
    border: '1px solid #ced4da',
  },
  invalid: {
    color: '#fa5252',
    iconColor: '#fa5252',
  },
};

export default function StripePaymentForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements) {
      setError('Stripe is not loaded.');
      return;
    }

    setLoading(true);

    try {
      const cardNumberElement = elements.getElement(CardNumberElement);
      if (!cardNumberElement) {
        setError('Card number element not found.');
        return;
      }

      // Confirm the payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
        },
      });

      if (stripeError) {
        // Redirect to failure page
        router.push('/checkout/payment-failure');
        return;
      }

      // Check the payment intent status
      if (paymentIntent?.status === 'succeeded') {
        // Redirect to success page
        router.push('/checkout/payment-success');
      } else if (paymentIntent?.status === 'requires_action') {
        // 3D Secure / additional authentication required
        setError('Payment requires additional authentication.');
      } else {
        // Other cases (processing, etc.)
        setError('Payment not completed. Please try again.');
        router.push('/checkout/payment-failure');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      router.push('/checkout/payment-failure');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper shadow="xs" radius="md" p="lg" withBorder style={{ background: '#fff' }}>
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <Text
            fw={700}
            size="lg"
            color="indigo.7"
            mb={4}
            style={{
              letterSpacing: 1,
              alignSelf: 'flex-start',
            }}
          >
            Card Details
          </Text>
          <Stack gap="sm">
            <div style={{ padding: '12px 0' }}>
              <Text size="sm" mb={4} fw={700} color="blue.7" style={{ letterSpacing: 0.5 }}>
                Card Number
              </Text>
              <div
                style={{
                  padding: '12px',
                  borderRadius: 8,
                  border: '1px solid #ced4da',
                  background: '#f6f8fa', // subtle light gray
                }}
              >
                <CardNumberElement options={{ style: ELEMENT_STYLE }} />
              </div>
            </div>
            <div style={{ padding: '12px 0' }}>
              <Text size="sm" mb={4} fw={700} color="blue.7" style={{ letterSpacing: 0.5 }}>
                Expiry
              </Text>
              <div
                style={{
                  padding: '12px',
                  borderRadius: 8,
                  border: '1px solid #ced4da',
                  background: '#f6f8fa',
                }}
              >
                <CardExpiryElement options={{ style: ELEMENT_STYLE }} />
              </div>
            </div>
            <div style={{ padding: '12px 0' }}>
              <Text size="sm" mb={4} fw={700} color="blue.7" style={{ letterSpacing: 0.5 }}>
                CVC
              </Text>
              <div
                style={{
                  padding: '12px',
                  borderRadius: 8,
                  border: '1px solid #ced4da',
                  background: '#f6f8fa',
                }}
              >
                <CardCvcElement options={{ style: ELEMENT_STYLE }} />
              </div>
            </div>
          </Stack>
          {error && <Alert color="red">{error}</Alert>}
          <Button
            type="submit"
            color="indigo"
            radius="md"
            size="md"
            loading={loading}
            disabled={!stripe || !elements}
            mt={8}
          >
            {loading ? <Loader size="xs" color="white" /> : 'Pay'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
