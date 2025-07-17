'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  ActionIcon,
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  rem,
  ScrollArea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { createStyles } from '@mantine/styles';
import CartMenu from '../Cart/CartMenu';
import QrshopLogo from '../Logo/QrshopLogo';
import ProfileMenu from '../Profile/ProfileMenu';

const useStyles = createStyles((theme) => ({
  header: {
    background: 'linear-gradient(90deg, #e0e7ff 60%, #f8fafc 100%)',
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    borderBottom: `1px solid ${theme.colors.indigo[2]}`,
    boxShadow: '0 2px 8px 0 rgba(80, 112, 255, 0.04)',
  },
  link: {
    color: theme.colors.indigo[7],
    textDecoration: 'none',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,
    fontWeight: 500,
    fontSize: rem(16),
    transition: 'background 0.2s',
    '&:hover': {
      backgroundColor: theme.colors.indigo[0],
      color: theme.colors.indigo[8],
    },
  },
}));

export function HeaderMenu({ isAdmin = false }: { isAdmin?: boolean }) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { data: session, status } = useSession();
  const { classes } = useStyles();

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <QrshopLogo size={32} />

          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="/" className={classes.link}>
              Home
            </a>
            <a href="/shop" className={classes.link}>
              Shop
            </a>
            <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="#" className={classes.link}>
              Academy
            </a>
            {isAdmin && (
              <a
                href="/admin"
                className={classes.link}
                style={{ fontWeight: 700, color: '#4f46e5' }}
              >
                Admin
              </a>
            )}
          </Group>

          <Group visibleFrom="sm">
            {status === 'loading' ? null : session?.user ? (
              <>
                <CartMenu />
                <ProfileMenu />
              </>
            ) : (
              <>
                <Button component={Link} href="/login" variant="outline" color="indigo" radius="md">
                  Log in
                </Button>
                <Button component={Link} href="/signup" color="indigo" radius="md">
                  Sign up
                </Button>
              </>
            )}
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
        radius="lg"
      >
        <ScrollArea h="100%" mx="-md">
          <Divider my="sm" />

          <a href="/" className={classes.link}>
            Home
          </a>
          <a href="/shop" className={classes.link}>
            Shop
          </a>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>
          {isAdmin && (
            <a href="/admin" className={classes.link} style={{ fontWeight: 700, color: '#4f46e5' }}>
              Admin
            </a>
          )}

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            {status === 'loading' ? null : session?.user ? (
              <>
                <CartMenu />
                <ProfileMenu />
              </>
            ) : (
              <>
                <Button component={Link} href="/login" variant="outline" color="indigo" radius="md">
                  Log in
                </Button>
                <Button component={Link} href="/signup" color="indigo" radius="md">
                  Sign up
                </Button>
              </>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
