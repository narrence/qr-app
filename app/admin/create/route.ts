import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  const { data, error } = await supabaseServer.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }

  // update profile
  await supabaseServer.from("profiles").update({
    name,
  }).eq("id", data.user.id);

  return Response.json({ success: true });
}