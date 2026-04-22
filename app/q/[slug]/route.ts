import { supabase } from "@/lib/supabase";
import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    const { data,error } = await supabaseServer
        .from("qr_codes")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error || !data) {
        return new Response("Not Found", {status: 404});
    }
    //Update Scan Count
    await supabaseServer
        .from("qr_codes")
        .update({ scans: (data.scans ||0) + 1 })
        .eq("slug", slug); 

    //redirect
    redirect(data.original_url);
}