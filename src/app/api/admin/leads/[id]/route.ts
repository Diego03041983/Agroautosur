import { NextResponse } from "next/server";
import { getCurrentUserContext } from "@/lib/auth";
import { leadUpdateSchema } from "@/lib/validations";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = await request.json().catch(() => null);
  const parsed = leadUpdateSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
  }

  const { supabase, isStaff, isDemo } = await getCurrentUserContext();
  if (!supabase) return NextResponse.json({ ok: true, mode: "demo" }, { status: 202 });
  if (!isStaff && !isDemo) return NextResponse.json({ error: "No autorizado" }, { status: 403 });

  const { error } = await supabase
    .from("leads")
    .update({
      status: parsed.data.status,
      assigned_to: parsed.data.assigned_to,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return NextResponse.json({ error: "No se pudo actualizar el lead" }, { status: 500 });

  return NextResponse.json({ ok: true });
}
