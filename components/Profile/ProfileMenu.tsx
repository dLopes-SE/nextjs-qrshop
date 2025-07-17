'use client';

import { signOut } from 'next-auth/react';
import { ActionIcon, Menu } from '@mantine/core';
import axios from '@/lib/axios';

// Move ProfileIcon definition outside the component for clarity
const ProfileIcon = (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-3.314 3.134-6 7-6s7 2.686 7 6" />
  </svg>
);

export default function ProfileMenu() {
  const handleLogout = () => {
    axios
      .post('/user/logout')
      .then((response) => {
        if (response.status === 200) {
          signOut({ callbackUrl: '/' });
        } else {
          console.error('Logout failed');
        }
      })
      .catch((error) => {
        console.error('Logout failed', error);
      });
  };

  return (
    <Menu shadow="md" width={180} position="bottom-end">
      <Menu.Target>
        <ActionIcon variant="light" size="lg" radius="xl" color="indigo" aria-label="Profile">
          {ProfileIcon}
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
