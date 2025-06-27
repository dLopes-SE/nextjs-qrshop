"use client";

import {
  Card,
  Image,
  Text,
  Group,
  Button,
  ActionIcon,
  Badge,
  Stack,
  rem,
} from "@mantine/core";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import { ShopItem } from "@/types/ShopItem";
import { useState, useMemo } from "react";

interface ShopCardProps {
  item: ShopItem;
}

export default function ShopCard({ item }: ShopCardProps) {
  const [count, setCount] = useState<number>(1);

  const handleDecrease = () => setCount((c) => Math.max(1, c - 1));
  const handleIncrease = () => setCount((c) => c + 1);

  // Price is generated only once per card
  const price = useMemo(() => (Math.random() * 10 + 20).toFixed(2), []);

  return (
    <Card
      shadow="lg"
      padding="md"
      radius="lg"
      withBorder
      style={{
        width: "100%",
        maxWidth: 340,
        minWidth: 240,
        minHeight: 420,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)",
        boxSizing: "border-box",
      }}
    >
      <Card.Section>
        <Image
          src={item.image}
          alt={item.name}
          height={200}
          fit="cover"
          radius="md"
          style={{ borderBottom: "2px solid #e0e7ff" }}
        />
      </Card.Section>

      <Stack gap={4} mt="md">
        <Group justify="space-between" align="center">
          <Text fw={700} size="lg" style={{ wordBreak: "break-word" }}>
            {item.name}
          </Text>
          <Badge color="blue" size="lg" variant="light" radius="sm">
            ${price}
          </Badge>
        </Group>
        <Text size="sm" c="dimmed" lineClamp={2}>
          {item.slogan}
        </Text>
      </Stack>

      <Group mt="md" justify="space-between" align="center" wrap="nowrap">
        <Group wrap="nowrap">
          <ActionIcon
            variant="light"
            onClick={handleDecrease}
            aria-label="Decrease quantity"
            size={36}
            radius="xl"
          >
            <IconMinus size={20} />
          </ActionIcon>
          <Text
            fw={600}
            size="lg"
            mx={rem(8)}
            style={{
              minWidth: 32, // Increased for double digits
              textAlign: "center",
              display: "inline-block",
            }}
          >
            {count}
          </Text>
          <ActionIcon
            variant="light"
            onClick={handleIncrease}
            aria-label="Increase quantity"
            size={36}
            radius="xl"
          >
            <IconPlus size={20} />
          </ActionIcon>
        </Group>
        <Button
          radius="xl"
          color="indigo"
          size="md"
          px="lg"
          style={{
            minWidth: 150, // Ensures button width is stable for up to 3 digits
            textAlign: "center",
          }}
        >
          {`Add ${count} to cart`}
        </Button>
      </Group>
    </Card>
  );
}