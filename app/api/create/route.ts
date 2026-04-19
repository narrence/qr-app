import { supabase } from "@/lib/supabase";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
    try {
        const { url, name, type } = await req.json();

        const slug = nanoid(6);

        const { error } = await supabase.from("qr_codes").insert({
            name,
            slug,
            original_url: url,
            type,
            scans: 0,
            is_active: true,
        });

        if (error) {
            console.error(error);
            return new Response(JSON.stringify(error), {status: 500});
        }

        return Response.json({ slug });
    }   catch (err) {
        console.error(err);
        return new Response("Server Error", { status: 500});
    }
}