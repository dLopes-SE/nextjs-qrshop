'use client';

// import { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';

type Props = {
  children?: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  // const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

  // const toggleColorScheme = (value?: 'light' | 'dark') =>
  //   setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <MantineProvider
      theme={theme}
    >
      {children}
    </MantineProvider>
  );
};