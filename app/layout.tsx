import '@mantine/core/styles.css';
import React from 'react';
import { Metadata } from 'next/types';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { NextAuthProvider } from '../providers/SessionProvider';
import { HeaderMenu } from '@/components/Navbar/HeaderMenu';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { isAdmin } from "@/lib/auth/jwt";

export const metadata: Metadata = {
  title: 'QrShop - This is my title.',
  description:
    'QRShop – Secure, QR-powered shopping with smart access control.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({ children }: { children: any }) {
  const session = await getServerSession(authOptions);
  const jwt = (session as any)?.jwt;
  const isAdminUser = !!jwt && isAdmin(jwt);

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
            <HeaderMenu isAdmin={isAdminUser} />
            {children}
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}