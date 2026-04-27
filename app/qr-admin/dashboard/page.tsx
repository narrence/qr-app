import { supabaseServer } from "@/lib/supabaseServer";
import AdminSidebar from "@/components/AdminSidebar";
import ScanChart from "@/components/ScanChart";
// import { group } from "console";

export default async function DashboardPage() {
  const { data: qrData } = await supabaseServer
    .from("qr_codes")
    .select("type,scans");
  
  const { data: scanData } = await supabaseServer
    .from("qr_scans")
    .select("scanned_at")
    .order("scanned_at", {ascending: true});

  const totalScans =
    qrData?.reduce((acc, item) => acc + (item.scans || 0), 0) || 0;

  const totalStatic =
    qrData?.filter(i => i.type === "static").length || 0;
    
  const totalDynamic =
    qrData?.filter(i => i.type === "dynamic").length || 0;

  // GROUP BY DATE
  const grouped: Record<string, number> = {};
  scanData?. forEach((item) => {
    const day = new Date(item.scanned_at).toLocaleDateString("en-CA"); //format YYYY-MM-DD

    if (!grouped[day]) {
      grouped[day] = 0;
    }

    grouped[day]++;
  });

  // CONVERT KE ARRAY (FORMAT CHART)
  const chartData = Object.entries(grouped).map(([day, total]) => ({
    day,
    total,
  }));

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex w-full flex-col gap-6">
        <div className="flex-1 p-6 bg-gray-50 space-y-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          {/* 🔥 CARD ANALYTICS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* TOTAL SCANS */}
            <div className="bg-white rounded-xl p-5 shadow">
              <p className="text-sm text-gray-500">
                Total Scan
              </p>
              <h2 className="text-3xl font-bold mt-2">
                {totalScans}
              </h2>
            </div>

            {/* TOTAL STATIC */}
            <div className="bg-white rounded-xl p-5 shadow">
              <p className="text-sm text-gray-500">
                Total Static
              </p>
              <h2 className="text-3xl font-bold mt-2">
                {totalStatic}
              </h2>
            </div>

            {/* TOTAL DYNAMIC */}
            <div className="bg-white rounded-xl p-5 shadow">
              <p className="text-sm text-gray-500">
                Total Dynamic
              </p>
              <h2 className="text-3xl font-bold mt-2">
                {totalDynamic}
              </h2>
            </div>

            {/* SCAN PER DAY*/}
            <div className="col-span-full bg-white p-5 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-4">
                Scan per Day
              </h2>
              <ScanChart data={chartData} />
            </div>
        </div>
      </div>
      </div>
    </div>
  );
}