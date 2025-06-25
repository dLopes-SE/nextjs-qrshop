"use client";
import { Group, Divider, Box, Button, Burger, Drawer, ScrollArea, ActionIcon } from "@mantine/core";
import { createStyles } from "@mantine/styles";
import QrshopLogo from "../Logo/QrshopLogo";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useSession } from "next-auth/react";

export function HeaderMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { data: session, status } = useSession();

  const useStyles = createStyles((theme) => ({
    header: {
      // Add your header styles here
      backgroundColor: theme.colors.gray[0],
      padding: theme.spacing.md,
    },
    link: {
      // Add your link styles here
      color: theme.colors.blue[7],
      textDecoration: 'none',
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      borderRadius: theme.radius.sm,
      '&:hover': {
        backgroundColor: theme.colors.blue[0],
      },
    },
  }));

  const { classes } = useStyles();

  // SVG Profile Icon
  const ProfileIcon = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-3.314 3.134-6 7-6s7 2.686 7 6" />
    </svg>
  );

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <QrshopLogo size={30} />

          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="/" className={classes.link}>
              Home
            </a>
            <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="#" className={classes.link}>
              Academy
            </a>
          </Group>

          <Group visibleFrom="sm">
            {status === "loading" ? null : session?.user ? (
              <ActionIcon
                variant="light"
                size="lg"
                component={Link}
                href="/profile"
                title="Profile"
                aria-label="Profile"
              >
                {ProfileIcon}
              </ActionIcon>
            ) : (
              <>
                <Button component={Link} href="/login" variant="default">Log in</Button>
                <Button component={Link} href="/signup">Sign up</Button>
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
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            Home
          </a>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            {status === "loading" ? null : session?.user ? (
              <ActionIcon
                variant="light"
                size="lg"
                component={Link}
                href="/profile"
                title="Profile"
                aria-label="Profile"
              >
                {ProfileIcon}
              </ActionIcon>
            ) : (
              <>
                <Button component={Link} href="/login" variant="default">Log in</Button>
                <Button component={Link} href="/signup">Sign up</Button>
              </>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
