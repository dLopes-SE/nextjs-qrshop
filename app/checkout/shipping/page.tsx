'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Divider, Radio, Select, Stack, Text, Alert, Loader } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { addAddress, listAddresses } from '@/lib/user/userinfo';
import { Address } from '@/types/User/Address';
import { AddressPayload } from '@/types/User/AddressPayload';
import AddressForm from '@/components/Checkout/AddressForm';

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
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Load addresses on mount
  useEffect(() => {
    setLoading(true);
    listAddresses()
      .then((list) => {
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
      })
      .catch(() => setError('Failed to load addresses'))
      .finally(() => setLoading(false));
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
    setFormError(null);
  };

  // Basic validation for required fields
  const validateForm = () => {
    if (!form.fullName || !form.phoneNumber || !form.addressLine1 || !form.postalCode || !form.city || !form.state || !form.country) {
      setFormError('Please fill in all required fields.');
      return false;
    }
    setFormError(null);
    return true;
  };

  // Add custom address to user's list
  const handleAddAddress = async () => {
    if (!validateForm()) {
      return;
    }
    setAddLoading(true);
    setError(null);
    try {
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
      setFormError(null);
    } catch (err: any) {
      setError('Failed to add address. Please try again.');
    } finally {
      setAddLoading(false);
    }
  };

  const handleFormChange = (field: keyof AddressPayload, value: string) => {
    if (selectedType === 'custom') {
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
        {loading ? (
          <Loader color="indigo" />
        ) : (
          <>
            {error && (
              <Alert icon={<IconAlertCircle size={16} />} color="red" radius="md">
                {error}
              </Alert>
            )}
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
              label="Address Options"
              description="Choose how you want to provide your shipping address"
              size="md"
              color="indigo"
              styles={{
                label: { fontWeight: 700, color: '#3b5bdb', marginBottom: 4 },
                description: { color: '#868e96', fontSize: 14, marginBottom: 8 },
              }}
              mb={8}
            >
              {addresses.length > 0 && (
                <Radio
                  value="list"
                  label={
                    <span>
                      <b>Select from your saved addresses</b>
                      <br />
                      <span style={{ fontSize: 13, color: '#868e96' }}>
                        Use an address you’ve already added to your account.
                      </span>
                    </span>
                  }
                  size="md"
                  styles={{ label: { fontWeight: 500 } }}
                />
              )}
              <Radio
                value="custom"
                label={
                  <span>
                    <b>Enter a custom address</b>
                    <br />
                    <span style={{ fontSize: 13, color: '#868e96' }}>
                      Fill in a new address for this order.
                    </span>
                  </span>
                }
                size="md"
                styles={{ label: { fontWeight: 500 } }}
              />
            </Radio.Group>
            {selectedType === 'list' && addresses.length > 0 && (
              <Stack gap="xs">
                <Select
                  label="Select Address"
                  placeholder="Choose an address"
                  data={addresses.map((addr) => ({
                    value: addr.id.toString(),
                    label: `${addr.fullName}, ${addr.addressLine1}, ${addr.city}`,
                  }))}
                  value={selectedId}
                  onChange={handleSelect}
                  radius="md"
                  size="md"
                  styles={{
                    input: { fontWeight: 500, backgroundColor: '#f8fafc' },
                    label: { fontWeight: 700, color: '#3b5bdb' },
                  }}
                  mb={8}
                />
                <Text size="xs" c="dimmed" mt={-4} mb={4}>
                  Select your preferred address or add a new one below.
                </Text>
              </Stack>
            )}
            <AddressForm form={form} onChange={handleFormChange} readOnly={selectedType === 'list'} />
            {selectedType === 'custom' && (
              <Stack gap="xs">
                {formError && (
                  <Alert icon={<IconAlertCircle size={16} />} color="red" radius="md">
                    {formError}
                  </Alert>
                )}
                <Button
                  color="gray"
                  radius="md"
                  size="md"
                  mt="md"
                  onClick={handleAddAddress}
                  loading={addLoading}
                  disabled={addresses.length >= 3}
                  style={{
                    fontWeight: 700,
                    border: '1px solid #ced4da',
                    backgroundColor: '#f8fafc',
                    color: '#343a40',
                  }}
                  leftSection={<IconAlertCircle size={18} />}
                >
                  Add this address to my list
                </Button>
              </Stack>
            )}
            <Button
              color="indigo"
              radius="md"
              size="lg"
              mt="md"
              style={{ fontWeight: 700 }}
            >
              Continue to Review
            </Button>
          </>
        )}
      </Stack>
    </Card>
  );
}
