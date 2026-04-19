import Link from "next/link";

export default function AdminSidebar() {
  return (
    <div className="w-64 h-screen bg-[#0f172a] text-white p-5">
      <h1 className="font-bold text-lg mb-6">QR Admin</h1>

      <nav className="space-y-3">
        <Link href="/qr-admin/app" className="block">
          QR List
        </Link>

        <Link href="/qr-admin/app/users" className="block">
          Admin Users
        </Link>
      </nav>
    </div>
  );
}