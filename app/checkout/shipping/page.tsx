'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconAlertCircle } from '@tabler/icons-react';
import { Alert, Button, Card, Divider, Loader, Radio, Select, Stack, Text } from '@mantine/core';
import AddressForm from '@/components/Checkout/AddressForm';
import { createCheckout, getCheckout, updateCheckout } from '@/lib/shop/order';
import { addAddress, listAddresses } from '@/lib/user/userinfo';
import { OrderType } from '@/types/Order/Order';
import { CheckoutRequest } from '@/types/Shop/CheckoutRequest';
import { Address } from '@/types/User/Address';
import { AddressPayload } from '@/types/User/AddressPayload';

export default function ShippingPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'list' | 'custom'>('list');
  const [_adding, setAdding] = useState(false);
  const [addressForm, setAddressForm] = useState<AddressPayload>({
    fullName: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    postalCode: '',
    city: '',
    state: '',
    country: '',
  });
  const [loading, setLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [checkout, setCheckout] = useState<OrderType | null>(null);

  const router = useRouter();

  // Load addresses and checkout on mount
  useEffect(() => {
    setLoading(true);

    // Fetch addresses and checkout in parallel
    Promise.all([
      listAddresses().catch(() => []),
      getCheckout().catch((err) => {
        // If 404, treat as no checkout
        if (err.message?.includes('404')) {
          return null;
        }
        setError('Failed to get checkout');
        return null;
      }),
    ])
      .then(([addressList, checkoutData]) => {
        setAddresses(addressList);

        if (checkoutData) {
          if (!checkoutData.address)  {
            setError('Checkout data is missing address information.');
            return;
          }
          setCheckout(checkoutData);

          // Prefill address form with checkout address
          setAddressForm({
            fullName: checkoutData.address.fullName,
            phoneNumber: checkoutData.address.phoneNumber,
            addressLine1: checkoutData.address.addressLine1,
            addressLine2: checkoutData.address.addressLine2,
            postalCode: checkoutData.address.postalCode,
            city: checkoutData.address.city,
            state: checkoutData.address.state,
            country: checkoutData.address.country,
          });

          // If checkout has addressId and it's in the list, select it
          if (checkoutData.addressId && addressList.some((a) => a.id === checkoutData.addressId)) {
            setSelectedType('list');
            setSelectedId(checkoutData.addressId.toString());
          } else {
            setSelectedType('custom');
            setSelectedId(null);
          }

          return;
        }
        // No checkout: default to favourite or custom
        if (addressList.length > 0) {
          setSelectedType('list');
          const fav = addressList.find((addr) => addr.isFavourite) || addressList[0];
          setSelectedId(fav.id.toString());
          setAddressForm({
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
          setAddressForm({
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
      .finally(() => setLoading(false));
  }, []);

  // Handle address selection from list
  const handleSelect = (id: string | null) => {
    setSelectedId(id);
    setSelectedType('list');
    setAdding(false);
    const addr = addresses.find((a) => a.id.toString() === id);
    if (addr) {
      setAddressForm({
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
    setFormError(null);
    if (checkout) {
      // Prefill with checkout address if available
      if (!checkout.address) {
        setError('Checkout data is missing address information.');
        return;
      }
      
      setAddressForm({
        fullName: checkout.address.fullName,
        phoneNumber: checkout.address.phoneNumber,
        addressLine1: checkout.address.addressLine1,
        addressLine2: checkout.address.addressLine2,
        postalCode: checkout.address.postalCode,
        city: checkout.address.city,
        state: checkout.address.state,
        country: checkout.address.country,
      });
    } else {
      setAddressForm({
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
  };

  // Basic validation for required fields
  const validateForm = () => {
    if (
      !addressForm.fullName ||
      !addressForm.phoneNumber ||
      !addressForm.addressLine1 ||
      !addressForm.postalCode ||
      !addressForm.city ||
      !addressForm.state ||
      !addressForm.country
    ) {
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
    addAddress(addressForm, false)
      .then(() => listAddresses())
      .then((list) => {
        setAddresses(list);
        const newAddr = list[list.length - 1];
        setSelectedType('list');
        setSelectedId(newAddr.id.toString());
        setAddressForm({
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
      })
      .catch(() => setError('Failed to add address. Please try again.'))
      .finally(() => setAddLoading(false));
  };

  const handleFormChange = (field: keyof AddressPayload, value: string) => {
    if (selectedType === 'custom') {
      setAddressForm((f) => ({ ...f, [field]: value }));
    }
  };

  // Handle order creation or update and redirect
  const handleContinueToReview = () => {
    setOrderLoading(true);
    setError(null);

    const checkoutRequest: CheckoutRequest = {
      addressId: selectedType === 'list' && selectedId ? parseInt(selectedId, 10) : null,
      addressRequest: selectedType === 'custom' ? addressForm : null,
    };

    if (selectedType === 'custom' && !validateForm()) {
      setOrderLoading(false);
      return;
    }

    // If we already have a checkout, update it; otherwise, create new
    const action = checkout ? updateCheckout : createCheckout;

    action(checkoutRequest)
      .then(() => {
        router.push('/checkout/review');
      })
      .catch(() => {
        setError('Failed to save address. Please try again.');
      })
      .finally(() => setOrderLoading(false));
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
                  setSelectedType('list');
                  if (selectedId) {
                    handleSelect(selectedId);
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
            <AddressForm
              form={addressForm}
              onChange={handleFormChange}
              readOnly={selectedType === 'list'}
            />
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
              onClick={handleContinueToReview}
              loading={orderLoading}
            >
              Continue to Review
            </Button>
          </>
        )}
      </Stack>
    </Card>
  );
}
