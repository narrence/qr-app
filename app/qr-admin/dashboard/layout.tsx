"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
// import { supabaseServer } from "@/lib/supabaseServer";
// import { redirect } from "next/navigation";

// export default async function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const {
//     data: { user },
//   } = await supabaseServer.auth.getUser();

//   if (!user) {
//     redirect("/qr-admin"); // 🔥 langsung redirect server
//   }

//   return <>{children}</>;
// }

export default function AdminLayout({ children }: any) {
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/qr-admin");
    }
  };

  return <>{children}</>;
}