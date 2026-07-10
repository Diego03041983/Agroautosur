import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { leadNoteSchema } from "@/lib/validations";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = await request.json().catch(() => null);
  const parsed = leadNoteSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Nota inválida", details: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ ok: true, mode: "demo" }, { status: 202 });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("lead_notes").insert({
    lead_id: id,
    author_profile_id: user?.id ?? null,
    note: parsed.data.note,
  });

  if (error) return NextResponse.json({ error: "No se pudo agregar la nota" }, { status: 500 });

  await supabase.from("leads").update({ updated_at: new Date().toISOString() }).eq("id", id);

  return NextResponse.json({ ok: true });
}
