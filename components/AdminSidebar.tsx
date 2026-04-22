"use client";

import Link from "next/link";

export default function AdminSidebar() {
  return (
    <div className="w-64 h-screen bg-[#0f172a] text-white p-5">
      <h1 className="font-bold text-lg mb-6">Nadi QR</h1>

      <nav className="space-y-3">
        <Link href="/qr-admin/dashboard" className="block">
          Dashboard
        </Link>
        
        <Link href="/qr-admin/lists" className="block">
          Lists
        </Link>

        <Link href="/qr-admin/users" className="block">
          Users
        </Link>
      </nav>
    </div>
  );
}