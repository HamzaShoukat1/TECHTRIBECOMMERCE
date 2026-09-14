'use client';

import { usePathname } from "next/navigation";
import CartSidebar from "./Components/CartSideBar";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdmin) return <main className="min-h-screen">{children}</main>;

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <CartSidebar />
      <Footer />
    </>
  );
}