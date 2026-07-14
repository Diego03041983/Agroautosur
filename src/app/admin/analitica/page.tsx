import { ModuleDashboard } from "@/components/module-dashboard";
import { getLeadMetrics, getLeads } from "@/lib/leads";
import { getPublishedListings } from "@/lib/listings";
import { analyticsCards } from "@/lib/platform-modules";
import { formatMoney } from "@/lib/utils";

export const metadata = { title: "Analítica" };

export default async function AnalyticsPage() {
  const [leadMetrics, leads, listings] = await Promise.all([getLeadMetrics(), getLeads(), getPublishedListings()]);
  const last30 = new Date();
  last30.setDate(last30.getDate() - 30);

  const leadsLast30 = leads.filter((lead) => new Date(lead.created_at) >= last30).length;
  const leadsWithListing = leads.filter((lead) => lead.listing_id).length;
  const conversionBase = leads.length ? Math.round((leadsWithListing / leads.length) * 100) : 0;
  const gmvUsd = listings.reduce((sum, listing) => sum + (listing.price_usd ?? (listing.currency === "USD" ? listing.price ?? 0 : 0)), 0);
  const gmvArs = listings.reduce((sum, listing) => sum + (listing.price_ars ?? (listing.currency === "ARS" ? listing.price ?? 0 : 0)), 0);

  return (
    <>
      <ModuleDashboard
        eyebrow="Analítica"
        title="Métricas de negocio"
        description="Vista compacta para controlar adquisición, conversión, monetización y comisiones."
        cards={analyticsCards}
        cta={{ label: "Ver leads", href: "/admin/leads" }}
        admin
      />
      <section className="aas-surface border-t border-[#152018]/10 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-4">
          {[
            ["Leads vinculados a publicación", `${conversionBase}%`, `${leadsWithListing}/${leads.length || 0}`],
            ["Leads últimos 30 días", String(leadsLast30), `${leadMetrics.newLeads} nuevos`],
            ["Valor publicado USD", formatMoney(gmvUsd, "USD"), `${listings.length} activos`],
            ["Valor publicado ARS", formatMoney(gmvArs, "ARS"), "Bimonetario"],
          ].map(([label, value, note]) => (
            <div key={label} className="rounded-lg border border-[#152018]/10 bg-white p-4 shadow-sm">
              <p className="text-xs font-bold text-[#667062]">{label}</p>
              <p className="mt-2 text-2xl font-black text-[#152018]">{value}</p>
              <p className="mt-1 text-xs font-black text-[#1f6b43]">{note}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
