"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import {
  ActionIcon,
  Anchor,
  Button,
  Center,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { useForm } from '@mantine/form';

export default function SignupCard() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      name: (value) => (value.trim().length > 0 ? null : 'Name is required'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters'),
      confirmPassword: (value, values) =>
        value === values.password ? null : 'Passwords do not match',
    },
  });

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (values: { name: string; email: string; password: string }) => {
    axios
      .post('/api/auth/signup', {
        email: values.email,
        password: values.password,
        name: values.name
      })
      .then(() => {
        // TODO DYLAN: Instead of signing in immediatly after signup, redirect to a confirmation page
        // and then sign in after the user confirms their email.
        signIn('credentials', {
          email: values.email,
          password: values.password,
          callbackUrl: '/',
        }).then(() => {
          router.push('/');
        });
      })
      .catch((error) => {
        console.error('Signup error:', error);
        if (axios.isAxiosError(error) && error.response) {
          setError(error.response.data.message || 'Signup failed');
        } else {
          setError('An unexpected error occurred.');
        }
      });
  };

  return (
    <Center h="100vh">
      <Paper withBorder shadow="md" radius="md" p="xl" w={380}>
        <Stack gap="lg" align="center">
          <Text
            component="h2"
            size="h2"
            ta="center"
            variant="gradient"
            gradient={{ from: 'pink', to: 'blue' }}
            fw={700}
          >
            Create your{' '}
            <Text span inherit>
              QrShop
            </Text>{' '}
            account
          </Text>
          <Text size="sm" c="dimmed" ta="center">
            Sign up to get started!
          </Text>

          <form onSubmit={form.onSubmit(handleSignup)} style={{ width: '100%' }}>
            <Stack>
              <TextInput
                label="Name"
                placeholder="Your name"
                {...form.getInputProps('name')}
                radius="md"
              />
              <TextInput
                label="Email"
                placeholder="you@example.com"
                {...form.getInputProps('email')}
                radius="md"
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                {...form.getInputProps('password')}
                radius="md"
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="Repeat your password"
                {...form.getInputProps('confirmPassword')}
                radius="md"
              />
              {error && (
                <Text size="xs" c="red">
                  {error}
                </Text>
              )}
              <Group justify="space-between" mt="xs">
                <Anchor href="/login" size="xs" c="dimmed">
                  Already have an account? Log in
                </Anchor>
              </Group>
              <Button
                type="submit"
                fullWidth
                radius="xl"
                mt="md"
                variant="gradient"
                gradient={{ from: 'pink', to: 'blue' }}
              >
                Sign up
              </Button>
            </Stack>
          </form>

          <Text size="xs" c="dimmed" mt="sm">
            or sign up with
          </Text>

          <Group gap="lg">
            <Tooltip label="Sign up with Google">
              <ActionIcon
                size="lg"
                variant="gradient"
                gradient={{ from: 'pink', to: 'blue' }}
                radius="xl"
                onClick={() => signIn('google', { callbackUrl: '/' })}
              >
                <IconBrandGoogle size={20} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Sign up with Facebook">
              <ActionIcon
                size="lg"
                variant="gradient"
                gradient={{ from: 'pink', to: 'blue' }}
                radius="xl"
                onClick={() => signIn('facebook', { callbackUrl: '/' })}
              >
                <IconBrandFacebook size={20} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Stack>
      </Paper>
    </Center>
  );
}
