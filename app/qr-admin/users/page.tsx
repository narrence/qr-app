import AdminSidebar from "@/components/AdminSidebar";
import UserTable from "@/components/UsersTable";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function QRListPage() {
  const { data } = await supabaseServer
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false});

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">User Management</h1>

        <UserTable data={data || []} />
      </div>
    </div>
  );
}