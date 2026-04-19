"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminSidebar from "@/components/AdminSidebar";
import QRTable from "@/components/QRTable";

export default function QRListPage() {
  type QRItem = {
      id: string;
      name: string;
      slug: string;
      original_url: string;
      type: "static" | "dynamic";
      scans: number;
      is_active: boolean;
  };
  
  const [data, setData] = useState<QRItem[]>([]);

  useEffect(() => {
    fetchQR();
  }, []);

  const fetchQR = async () => {
    const { data } = await supabase
      .from("qr_codes")
      .select("*")
      .order("created_at", { ascending: false });

    setData(data || []);
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">QR List</h1>

        <QRTable data={data} />
      </div>
    </div>
  );
}