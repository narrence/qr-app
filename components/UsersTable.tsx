"use client";

import { Trash2, Pencil } from "lucide-react";

type UserItem = {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at: string;
};

export default function UserTable({ data }: { data: UserItem[] }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full text-sm">

        {/* HEADER */}
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Created</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-50">

              {/* EMAIL */}
              <td className="p-3 font-medium">
                {user.email}
              </td>

              {/* NAME */}
              <td className="p-3 text-gray-600">
                {user.name || "-"}
              </td>

              {/* ROLE */}
              <td className="p-3">
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                  {user.role}
                </span>
              </td>

              {/* CREATED */}
              <td className="p-3 text-gray-500">
                {new Date(user.created_at).toLocaleDateString()}
              </td>

              {/* ACTION */}
              <td className="p-3 flex gap-3">
                <button className="text-blue-500 hover:underline flex items-center gap-1">
                  <Pencil size={14} />
                  Edit
                </button>

                <button className="text-red-500 hover:underline flex items-center gap-1">
                  <Trash2 size={14} />
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* EMPTY */}
      {data.length === 0 && (
        <p className="p-4 text-gray-500 text-center">
          Belum ada user
        </p>
      )}
    </div>
  );
}