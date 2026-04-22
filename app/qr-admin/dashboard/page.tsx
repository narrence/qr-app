// import AdminSidebar from "@/components/AdminSidebar";
// import QRTable from "@/components/QRTable";
// import { supabaseServer } from "@/lib/supabaseServer";

// export default async function QRListPage() {
//   const { data } = await supabaseServer
//     .from("qr_codes")
//     .select("*")
//     .order("created_at", { ascending: false});

//   return (
//     <div className="flex">
//       <AdminSidebar />

//       <div className="flex-1 p-6 bg-gray-50">
//         <h1 className="text-2xl font-bold mb-6">QR List</h1>

//         <QRTable data={data || []} />
//       </div>
//     </div>
//   );
// }

import { supabaseServer } from "@/lib/supabaseServer";
import AdminSidebar from "@/components/AdminSidebar";

export default async function DashboardPage() {
  const { data } = await supabaseServer
    .from("qr_codes")
    .select("scans");

  const totalScans =
    data?.reduce((acc, item) => acc + (item.scans || 0), 0) || 0;

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-6 bg-gray-50 space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {/* 🔥 CARD ANALYTICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="bg-white rounded-xl p-5 shadow">
            <p className="text-sm text-gray-500">Total Scan</p>
            <h2 className="text-3xl font-bold mt-2">
              {totalScans}
            </h2>
          </div>

        </div>
      </div>
    </div>
  );
}