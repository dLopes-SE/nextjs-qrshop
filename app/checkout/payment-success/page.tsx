'use client';

import { Button, Center, Paper, Stack, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function PaymentSuccessPage() {
  const router = useRouter();

  return (
    <Center>
      <Paper shadow="md" radius="md" p="xl" withBorder>
        <Stack gap="md" align="center">
          <Text fw={700} size="xl" color="green.7">
            Payment Successful!
          </Text>
          <Text size="md" color="gray.7">
            Thank you for your purchase. Your payment has been processed successfully.
          </Text>
          <Button color="indigo" radius="md" size="md" onClick={() => router.push('/')}>
            Go to Home
          </Button>
        </Stack>
      </Paper>
    </Center>
  );
}