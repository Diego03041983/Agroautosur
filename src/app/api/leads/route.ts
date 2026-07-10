import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validations";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos", details: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ ok: true, mode: "demo" }, { status: 202 });
  }

  const { error } = await supabase.from("leads").insert({
    ...parsed.data,
    email: parsed.data.email || null,
    status: "new",
  });

  if (error) {
    return NextResponse.json({ error: "No se pudo registrar el lead" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
