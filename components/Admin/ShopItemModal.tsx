"use client";

import { getItem } from "@/lib/shop/items";
import {
  Modal,
  Image,
  Stack,
  Checkbox,
  Group,
  Loader,
  TextInput,
  Textarea,
  NumberInput,
  Button,
  rem,
  FileInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { ShopItem } from "@/types/ShopItem";

interface ShopItemModalProps {
  mode: "view" | "create";
  itemId?: string | number | null;
  opened: boolean;
  onClose: () => void;
  onCreate?: (item: Omit<ShopItem, "id">) => void;
}

export default function ShopItemModal({
  mode,
  itemId,
  opened,
  onClose,
  onCreate,
}: ShopItemModalProps) {
  const [item, setItem] = useState<ShopItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Form state for create mode
  const [form, setForm] = useState<Omit<ShopItem, "id">>({
    name: "",
    slogan: "",
    description: "",
    price: 0,
    image: "",
    category: "",
    isFeaturedItem: false,
  });

  useEffect(() => {
    if (mode === "view" && opened && itemId) {
      setLoading(true);
      getItem(itemId)
        .then((data) => setItem(data))
        .finally(() => setLoading(false));
    } else if (mode === "create") {
      setForm({
        name: "",
        slogan: "",
        description: "",
        price: 0,
        image: "",
        category: "",
        isFeaturedItem: false,
      });
      setItem(null);
      setImagePreview(null);
    } else {
      setItem(null);
      setImagePreview(null);
    }
  }, [opened, itemId, mode]);

  const isView = mode === "view";
  const current = isView ? item : form;

  const handleChange = (field: keyof typeof form, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Handle image file input and preview
  const handleImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        setForm((prev) => ({
          ...prev,
          image: e.target?.result as string, // Store base64 string or handle as needed
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setForm((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleCreate = () => {
    if (onCreate) {
      onCreate(form);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isView ? "Item Details" : "Add New Item"}
      size="lg"
      centered
    >
      {isView && loading ? (
        <Group justify="center" py="xl">
          <Loader />
        </Group>
      ) : current ? (
        <Stack gap="md">
          {/* Image input or preview */}
          {isView ? (
            <Image
              src={current.image}
              alt={current.name}
              height={180}
              fit="contain"
              radius="md"
              style={{
                maxWidth: rem(320),
                margin: "0 auto",
                display: "block",
              }}
            />
          ) : (
            <>
              <FileInput
                label="Image"
                accept="image/*"
                value={null}
                onChange={handleImageChange}
                placeholder="Upload image"
                variant="unstyled"
                style={{ background: "none", border: "none" }}
              />
              {imagePreview && (
                <Image
                  src={imagePreview}
                  alt={form.name}
                  height={120}
                  fit="contain"
                  radius="md"
                  style={{
                    maxWidth: rem(320),
                    margin: "0 auto",
                    display: "block",
                  }}
                />
              )}
            </>
          )}
          <TextInput
            label="Name"
            value={current.name}
            readOnly={isView}
            variant={isView ? "filled" : "default"}
            onChange={
              isView
                ? undefined
                : (e) => handleChange("name", e.target.value)
            }
          />
          <TextInput
            label="Slogan"
            value={current.slogan}
            readOnly={isView}
            variant={isView ? "filled" : "default"}
            onChange={
              isView
                ? undefined
                : (e) => handleChange("slogan", e.target.value)
            }
          />
          <Textarea
            label="Description"
            value={current.description}
            readOnly={isView}
            autosize
            minRows={2}
            variant={isView ? "filled" : "default"}
            onChange={
              isView
                ? undefined
                : (e) => handleChange("description", e.target.value)
            }
          />
          <NumberInput
            label="Price"
            value={current.price}
            readOnly={isView}
            hideControls
            variant={isView ? "filled" : "default"}
            prefix="$"
            onChange={
              isView
                ? undefined
                : (value) => handleChange("price", value ?? 0)
            }
          />
          <Checkbox
            label="Featured Item"
            checked={!!current.isFeaturedItem}
            readOnly={isView}
            disabled={isView}
            onChange={
              isView
                ? undefined
                : (e) => handleChange("isFeaturedItem", e.currentTarget.checked)
            }
          />
          <Group justify="end" mt="md">
            {!isView && (
              <Button
                color="teal"
                variant="filled"
                onClick={handleCreate}
              >
                Create
              </Button>
            )}
            <Button
              onClick={onClose}
              style={{ backgroundColor: "#228be6", color: "#fff" }}
              variant="filled"
            >
              Close
            </Button>
          </Group>
        </Stack>
      ) : (
        <Group justify="center" py="xl">
          <span style={{ color: "#888" }}>No item selected.</span>
        </Group>
      )}
    </Modal>
  );
}