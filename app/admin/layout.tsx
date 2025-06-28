import { ReactNode } from "react";
import AdminNavbar from "@/components/Navbar/AdminNavbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { isAdmin } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  const jwt = (session as any)?.jwt;

  if (!jwt || !isAdmin(jwt)) {
    redirect("/");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminNavbar />
      <main style={{ flex: 1, padding: "2rem" }}>
        {children}
      </main>
    </div>
  );
}