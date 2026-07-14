import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Mail, MapPin, MessageCircle, Phone, UserRound } from "lucide-react";
import { AdminNav } from "@/components/admin-nav";
import { LeadStatusBadge, LeadTypeBadge } from "@/components/crm/lead-badge";
import { LeadNoteForm } from "@/components/crm/lead-note-form";
import { LeadStatusAction } from "@/components/crm/lead-status-action";
import { SiteHeader } from "@/components/site-header";
import { getLeadById } from "@/lib/leads";
import { formatDateTime, formatListingPrices, leadTypeLabels, leadWhatsappUrl } from "@/lib/utils";

export const metadata = { title: "Detalle de lead" };

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await getLeadById(id);
  if (!lead) notFound();

  const whatsappHref = leadWhatsappUrl({
    fullName: lead.full_name,
    listingTitle: lead.listing?.title,
    leadType: lead.lead_type,
  });

  return (
    <>
      <SiteHeader />
      <AdminNav />
      <main className="aas-surface mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_0.55fr] lg:px-8">
        <section className="grid gap-6">
          <div className="rounded-2xl bg-[#101713] p-5 text-white shadow-[0_20px_70px_rgba(21,32,24,0.18)] sm:p-8">
            <Link href="/admin/leads" className="text-sm font-black text-[#d6a82f]">← Volver a leads</Link>
            <div className="mt-5 flex flex-wrap gap-2">
              <LeadStatusBadge status={lead.status} />
              <LeadTypeBadge type={lead.lead_type} />
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">{lead.full_name}</h1>
            <p className="mt-3 max-w-2xl text-white/66">
              {leadTypeLabels[lead.lead_type]} registrada desde {lead.source_label ?? lead.source_path ?? "sitio público"}.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard title="Datos de contacto">
              <p className="flex items-center gap-2"><Phone size={17} className="text-[#1f6b43]" /> {lead.phone}</p>
              <p className="flex items-center gap-2"><Mail size={17} className="text-[#1f6b43]" /> {lead.email ?? "Email no informado"}</p>
              <p className="flex items-center gap-2"><MapPin size={17} className="text-[#1f6b43]" /> {lead.city ?? "Ciudad no informada"}</p>
            </InfoCard>
            <InfoCard title="Contexto comercial">
              <p className="flex items-center gap-2"><CalendarDays size={17} className="text-[#1f6b43]" /> {formatDateTime(lead.created_at)}</p>
              <p className="flex items-center gap-2"><UserRound size={17} className="text-[#1f6b43]" /> {lead.assigned_profile?.full_name ?? "Sin responsable asignado"}</p>
              <p>Financiación: <strong>{lead.needs_financing ? "Sí" : "No"}</strong></p>
              <p>Permuta: <strong>{lead.has_trade_in ? "Sí" : "No"}</strong></p>
            </InfoCard>
          </div>

          <InfoCard title="Mensaje inicial">
            <p className="leading-7 text-[#4d574c]">{lead.message ?? "El lead no dejó mensaje inicial."}</p>
          </InfoCard>

          {lead.listing ? (
            <InfoCard title="Publicación vinculada">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <Link href={`/publicaciones/${lead.listing.slug}`} className="text-xl font-black hover:text-[#1f6b43]">
                    {lead.listing.title}
                  </Link>
                  <p className="mt-1 text-sm text-[#667062]">{lead.listing.location_city}, {lead.listing.location_province}</p>
                </div>
                <div className="text-right">
                  {formatListingPrices(lead.listing).map((price) => (
                    <p key={price} className="text-2xl font-black text-[#1f6b43]">{price}</p>
                  ))}
                </div>
              </div>
            </InfoCard>
          ) : null}

          <InfoCard title="Historial de notas">
            {lead.lead_notes?.length ? (
              <div className="grid gap-3">
                {lead.lead_notes.map((note) => (
                  <div key={note.id} className="rounded-lg border border-[#152018]/10 bg-[#f8faf6] p-4">
                    <p className="text-sm leading-6">{note.note}</p>
                    <p className="mt-2 text-xs font-bold text-[#667062]">{formatDateTime(note.created_at)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#667062]">Todavía no hay notas internas para este lead.</p>
            )}
          </InfoCard>
        </section>

        <aside className="grid content-start gap-4 lg:sticky lg:top-24">
          <div className="rounded-xl border border-[#152018]/10 bg-white p-5 shadow-sm">
            <LeadStatusAction leadId={lead.id} currentStatus={lead.status} currentAssignedTo={lead.assigned_to} />
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#1f6b43] px-4 text-sm font-black text-white">
              Abrir WhatsApp <MessageCircle size={18} />
            </a>
          </div>
          <LeadNoteForm leadId={lead.id} />
        </aside>
      </main>
    </>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[#152018]/10 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black">{title}</h2>
      <div className="mt-4 grid gap-2 text-sm text-[#4d574c]">{children}</div>
    </div>
  );
}
