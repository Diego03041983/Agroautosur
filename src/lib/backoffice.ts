import { createClient } from "@/lib/supabase/server";

type QueueCounter = "pending_listings" | "commercial_users" | "open_invoices" | "moderation_cases";

async function countRows(counter: QueueCounter) {
  const supabase = await createClient();
  if (!supabase) return null;

  const query =
    counter === "pending_listings"
      ? supabase.from("listings").select("*", { count: "exact", head: true }).eq("status", "pending")
      : counter === "commercial_users"
        ? supabase.from("organization_members").select("*", { count: "exact", head: true }).eq("is_active", true)
        : counter === "open_invoices"
          ? supabase.from("invoices").select("*", { count: "exact", head: true }).in("status", ["open", "overdue"])
          : supabase.from("moderation_cases").select("*", { count: "exact", head: true }).in("status", ["open", "in_review"]);

  const { count, error } = await query;
  if (error) return null;
  return count ?? 0;
}

export async function getBackofficeQueue() {
  const [pendingListings, commercialUsers, openInvoices, moderationCases] = await Promise.all([
    countRows("pending_listings"),
    countRows("commercial_users"),
    countRows("open_invoices"),
    countRows("moderation_cases"),
  ]);

  return [
    {
      title: "Publicaciones pendientes",
      detail: "Validar datos, fotos, titularidad y precio.",
      count: pendingListings ?? 0,
      state: "Aprobación",
      isDemo: pendingListings === null,
    },
    {
      title: "Usuarios comerciales",
      detail: "Revisar altas de agencias, empresas agro y roles.",
      count: commercialUsers ?? 0,
      state: "Usuarios",
      isDemo: commercialUsers === null,
    },
    {
      title: "Cobros a conciliar",
      detail: "Cruzar pagos, facturas y suscripciones activas.",
      count: openInvoices ?? 0,
      state: "Cobros",
      isDemo: openInvoices === null,
    },
    {
      title: "Casos de moderación",
      detail: "Avisos reportados o cambios críticos para revisar.",
      count: moderationCases ?? 0,
      state: "Moderación",
      isDemo: moderationCases === null,
    },
  ];
}
