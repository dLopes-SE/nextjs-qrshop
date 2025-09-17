import { useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { Button, Loader, Alert, Stack, Paper, Text } from '@mantine/core';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements) {
      setError('Stripe is not loaded.');
      return;
    }

    setLoading(true);

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      setError('Card number element not found.');
      setLoading(false);
      return;
    }

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumberElement,
      },
    });

    if (stripeError) {
      setError(stripeError.message || 'Payment failed.');
      setLoading(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      setSuccess(true);
    } else {
      setError('Payment was not successful.');
    }

    setLoading(false);
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
              <div style={{
                padding: '12px',
                borderRadius: 8,
                border: '1px solid #ced4da',
                background: '#f6f8fa' // subtle light gray
              }}>
                <CardNumberElement options={{ style: ELEMENT_STYLE }} />
              </div>
            </div>
            <div style={{ padding: '12px 0' }}>
              <Text size="sm" mb={4} fw={700} color="blue.7" style={{ letterSpacing: 0.5 }}>
                Expiry
              </Text>
              <div style={{
                padding: '12px',
                borderRadius: 8,
                border: '1px solid #ced4da',
                background: '#f6f8fa'
              }}>
                <CardExpiryElement options={{ style: ELEMENT_STYLE }} />
              </div>
            </div>
            <div style={{ padding: '12px 0' }}>
              <Text size="sm" mb={4} fw={700} color="blue.7" style={{ letterSpacing: 0.5 }}>
                CVC
              </Text>
              <div style={{
                padding: '12px',
                borderRadius: 8,
                border: '1px solid #ced4da',
                background: '#f6f8fa'
              }}>
                <CardCvcElement options={{ style: ELEMENT_STYLE }} />
              </div>
            </div>
          </Stack>
          {error && <Alert color="red">{error}</Alert>}
          {success && <Alert color="green">Payment successful!</Alert>}
          <Button
            type="submit"
            color="indigo"
            radius="md"
            size="md"
            loading={loading}
            disabled={!stripe || !elements || success}
            mt={8}
          >
            {loading ? <Loader size="xs" color="white" /> : 'Pay'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}