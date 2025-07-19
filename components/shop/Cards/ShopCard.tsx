"use client";

import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Stack,
} from "@mantine/core";
import { ShopItem } from "@/types/ShopItem";
import Link from "next/link";

interface ShopCardProps {
  item: ShopItem;
}

export default function ShopCard({ item }: ShopCardProps) {
  return (
    <Card
      shadow="lg"
      padding="md"
      radius="lg"
      withBorder
      component={Link}
      href={`/shop/${item.id}`}
      style={{
        textDecoration: "none",
        width: "100%",
        maxWidth: 320,
        minWidth: 220,
        minHeight: 340,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        background: "linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)",
        boxSizing: "border-box",
        transition: "box-shadow 0.2s, transform 0.2s",
      }}
      className="shop-card"
    >
      <Card.Section>
        <Image
          src={item.image}
          alt={item.name}
          height={180}
          fit="cover"
          radius="md"
          style={{ borderBottom: "2px solid #e0e7ff" }}
        />
      </Card.Section>

      <Stack gap={6} mt="md">
        <Group justify="space-between" align="center">
          <Text fw={700} size="lg" style={{ wordBreak: "break-word" }}>
            {item.name}
          </Text>
          <Badge color="blue" size="lg" variant="light" radius="sm">
            ${item.price}
          </Badge>
        </Group>
        <Text size="sm" c="dimmed" lineClamp={2}>
          {item.slogan}
        </Text>
      </Stack>
    </Card>
  );
}