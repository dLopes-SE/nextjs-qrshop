import '@mantine/core/styles.css';
import React from 'react';
import { Metadata } from 'next/types';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { NextAuthProvider } from '../providers/SessionProvider';
import { HeaderMenu } from '@/components/Navbar/HeaderMenu';
import { CartPreviewProvider } from '@/providers/CartPreviewProvider';
import { isUserAdmin } from '@/lib/user/userinfo';

export const metadata: Metadata = {
  title: 'QrShop - This is my title.',
  description:
    'QRShop – Secure, QR-powered shopping with smart access control.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <NextAuthProvider>
          <ThemeProvider>
            <CartPreviewProvider>
              <HeaderMenu />
              {children}
            </CartPreviewProvider>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}