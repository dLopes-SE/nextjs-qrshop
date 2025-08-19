'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Divider, Select, Stack, Text, TextInput } from '@mantine/core';
import { addAddress, listAddresses } from '@/lib/user/userinfo';
import { AddressPayload } from '@/types/User/AddressPayload';

export default function ShippingPage() {
  const [addresses, setAddresses] = useState<AddressPayload[]>([]);
  const [favourite, setFavourite] = useState<AddressPayload | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<AddressPayload>({
    fullName: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    postalCode: '',
    city: '',
    state: '',
    country: '',
  });

  useEffect(() => {
    listAddresses().then((list) => {
      setAddresses(list);
      const fav = list.find((addr) => addr.isFavourite);
      setFavourite(fav || null);
      setSelectedId(fav ? fav.id.toString() : null);
      if (!list.length) {
        setAdding(true);
      } else if (fav) {
        setForm({
          fullName: fav.fullName,
          phoneNumber: fav.phoneNumber,
          addressLine1: fav.addressLine1,
          addressLine2: fav.addressLine2,
          postalCode: fav.postalCode,
          city: fav.city,
          state: fav.state,
          country: fav.country,
        });
      }
    });
  }, []);

  const handleSelect = (id: string | null) => {
    setSelectedId(id);
    setAdding(false);
    const addr = addresses.find((a) => a.id.toString() === id);
    if (addr) {
      setForm({
        fullName: addr.fullName,
        phoneNumber: addr.phoneNumber,
        addressLine1: addr.addressLine1,
        addressLine2: addr.addressLine2,
        postalCode: addr.postalCode,
        city: addr.city,
        state: addr.state,
        country: addr.country,
      });
    }
  };

  const handleAddAddress = async () => {
    await addAddress(form);
    const list = await listAddresses();
    setAddresses(list);
    setAdding(false);
    const fav = list.find((addr) => addr.isFavourite);
    setFavourite(fav || null);
    setSelectedId(fav ? fav.id.toString() : null);
    if (fav) {
      setForm({
        fullName: fav.fullName,
        phoneNumber: fav.phoneNumber,
        addressLine1: fav.addressLine1,
        addressLine2: fav.addressLine2,
        postalCode: fav.postalCode,
        city: fav.city,
        state: fav.state,
        country: fav.country,
      });
    }
  };

  const isReadonly = !adding && !!favourite;

  return (
    <Card shadow="md" radius="md" p="xl" withBorder>
      <Stack gap="md">
        <Text fw={700} size="xl" color="indigo.7">
          Shipping Information
        </Text>
        <Divider />
        {addresses.length > 0 && (
          <Select
            label="Select Address"
            placeholder="Choose an address"
            data={[
              ...addresses.map((addr) => ({
                value: addr.id.toString(),
                label: `${addr.fullName}, ${addr.addressLine1}, ${addr.city}`,
              })),
              ...(addresses.length < 3 ? [{ value: 'add', label: 'Add new address' }] : []),
            ]}
            value={adding ? 'add' : selectedId}
            onChange={(val) => {
              if (val === 'add') {
                setAdding(true);
                setForm({
                  fullName: '',
                  phoneNumber: '',
                  addressLine1: '',
                  addressLine2: '',
                  postalCode: '',
                  city: '',
                  state: '',
                  country: '',
                });
              } else {
                handleSelect(val);
              }
            }}
          />
        )}
        <TextInput
          label="Full Name"
          placeholder="Full name for delivery"
          value={form.fullName}
          onChange={(e) => setForm((f) => ({ ...f, fullName: e.currentTarget.value }))}
          readOnly={isReadonly}
          styles={isReadonly ? { input: { backgroundColor: '#f1f3f5' } } : {}}
        />
        <TextInput
          label="Phone Number"
          placeholder="Phone number for delivery"
          value={form.phoneNumber}
          onChange={(e) => setForm((f) => ({ ...f, phoneNumber: e.currentTarget.value }))}
          readOnly={isReadonly}
          styles={isReadonly ? { input: { backgroundColor: '#f1f3f5' } } : {}}
        />
        <TextInput
          label="Address Line 1"
          placeholder="Street address"
          value={form.addressLine1}
          onChange={(e) => setForm((f) => ({ ...f, addressLine1: e.currentTarget.value }))}
          readOnly={isReadonly}
          styles={isReadonly ? { input: { backgroundColor: '#f1f3f5' } } : {}}
        />
        <TextInput
          label="Address Line 2"
          placeholder="Apartment, suite, etc. (optional)"
          value={form.addressLine2}
          onChange={(e) => setForm((f) => ({ ...f, addressLine2: e.currentTarget.value }))}
          readOnly={isReadonly}
          styles={isReadonly ? { input: { backgroundColor: '#f1f3f5' } } : {}}
        />
        <TextInput
          label="Postal Code"
          placeholder="Postal code"
          value={form.postalCode}
          onChange={(e) => setForm((f) => ({ ...f, postalCode: e.currentTarget.value }))}
          readOnly={isReadonly}
          styles={isReadonly ? { input: { backgroundColor: '#f1f3f5' } } : {}}
        />
        <TextInput
          label="City"
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm((f) => ({ ...f, city: e.currentTarget.value }))}
          readOnly={isReadonly}
          styles={isReadonly ? { input: { backgroundColor: '#f1f3f5' } } : {}}
        />
        <TextInput
          label="State"
          placeholder="State"
          value={form.state}
          onChange={(e) => setForm((f) => ({ ...f, state: e.currentTarget.value }))}
          readOnly={isReadonly}
          styles={isReadonly ? { input: { backgroundColor: '#f1f3f5' } } : {}}
        />
        <TextInput
          label="Country"
          placeholder="Country"
          value={form.country}
          onChange={(e) => setForm((f) => ({ ...f, country: e.currentTarget.value }))}
          readOnly={isReadonly}
          styles={isReadonly ? { input: { backgroundColor: '#f1f3f5' } } : {}}
        />
        {adding && (
          <Button
            color="indigo"
            radius="md"
            size="lg"
            mt="md"
            onClick={handleAddAddress}
            disabled={addresses.length >= 3}
          >
            Add Address
          </Button>
        )}
        {!adding && (
          <Button color="indigo" radius="md" size="lg" mt="md">
            Continue to Review
          </Button>
        )}
      </Stack>
    </Card>
  );
}
