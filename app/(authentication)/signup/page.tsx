'use client';

import { Center } from '@mantine/core';
import SignUpCard from '@/components/Authentication/SignUpCard';

export default function SignUpPage() {
  return (
    <Center style={{ height: '70vh' }}>
      <SignUpCard />
    </Center>
  );
}