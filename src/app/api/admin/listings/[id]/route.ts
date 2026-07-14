import { NextResponse } from "next/server";
import { getCurrentUserContext } from "@/lib/auth";
import { listingStatusUpdateSchema } from "@/lib/validations";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = await request.json().catch(() => null);
  const parsed = listingStatusUpdateSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
  }

  const { supabase, user, isStaff, isDemo } = await getCurrentUserContext();
  if (!supabase) return NextResponse.json({ ok: true, mode: "demo" }, { status: 202 });
  if (!isStaff && !isDemo) return NextResponse.json({ error: "No autorizado" }, { status: 403 });

  const patch: Record<string, string | null> = {
    status: parsed.data.status,
    updated_at: new Date().toISOString(),
  };

  if (parsed.data.status === "published") patch.published_at = new Date().toISOString();

  const { data: listing, error } = await supabase
    .from("listings")
    .update(patch)
    .eq("id", id)
    .select("id,source_submission_id,status")
    .single();

  if (error || !listing) return NextResponse.json({ error: "No se pudo actualizar la publicación" }, { status: 500 });

  if (listing.source_submission_id) {
    await supabase
      .from("seller_listing_submissions")
      .update({
        status: parsed.data.status,
        admin_notes: parsed.data.admin_notes ?? null,
        reviewed_by: user?.id ?? null,
        reviewed_at: new Date().toISOString(),
        rejection_reason: parsed.data.status === "rejected" ? parsed.data.admin_notes ?? null : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", listing.source_submission_id);
  }

  await supabase.from("audit_logs").insert({
    actor_profile_id: user?.id ?? null,
    action: `listing.status.${parsed.data.status}`,
    entity_type: "listing",
    entity_id: id,
    after_data: { status: parsed.data.status, admin_notes: parsed.data.admin_notes ?? null },
  });

  return NextResponse.json({ ok: true });
}
