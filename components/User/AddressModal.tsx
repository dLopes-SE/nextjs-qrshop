"use client";

import { useState } from "react";
import {
  Modal,
  Button,
  TextInput,
  Stack,
  Group,
  Text,
  Checkbox,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { AddressPayload } from "@/types/User/AddressPayload";

interface AddressModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (address: AddressPayload, isFavourite: boolean) => Promise<void>;
  initialAddress?: AddressPayload;
  isEditing: boolean;
  loading?: boolean;
  error?: string | null;
  hasOtherAddresses?: boolean;
}

export default function AddressModal({
  opened,
  onClose,
  onSubmit,
  initialAddress,
  isEditing = false,
  loading = false,
  error = null,
  hasOtherAddresses = false,
}: AddressModalProps) {
  const form = useForm<AddressPayload>({
    initialValues: initialAddress || {
      fullName: "",
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      postalCode: "",
      city: "",
      state: "",
      country: "",
    },
    validate: {
      fullName: (value: string) => (value ? null : "Full name is required"),
      phoneNumber: (value: string) => (value ? null : "Phone number is required"),
      addressLine1: (value: string) => (value ? null : "Address line 1 is required"),
      postalCode: (value: string) => (value ? null : "Postal code is required"),
      city: (value: string) => (value ? null : "City is required"),
      state: (value: string) => (value ? null : "State is required"),
      country: (value: string) => (value ? null : "Country is required"),
    },
  });

  const [localError, setLocalError] = useState<string | null>(null);
  const [isFavourite, setIsFavourite] = useState(false);

  const handleSubmit = async (values: AddressPayload) => {
    setLocalError(null);
    try {
      await onSubmit(values, isFavourite);
      onClose();
      form.reset();
      setIsFavourite(false);
    } catch (err) {
      setLocalError("Failed to save address");
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title={isEditing ? "Edit Address" : "Add New Address"} centered>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Full Name"
            placeholder="John Doe"
            {...form.getInputProps("fullName")}
          />
          <TextInput
            label="Phone Number"
            placeholder="+1 111-111-1111"
            {...form.getInputProps("phoneNumber")}
          />
          <TextInput
            label="Address Line 1"
            placeholder="123 Main St"
            {...form.getInputProps("addressLine1")}
          />
          <TextInput
            label="Address Line 2"
            placeholder="Apt 4B (optional)"
            {...form.getInputProps("addressLine2")}
          />
          <TextInput
            label="Postal Code"
            placeholder="12345"
            {...form.getInputProps("postalCode")}
          />
          <TextInput
            label="City"
            placeholder="New York"
            {...form.getInputProps("city")}
          />
          <TextInput
            label="State"
            placeholder="NY"
            {...form.getInputProps("state")}
          />
          <TextInput
            label="Country"
            placeholder="United States"
            {...form.getInputProps("country")}
          />
          {!isEditing && hasOtherAddresses && (
            <Checkbox
              label="Set as favourite address"
              checked={isFavourite}
              onChange={(e) => setIsFavourite(e.currentTarget.checked)}
            />
          )}
          {(error || localError) && (
            <Text c="red" size="sm">
              {error || localError}
            </Text>
          )}
          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" color="indigo" loading={loading}>
              {isEditing ? "Save Changes" : "Add Address"}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}