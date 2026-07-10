import { demoListings } from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/server";
import type { Lead, LeadFilters, LeadStatus, LeadType } from "@/types/domain";
import { leadStatuses, leadTypes } from "@/lib/utils";

const now = new Date();

export const demoLeads: Lead[] = [
  {
    id: "90000000-0000-4000-8000-000000000001",
    listing_id: demoListings[0].id,
    listing: demoListings[0],
    lead_type: "listing_interest",
    full_name: "Martín Alvarez",
    phone: "5493462000001",
    email: "martin@example.com",
    city: "Venado Tuerto",
    message: "Hola, quiero saber si la Hilux sigue disponible y si toman permuta menor.",
    has_trade_in: true,
    needs_financing: false,
    desired_budget: null,
    status: "new",
    assigned_to: null,
    source_path: `/publicaciones/${demoListings[0].slug}`,
    source_label: demoListings[0].title,
    metadata: { channel: "demo", campaign: "whatsapp" },
    created_at: new Date(now.getTime() - 1000 * 60 * 45).toISOString(),
    updated_at: new Date(now.getTime() - 1000 * 60 * 45).toISOString(),
    lead_notes: [],
  },
  {
    id: "90000000-0000-4000-8000-000000000002",
    listing_id: demoListings[2].id,
    listing: demoListings[2],
    lead_type: "financing",
    full_name: "Sofía Benítez",
    phone: "5493382000002",
    email: "sofia@example.com",
    city: "Rufino",
    message: "Necesito financiar una parte del tractor. Tengo entrega inicial.",
    has_trade_in: false,
    needs_financing: true,
    desired_budget: 30000,
    status: "in_financing",
    assigned_to: null,
    source_path: `/publicaciones/${demoListings[2].slug}`,
    source_label: "Quiero financiar",
    metadata: { channel: "demo", campaign: "instagram" },
    created_at: new Date(now.getTime() - 1000 * 60 * 60 * 6).toISOString(),
    updated_at: new Date(now.getTime() - 1000 * 60 * 60 * 3).toISOString(),
    lead_notes: [
      {
        id: "note-demo-1",
        lead_id: "90000000-0000-4000-8000-000000000002",
        author_profile_id: null,
        note: "Pide financiación parcial. Consultar documentación y actividad.",
        created_at: new Date(now.getTime() - 1000 * 60 * 60 * 2).toISOString(),
      },
    ],
  },
  {
    id: "90000000-0000-4000-8000-000000000003",
    listing_id: null,
    listing: null,
    lead_type: "sell_request",
    full_name: "Agro Las Marías",
    phone: "5493462000003",
    email: null,
    city: "Firmat",
    message: "Queremos publicar una Amarok y una tolva. Necesitamos tasación.",
    has_trade_in: false,
    needs_financing: false,
    desired_budget: null,
    status: "contacted",
    assigned_to: null,
    source_path: "/vender",
    source_label: "Quiero vender",
    metadata: { channel: "demo", campaign: "facebook" },
    created_at: new Date(now.getTime() - 1000 * 60 * 60 * 22).toISOString(),
    updated_at: new Date(now.getTime() - 1000 * 60 * 60 * 20).toISOString(),
    lead_notes: [],
  },
];

const leadSelect = `
  *,
  listing:listings(id,title,slug,price,currency,price_usd,price_ars,location_city,location_province),
  assigned_profile:profiles(id,full_name,phone),
  lead_notes(*)
`;

export async function getLeads(filters: LeadFilters = {}): Promise<Lead[]> {
  const supabase = await createClient();
  if (!supabase) return filterDemoLeads(filters);

  let query = supabase.from("leads").select(leadSelect).order("created_at", { ascending: false });

  if (filters.status) query = query.eq("status", filters.status);
  if (filters.lead_type) query = query.eq("lead_type", filters.lead_type);
  if (filters.listing_id) query = query.eq("listing_id", filters.listing_id);
  if (filters.assigned_to) query = query.eq("assigned_to", filters.assigned_to);
  if (filters.date_from) query = query.gte("created_at", filters.date_from);
  if (filters.date_to) query = query.lte("created_at", `${filters.date_to}T23:59:59`);

  const { data, error } = await query;
  if (error) return filterDemoLeads(filters);
  return (data ?? []) as Lead[];
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const supabase = await createClient();
  if (!supabase) return demoLeads.find((lead) => lead.id === id) ?? null;

  const { data, error } = await supabase.from("leads").select(leadSelect).eq("id", id).single();
  if (error || !data) return demoLeads.find((lead) => lead.id === id) ?? null;

  return {
    ...(data as Lead),
    lead_notes: [...((data as Lead).lead_notes ?? [])].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    ),
  };
}

export async function getLeadMetrics() {
  const leads = await getLeads();
  const byStatus = Object.fromEntries(leadStatuses.map((status) => [status, 0])) as Record<LeadStatus, number>;
  const byType = Object.fromEntries(leadTypes.map((type) => [type, 0])) as Record<LeadType, number>;
  const byListing = new Map<string, { listingTitle: string; count: number; listingSlug?: string }>();

  leads.forEach((lead) => {
    byStatus[lead.status] += 1;
    byType[lead.lead_type] += 1;

    if (lead.listing_id) {
      const key = lead.listing_id;
      const current = byListing.get(key);
      byListing.set(key, {
        listingTitle: lead.listing?.title ?? "Publicación sin título",
        listingSlug: lead.listing?.slug,
        count: (current?.count ?? 0) + 1,
      });
    }
  });

  return {
    total: leads.length,
    newLeads: byStatus.new,
    financing: byType.financing,
    byStatus,
    byType,
    topListings: [...byListing.values()].sort((a, b) => b.count - a.count).slice(0, 5),
  };
}

function filterDemoLeads(filters: LeadFilters) {
  return demoLeads.filter((lead) => {
    if (filters.status && lead.status !== filters.status) return false;
    if (filters.lead_type && lead.lead_type !== filters.lead_type) return false;
    if (filters.listing_id && lead.listing_id !== filters.listing_id) return false;
    if (filters.assigned_to && lead.assigned_to !== filters.assigned_to) return false;
    if (filters.date_from && lead.created_at < filters.date_from) return false;
    if (filters.date_to && lead.created_at > `${filters.date_to}T23:59:59`) return false;
    return true;
  });
}
