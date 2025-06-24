'use client';

import { Center } from '@mantine/core';
import LoginCard from '@/components/Authentication/LoginCard';

export default function LoginPage() {
  return (
    <Center style={{ height: '70vh' }}>
      <LoginCard />
    </Center>
  );
}