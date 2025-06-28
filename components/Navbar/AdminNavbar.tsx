import { Box, Stack, NavLink, Title, Divider, Group, rem } from "@mantine/core";
import { IconHome, IconBuildingStore, IconUsers, IconChartBar, IconSettings } from "@tabler/icons-react";
import Link from "next/link";

export default function AdminNavbar() {
  return (
    <Box
      component="nav"
      w={240}
      p="md"
      style={{
        background: "linear-gradient(135deg, #e0e7ff 60%, #f8fafc 100%)",
        borderRight: "1px solid #c7d2fe",
        minHeight: "100%",
        boxShadow: "2px 0 8px 0 rgba(80, 112, 255, 0.04)",
      }}
    >
      <Group mb="md" align="center" gap={8}>
        <IconSettings size={28} color="#4f46e5" />
        <Title
          order={3}
          c="indigo.7"
          style={{
            letterSpacing: 2,
            fontWeight: 800,
            fontSize: rem(18),
            textTransform: "uppercase",
            marginLeft: rem(2),
          }}
        >
          Admin Panel
        </Title>
      </Group>
      <Divider mb="md" />
      <Stack gap="xs">
        <NavLink
          component={Link}
          href="/admin"
          label="Home"
          leftSection={<IconHome size={20} />}
          active={typeof window !== "undefined" && window.location.pathname === "/admin"}
          color="indigo"
          style={{ borderRadius: 8 }}
        />
        <NavLink
          component={Link}
          href="/admin/store"
          label="Store Management"
          leftSection={<IconBuildingStore size={20} />}
          color="indigo"
          style={{ borderRadius: 8 }}
        />
        <NavLink
          component={Link}
          href="/admin/users"
          label="Users"
          leftSection={<IconUsers size={20} />}
          color="indigo"
          style={{ borderRadius: 8 }}
        />
        <NavLink
          component={Link}
          href="/admin/sales"
          label="Sales"
          leftSection={<IconChartBar size={20} />}
          color="indigo"
          style={{ borderRadius: 8 }}
        />
      </Stack>
    </Box>
  );
}