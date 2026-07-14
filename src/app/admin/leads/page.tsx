import Link from "next/link";
import { CalendarDays, MessageCircle, SearchX, UserRound } from "lucide-react";
import { AdminNav } from "@/components/admin-nav";
import { LeadStatusBadge, LeadTypeBadge } from "@/components/crm/lead-badge";
import { SiteHeader } from "@/components/site-header";
import { requireStaff } from "@/lib/auth";
import { getLeads } from "@/lib/leads";
import { getPublishedListings } from "@/lib/listings";
import { formatDateTime, leadStatusLabels, leadStatuses, leadTypeLabels, leadTypes, leadWhatsappUrl } from "@/lib/utils";
import type { LeadFilters, LeadStatus, LeadType } from "@/types/domain";

export const metadata = { title: "CRM de leads" };

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  await requireStaff();
  const filters: LeadFilters = {
    status: (params.status ?? "") as LeadStatus | "",
    lead_type: (params.lead_type ?? "") as LeadType | "",
    listing_id: params.listing_id,
    assigned_to: params.assigned_to,
    date_from: params.date_from,
    date_to: params.date_to,
  };

  const [leads, listings] = await Promise.all([getLeads(filters), getPublishedListings()]);

  return (
    <>
      <SiteHeader />
      <AdminNav />
      <main className="aas-surface mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1f6b43]">CRM interno</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Bandeja de leads</h1>
            <p className="mt-1 max-w-2xl text-sm text-[#667062]">
              Todas las consultas públicas entran acá para clasificar, contactar, asignar responsable, financiar, negociar y cerrar.
            </p>
          </div>
          <Link href="/admin" className="rounded-md border border-[#152018]/12 bg-white px-3 py-2 text-center text-xs font-black">
            Volver al dashboard
          </Link>
        </div>

        <form className="mt-4 grid gap-2 rounded-lg border border-[#152018]/10 bg-white p-3 shadow-sm md:grid-cols-6">
          <FilterLabel label="Estado">
            <select name="status" defaultValue={filters.status} className="aas-admin-field">
              <option value="">Todos</option>
              {leadStatuses.map((status) => (
                <option key={status} value={status}>
                  {leadStatusLabels[status]}
                </option>
              ))}
            </select>
          </FilterLabel>
          <FilterLabel label="Tipo">
            <select name="lead_type" defaultValue={filters.lead_type} className="aas-admin-field">
              <option value="">Todos</option>
              {leadTypes.map((type) => (
                <option key={type} value={type}>
                  {leadTypeLabels[type]}
                </option>
              ))}
            </select>
          </FilterLabel>
          <FilterLabel label="Publicación">
            <select name="listing_id" defaultValue={filters.listing_id ?? ""} className="aas-admin-field">
              <option value="">Todas</option>
              {listings.map((listing) => (
                <option key={listing.id} value={listing.id}>
                  {listing.title}
                </option>
              ))}
            </select>
          </FilterLabel>
          <FilterLabel label="Responsable">
            <input name="assigned_to" defaultValue={filters.assigned_to ?? ""} placeholder="UUID responsable" className="aas-admin-field" />
          </FilterLabel>
          <FilterLabel label="Desde">
            <input name="date_from" type="date" defaultValue={filters.date_from ?? ""} className="aas-admin-field" />
          </FilterLabel>
          <FilterLabel label="Hasta">
            <input name="date_to" type="date" defaultValue={filters.date_to ?? ""} className="aas-admin-field" />
          </FilterLabel>
          <div className="flex gap-2 md:col-span-6">
            <button className="h-9 rounded-md bg-[#183d2a] px-4 text-xs font-black text-white">Filtrar</button>
            <Link href="/admin/leads" className="inline-flex h-9 items-center rounded-md border border-[#152018]/12 px-4 text-xs font-black">
              Limpiar
            </Link>
          </div>
        </form>

        <div className="mt-4 overflow-hidden rounded-lg border border-[#152018]/10 bg-white shadow-sm">
          {leads.length ? (
            <div className="divide-y divide-[#152018]/10">
              {leads.map((lead) => (
                <div key={lead.id} className="grid gap-3 p-3 lg:grid-cols-[1.25fr_0.9fr_0.75fr_auto] lg:items-center">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <LeadStatusBadge status={lead.status} />
                      <LeadTypeBadge type={lead.lead_type} />
                    </div>
                    <Link href={`/admin/leads/${lead.id}`} className="mt-2 block text-base font-black hover:text-[#1f6b43]">
                      {lead.full_name}
                    </Link>
                    <p className="mt-1 line-clamp-1 text-xs text-[#667062]">{lead.message ?? "Sin mensaje inicial"}</p>
                  </div>
                  <div className="grid gap-1 text-sm">
                    <p className="font-black">{lead.listing?.title ?? lead.source_label ?? "Consulta sin publicación"}</p>
                    <p className="text-[#667062]">{lead.city ?? "Ciudad no informada"}</p>
                  </div>
                  <div className="grid gap-2 text-sm text-[#667062]">
                    <span className="flex items-center gap-2"><CalendarDays size={16} /> {formatDateTime(lead.created_at)}</span>
                    <span className="flex items-center gap-2"><UserRound size={16} /> {lead.assigned_profile?.full_name ?? "Sin responsable"}</span>
                  </div>
                  <div className="flex gap-2 lg:justify-end">
                    <a href={leadWhatsappUrl({ fullName: lead.full_name, listingTitle: lead.listing?.title, leadType: lead.lead_type })} target="_blank" rel="noreferrer" className="grid size-9 place-items-center rounded-md bg-[#1f6b43] text-white" aria-label="Abrir WhatsApp">
                      <MessageCircle size={18} />
                    </a>
                    <Link href={`/admin/leads/${lead.id}`} className="inline-flex h-9 items-center rounded-md bg-[#d6a82f] px-3 text-xs font-black text-[#152018]">
                      Gestionar
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <SearchX className="mx-auto text-[#1f6b43]" size={34} />
              <h2 className="mt-3 text-lg font-black">No hay leads con esos filtros</h2>
              <p className="mx-auto mt-1 max-w-md text-sm text-[#667062]">
                Probá limpiar filtros o revisá que los formularios públicos estén enviando consultas.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function FilterLabel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#667062]">
      {label}
      {children}
    </label>
  );
}
