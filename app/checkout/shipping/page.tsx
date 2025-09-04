'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Divider, Radio, Select, Stack, Text, TextInput } from '@mantine/core';
import { addAddress, listAddresses } from '@/lib/user/userinfo';
import { Address } from '@/types/User/Address';
import { AddressPayload } from '@/types/User/AddressPayload';

export default function ShippingPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'list' | 'custom'>('list');
  const [_adding, setAdding] = useState(false);
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

  // Load addresses on mount
  useEffect(() => {
    listAddresses().then((list) => {
      setAddresses(list);
      if (list.length) {
        setSelectedType('list');
        const fav = list.find((addr) => addr.isFavourite) || list[0];
        setSelectedId(fav.id.toString());
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
      } else {
        setSelectedType('custom');
        setSelectedId(null);
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
      }
    });
  }, []);

  // Handle address selection from list
  const handleSelect = (id: string | null) => {
    setSelectedId(id);
    setSelectedType('list');
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

  // Handle switching to custom address
  const handleCustom = () => {
    setSelectedType('custom');
    setSelectedId(null);
    setAdding(false);
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
  };

  // Add custom address to user's list
  const handleAddAddress = async () => {
    await addAddress(form, false);
    const list = await listAddresses();
    setAddresses(list);
    // Select the newly added address
    const newAddr = list[list.length - 1];
    setSelectedType('list');
    setSelectedId(newAddr.id.toString());
    setForm({
      fullName: newAddr.fullName,
      phoneNumber: newAddr.phoneNumber,
      addressLine1: newAddr.addressLine1,
      addressLine2: newAddr.addressLine2,
      postalCode: newAddr.postalCode,
      city: newAddr.city,
      state: newAddr.state,
      country: newAddr.country,
    });
  };

  // Safe onChange handler for Mantine TextInput
  const handleInputChange =
    (field: keyof AddressPayload) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (selectedType === 'custom') {
        const value = e?.currentTarget?.value ?? '';
        setForm((f) => ({ ...f, [field]: value }));
      }
    };

  return (
    <Card shadow="md" radius="md" p="xl" withBorder>
      <Stack gap="md">
        <Text fw={700} size="xl" color="indigo.7">
          Shipping Information
        </Text>
        <Divider />
        <Radio.Group
          value={selectedType}
          onChange={(val: string) => {
            if (val === 'list') {
              if (addresses.length) {
                setSelectedType('list');
                const fav = addresses.find((addr) => addr.isFavourite) || addresses[0];
                setSelectedId(fav.id.toString());
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
            } else if (val === 'custom') {
              handleCustom();
            }
          }}
        >
          {addresses.length > 0 && <Radio value="list" label="Select an address from your list" />}
          <Radio value="custom" label="Use a custom address" />
        </Radio.Group>
        {selectedType === 'list' && addresses.length > 0 && (
          <Select
            label="Select Address"
            placeholder="Choose an address"
            data={addresses.map((addr) => ({
              value: addr.id.toString(),
              label: `${addr.fullName}, ${addr.addressLine1}, ${addr.city}`,
            }))}
            value={selectedId}
            onChange={handleSelect}
          />
        )}
        <TextInput
          label="Full Name"
          placeholder="Full name for delivery"
          value={form.fullName}
          onChange={handleInputChange('fullName')}
          readOnly={selectedType === 'list'}
          styles={selectedType === 'list' ? { input: { backgroundColor: '#f1f3f5' } } : {}}
        />
        <TextInput
          label="Phone Number"
          placeholder="Phone number for delivery"
          value={form.phoneNumber}
          onChange={handleInputChange('phoneNumber')}
          readOnly={selectedType === 'list'}
          styles={selectedType === 'list' ? { input: { backgroundColor: '#f1f3f5' } } : {}}
        />
        <TextInput
          label="Address Line 1"
          placeholder="Street address"
          value={form.addressLine1}
          onChange={handleInputChange('addressLine1')}
          readOnly={selectedType === 'list'}
          styles={selectedType === 'list' ? { input: { backgroundColor: '#f1f3f5' } } : {}}
        />
        <TextInput
          label="Address Line 2"
          placeholder="Apartment, suite, etc. (optional)"
          value={form.addressLine2}
          onChange={handleInputChange('addressLine2')}
          readOnly={selectedType === 'list'}
          styles={selectedType === 'list' ? { input: { backgroundColor: '#f1f3f5' } } : {}}
        />
        <TextInput
          label="Postal Code"
          placeholder="Postal code"
          value={form.postalCode}
          onChange={handleInputChange('postalCode')}
          readOnly={selectedType === 'list'}
          styles={selectedType === 'list' ? { input: { backgroundColor: '#f1f3f5' } } : {}}
        />
        <TextInput
          label="City"
          placeholder="City"
          value={form.city}
          onChange={handleInputChange('city')}
          readOnly={selectedType === 'list'}
          styles={selectedType === 'list' ? { input: { backgroundColor: '#f1f3f5' } } : {}}
        />
        <TextInput
          label="State"
          placeholder="State"
          value={form.state}
          onChange={handleInputChange('state')}
          readOnly={selectedType === 'list'}
          styles={selectedType === 'list' ? { input: { backgroundColor: '#f1f3f5' } } : {}}
        />
        <TextInput
          label="Country"
          placeholder="Country"
          value={form.country}
          onChange={handleInputChange('country')}
          readOnly={selectedType === 'list'}
          styles={selectedType === 'list' ? { input: { backgroundColor: '#f1f3f5' } } : {}}
        />
        {selectedType === 'custom' && (
          <Button
            color="indigo"
            radius="md"
            size="lg"
            mt="md"
            onClick={handleAddAddress}
            disabled={addresses.length >= 3}
          >
            Add this address to my list
          </Button>
        )}
        <Button color="indigo" radius="md" size="lg" mt="md">
          Continue to Review
        </Button>
      </Stack>
    </Card>
  );
}
