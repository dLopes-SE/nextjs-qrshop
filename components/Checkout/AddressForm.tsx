import { TextInput } from '@mantine/core';
import { AddressPayload } from '@/types/User/AddressPayload';

interface AddressFormProps {
  form: AddressPayload;
  onChange: (field: keyof AddressPayload, value: string) => void;
  readOnly?: boolean;
}

export default function AddressForm({ form, onChange, readOnly = false }: AddressFormProps) {
  const inputStyle = readOnly ? { input: { backgroundColor: '#f1f3f5' } } : {};
  return (
    <>
      <TextInput
        label="Full Name"
        value={form.fullName}
        onChange={(e) => onChange('fullName', e.currentTarget.value)}
        readOnly={readOnly}
        styles={inputStyle}
      />
      <TextInput
        label="Phone Number"
        value={form.phoneNumber}
        onChange={(e) => onChange('phoneNumber', e.currentTarget.value)}
        readOnly={readOnly}
        styles={inputStyle}
      />
      <TextInput
        label="Address Line 1"
        value={form.addressLine1}
        onChange={(e) => onChange('addressLine1', e.currentTarget.value)}
        readOnly={readOnly}
        styles={inputStyle}
      />
      <TextInput
        label="Address Line 2"
        value={form.addressLine2}
        onChange={(e) => onChange('addressLine2', e.currentTarget.value)}
        readOnly={readOnly}
        styles={inputStyle}
      />
      <TextInput
        label="Postal Code"
        value={form.postalCode}
        onChange={(e) => onChange('postalCode', e.currentTarget.value)}
        readOnly={readOnly}
        styles={inputStyle}
      />
      <TextInput
        label="City"
        value={form.city}
        onChange={(e) => onChange('city', e.currentTarget.value)}
        readOnly={readOnly}
        styles={inputStyle}
      />
      <TextInput
        label="State"
        value={form.state}
        onChange={(e) => onChange('state', e.currentTarget.value)}
        readOnly={readOnly}
        styles={inputStyle}
      />
      <TextInput
        label="Country"
        value={form.country}
        onChange={(e) => onChange('country', e.currentTarget.value)}
        readOnly={readOnly}
        styles={inputStyle}
      />
    </>
  );
}
