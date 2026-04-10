import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function GET(
    req:Request,
    { params }: { params: { slug: string } }
) {
    const { data } = await supabase
        .from("qr_codes")
        .select("original_url")
        .eq("slug", params.slug)
        .single();

    if (!data) {
        return new Response("Not Found", {status: 404});
    }

    redirect(data.original_url);
}