"use client";

import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Stack,
  rem,
  Box,
} from "@mantine/core";
import { ShopItem } from "@/types/ShopItem";

interface ShopCardProps {
  item: ShopItem;
  isLoggedIn?: boolean;
}

export default function ShopCard({ item }: ShopCardProps) {
  return (
    <Card
      shadow="lg"
      padding="md"
      radius="xl"
      withBorder
      style={{
        width: "100%",
        maxWidth: 340,
        minWidth: 240,
        minHeight: 260,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)",
        boxSizing: "border-box",
        border: "1px solid #e0e7ff",
        transition: "box-shadow 0.2s",
        overflow: "hidden",
      }}
    >
      <Card.Section>
        <Box
          style={{
            position: "relative",
            width: "100%",
            height: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={item.image}
            alt={item.name}
            height={140}
            fit="contain"
            radius="md"
            style={{
              objectFit: "contain",
              background: "transparent",
              maxWidth: "80%",
              maxHeight: "80%",
            }}
          />
          <Badge
            color="indigo"
            size="md"
            variant="filled"
            radius="sm"
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              fontSize: rem(14),
              boxShadow: "0 2px 8px rgba(80,112,255,0.08)",
            }}
          >
            ${item.price}
          </Badge>
        </Box>
      </Card.Section>

      <Stack gap={8} mt="md">
        <Text fw={700} size="lg" style={{ wordBreak: "break-word", color: "#3730a3" }}>
          {item.name}
        </Text>
        <Text size="sm" c="dimmed" lineClamp={2} mt={2}>
          {item.slogan}
        </Text>
      </Stack>
    </Card>
  );
}