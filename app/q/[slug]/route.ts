import { supabase } from "@/lib/supabase";
import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    const { data } = await supabaseServer
        .from("qr_codes")
        .select("original_url")
        .eq("slug", slug)
        .single();

    if (!data) {
        return new Response("Not Found", {status: 404});
    }

    redirect(data.original_url);
}