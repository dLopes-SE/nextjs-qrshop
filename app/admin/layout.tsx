import { ReactNode } from 'react';
import AdminNavbar from '@/components/Navbar/AdminNavbar';
import { isUserAdminSS } from '@/lib/user/userinfo';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const isAdmin = await isUserAdminSS();
  if (!isAdmin)
  {
    redirect('/');
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminNavbar />
      <main style={{ flex: 1, padding: '2rem' }}>{children}</main>
    </div>
  );
}
