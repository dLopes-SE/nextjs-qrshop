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

export default function LoginCard() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters'),
    },
  });

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCredentialsLogin = async (values: { email: string; password: string }) => {
    const res = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (res?.error) {
      setError('Invalid credentials. Please try again.');
    } else {
      router.push('/dashboard');
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
            gradient={{ from: 'pink', to: 'yellow' }}
            fw={700}
          >
            Sign in to{' '}
            <Text span inherit>
              ZenSlot
            </Text>
          </Text>
          <Text size="sm" c="dimmed" ta="center">
            Welcome back! Please enter your credentials.
          </Text>

          <form onSubmit={form.onSubmit(handleCredentialsLogin)} style={{ width: '100%' }}>
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
              {error && (
                <Text size="xs" c="red">
                  {error}
                </Text>
              )}
              <Group justify="space-between" mt="xs">
                <Anchor href="#" size="xs" c="dimmed">
                  Forgot password?
                </Anchor>
                <Anchor href="/signup" size="xs" c="dimmed">
                  Don’t have an account? Sign up
                </Anchor>
              </Group>
              <Button
                type="submit"
                fullWidth
                radius="xl"
                mt="md"
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                Login
              </Button>
            </Stack>
          </form>

          <Text size="xs" c="dimmed" mt="sm">
            or sign in with
          </Text>

          <Group gap="lg">
            <Tooltip label="Sign in with Google">
              <ActionIcon
                size="lg"
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
                radius="xl"
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              >
                <IconBrandGoogle size={20} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Sign in with Facebook">
              <ActionIcon
                size="lg"
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
                radius="xl"
                onClick={() => signIn('facebook', { callbackUrl: '/dashboard' })}
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