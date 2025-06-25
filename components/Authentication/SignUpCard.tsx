import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react';
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
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters'),
      confirmPassword: (value, values) =>
        value === values.password ? null : 'Passwords do not match',
    },
  });

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (values: { email: string; password: string }) => {
    // Replace this with your actual signup API call
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email, password: values.password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Signup failed');
        return;
      }

      // Optionally, sign in the user after signup
      await signIn('credentials', {
        email: values.email,
        password: values.password,
        callbackUrl: '/',
      });
      router.push('/');
    } catch (err) {
      setError('An unexpected error occurred.');
    }
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