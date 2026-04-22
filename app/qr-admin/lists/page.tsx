import AdminSidebar from "@/components/AdminSidebar";
import QRTable from "@/components/QRTable";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function QRListPage() {
  const { data } = await supabaseServer
    .from("qr_codes")
    .select("*")
    .order("created_at", { ascending: false});

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">QR List</h1>

        <QRTable data={data || []} />
      </div>
    </div>
  );
}