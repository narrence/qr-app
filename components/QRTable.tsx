"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Download } from "lucide-react";

type QRItem = {
  id: string;
  name: string;
  slug: string;
  original_url: string;
  type: "static" | "dynamic";
  scans: number;
  is_active: boolean;
};

export default function QRTable({ data }: { data: QRItem[] }) {
  const [qrMap, setQrMap] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    generateQR();
  }, [data]);

  const generateQR = async () => {
    const map: { [key: string]: string } = {};

    for (const item of data) {
      const value =
        item.type === "dynamic"
          ? `${window.location.origin}/q/${item.slug}`
          : item.original_url;

      const qr = await QRCode.toDataURL(value, { width: 200 });
      map[item.id] = qr;
    }

    setQrMap(map);
  };

  const downloadPNG = (item: QRItem) => {
    const link = document.createElement("a");
    link.href = qrMap[item.id];
    link.download = `${item.name}.png`;
    link.click();
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full text-sm">

        {/* HEADER */}
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-3 text-left">QR</th>
            <th className="p-3 text-left">Nama QR</th>
            <th className="p-3 text-left">Link</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Scans</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t hover:bg-gray-50">

              {/* QR */}
              <td className="p-3">
                {qrMap[item.id] ? (
                  <img
                    src={qrMap[item.id]}
                    className="w-12 h-12 rounded"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 animate-pulse rounded" />
                )}
              </td>

              {/* NAME */}
              <td className="p-3 font-medium">
                {item.name}
              </td>

              {/* LINK */}
              <td className="p-3 text-gray-500 truncate max-w-[200px]">
                {item.original_url}
              </td>

              {/* TYPE */}
              <td className="p-3 capitalize">
                {item.type}
              </td>

              {/* SCANS */}
              <td className="p-3">
                {item.scans}
              </td>

              {/* STATUS */}
              <td className="p-3">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    item.is_active
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {item.is_active ? "Active" : "Inactive"}
                </span>
              </td>

              {/* ACTION */}
              <td className="p-3">
                <button
                  onClick={() => downloadPNG(item)}
                  className="flex items-center gap-1 text-blue-500 hover:underline"
                >
                  <Download size={14} />
                  Download
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* EMPTY STATE */}
      {data.length === 0 && (
        <p className="p-4 text-gray-500 text-center">
          Belum ada QR
        </p>
      )}
    </div>
  );
}