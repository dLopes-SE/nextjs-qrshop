'use client';

import { Button, Center, Paper, Stack, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function PaymentFailurePage() {
  const router = useRouter();

  return (
    <Center>
      <Paper shadow="md" radius="md" p="xl" withBorder>
        <Stack gap="md" align="center">
          <Text fw={700} size="xl" color="red.7">
            Payment Failed
          </Text>
          <Text size="md" color="gray.7">
            Unfortunately, your payment could not be processed. Please try again.
          </Text>
          <Button color="indigo" radius="md" size="md" onClick={() => router.push('/checkout/payment')}>
            Try Again
          </Button>
        </Stack>
      </Paper>
    </Center>
  );
}