import Link from "next/link";
import { CalendarDays, MessageCircle, SearchX, UserRound } from "lucide-react";
import { AdminNav } from "@/components/admin-nav";
import { LeadStatusBadge, LeadTypeBadge } from "@/components/crm/lead-badge";
import { SiteHeader } from "@/components/site-header";
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
      <main className="aas-surface mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#1f6b43]">CRM interno</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Bandeja de leads</h1>
            <p className="mt-2 max-w-2xl text-[#667062]">
              Todas las consultas públicas entran acá para clasificar, contactar, asignar responsable, financiar, negociar y cerrar.
            </p>
          </div>
          <Link href="/admin" className="rounded-lg border border-[#152018]/12 bg-white px-4 py-3 text-center text-sm font-black">
            Volver al dashboard
          </Link>
        </div>

        <form className="mt-8 grid gap-3 rounded-xl border border-[#152018]/10 bg-white p-4 shadow-sm md:grid-cols-6">
          <FilterLabel label="Estado">
            <select name="status" defaultValue={filters.status} className="aas-field">
              <option value="">Todos</option>
              {leadStatuses.map((status) => (
                <option key={status} value={status}>
                  {leadStatusLabels[status]}
                </option>
              ))}
            </select>
          </FilterLabel>
          <FilterLabel label="Tipo">
            <select name="lead_type" defaultValue={filters.lead_type} className="aas-field">
              <option value="">Todos</option>
              {leadTypes.map((type) => (
                <option key={type} value={type}>
                  {leadTypeLabels[type]}
                </option>
              ))}
            </select>
          </FilterLabel>
          <FilterLabel label="Publicación">
            <select name="listing_id" defaultValue={filters.listing_id ?? ""} className="aas-field">
              <option value="">Todas</option>
              {listings.map((listing) => (
                <option key={listing.id} value={listing.id}>
                  {listing.title}
                </option>
              ))}
            </select>
          </FilterLabel>
          <FilterLabel label="Responsable">
            <input name="assigned_to" defaultValue={filters.assigned_to ?? ""} placeholder="UUID responsable" className="aas-field" />
          </FilterLabel>
          <FilterLabel label="Desde">
            <input name="date_from" type="date" defaultValue={filters.date_from ?? ""} className="aas-field" />
          </FilterLabel>
          <FilterLabel label="Hasta">
            <input name="date_to" type="date" defaultValue={filters.date_to ?? ""} className="aas-field" />
          </FilterLabel>
          <div className="flex gap-2 md:col-span-6">
            <button className="min-h-12 rounded-lg bg-[#183d2a] px-5 text-sm font-black text-white">Filtrar leads</button>
            <Link href="/admin/leads" className="inline-flex min-h-12 items-center rounded-lg border border-[#152018]/12 px-5 text-sm font-black">
              Limpiar
            </Link>
          </div>
        </form>

        <div className="mt-6 overflow-hidden rounded-xl border border-[#152018]/10 bg-white shadow-sm">
          {leads.length ? (
            <div className="divide-y divide-[#152018]/10">
              {leads.map((lead) => (
                <div key={lead.id} className="grid gap-4 p-4 lg:grid-cols-[1.25fr_0.9fr_0.75fr_auto] lg:items-center">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <LeadStatusBadge status={lead.status} />
                      <LeadTypeBadge type={lead.lead_type} />
                    </div>
                    <Link href={`/admin/leads/${lead.id}`} className="mt-3 block text-xl font-black hover:text-[#1f6b43]">
                      {lead.full_name}
                    </Link>
                    <p className="mt-1 text-sm text-[#667062]">{lead.message ?? "Sin mensaje inicial"}</p>
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
                    <a href={leadWhatsappUrl({ fullName: lead.full_name, listingTitle: lead.listing?.title, leadType: lead.lead_type })} target="_blank" rel="noreferrer" className="grid size-11 place-items-center rounded-lg bg-[#1f6b43] text-white" aria-label="Abrir WhatsApp">
                      <MessageCircle size={18} />
                    </a>
                    <Link href={`/admin/leads/${lead.id}`} className="inline-flex min-h-11 items-center rounded-lg bg-[#d6a82f] px-4 text-sm font-black text-[#152018]">
                      Gestionar
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center">
              <SearchX className="mx-auto text-[#1f6b43]" size={44} />
              <h2 className="mt-4 text-2xl font-black">No hay leads con esos filtros</h2>
              <p className="mx-auto mt-2 max-w-md text-[#667062]">
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
