'use client';

import { Stepper } from '@mantine/core';
import { usePathname } from 'next/navigation';

const steps = [
  { label: 'Shipping Info', route: '/checkout/shipping' },
  { label: 'Review & Confirm', route: '/checkout/review' },
  { label: 'Payment', route: '/checkout/payment' },
];

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Determine active step based on current route
  const activeStep = steps.findIndex(step => pathname.startsWith(step.route));
  
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 0' }}>
      <Stepper active={activeStep >= 0 ? activeStep : 0} mb="xl">
        {steps.map((step, idx) => (
          <Stepper.Step key={step.label} label={step.label} />
        ))}
      </Stepper>
      <div>
        {children}
      </div>
    </div>
  );
}