"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";


export default function AdminSidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();

    router.push("/qr-admin");
    router.refresh();

    toast.success("Logged Out!")
  }
  
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
        
        <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </nav>
    </div>
  );
}