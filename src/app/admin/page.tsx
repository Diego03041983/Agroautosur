import Link from "next/link";
import { BadgeDollarSign, ClipboardList, Images, MessageSquareText, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { AdminNav } from "@/components/admin-nav";
import { SiteHeader } from "@/components/site-header";
import { getLeadMetrics } from "@/lib/leads";
import { getPublishedListings } from "@/lib/listings";
import { leadStatusLabels, leadTypeLabels } from "@/lib/utils";

export const metadata = { title: "Panel administrativo" };

export default async function AdminPage() {
  const [listings, leadMetrics] = await Promise.all([getPublishedListings(), getLeadMetrics()]);
  const stats = [
    { label: "Publicaciones", value: listings.length, Icon: ClipboardList },
    { label: "Leads nuevos", value: leadMetrics.newLeads, Icon: MessageSquareText },
    { label: "Consultas de financiación", value: leadMetrics.financing, Icon: BadgeDollarSign },
    { label: "Verificadas", value: listings.filter((item) => item.is_verified).length, Icon: ShieldCheck },
  ];

  return (
    <>
      <SiteHeader />
      <AdminNav />
      <main className="aas-surface mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#101713] p-5 text-white shadow-[0_20px_70px_rgba(21,32,24,0.18)] sm:p-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#d6a82f]">Admin</p>
              <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Dashboard operativo</h1>
              <p className="mt-2 max-w-2xl text-white/64">
                Centro de control para leer la operación diaria: publicaciones activas, leads, consultas de financiación y módulos administrativos.
              </p>
            </div>
            <Link href="/admin/login" className="rounded-lg bg-[#d6a82f] px-5 py-3 text-center text-sm font-black text-[#152018]">
              Login seguro
            </Link>
            <Link href="/admin/leads" className="rounded-lg border border-white/15 px-5 py-3 text-center text-sm font-black text-white">
              Ver CRM
            </Link>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {stats.map(({ label, value, Icon }) => (
            <div key={label} className="rounded-xl border border-[#152018]/10 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <Icon className="text-[#1f6b43]" />
                <TrendingUp size={18} className="text-[#d6a82f]" />
              </div>
              <p className="mt-4 text-3xl font-black">{value}</p>
              <p className="text-sm font-bold text-[#667062]">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-xl border border-[#152018]/10 bg-white p-5 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#1f6b43]">Leads por estado</p>
            <div className="mt-4 grid gap-3">
              {Object.entries(leadMetrics.byStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between rounded-lg bg-[#f8faf6] px-3 py-2">
                  <span className="text-sm font-bold text-[#4d574c]">{leadStatusLabels[status as keyof typeof leadStatusLabels]}</span>
                  <span className="text-lg font-black">{count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-[#152018]/10 bg-white p-5 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#1f6b43]">Publicaciones con más interesados</p>
            <div className="mt-4 grid gap-3">
              {leadMetrics.topListings.length ? (
                leadMetrics.topListings.map((item) => (
                  <div key={item.listingTitle} className="flex items-center justify-between gap-4 rounded-lg bg-[#f8faf6] px-3 py-3">
                    <div>
                      <p className="font-black">{item.listingTitle}</p>
                      <p className="text-xs font-bold text-[#667062]">{item.count} consultas</p>
                    </div>
                    {item.listingSlug ? (
                      <Link href={`/publicaciones/${item.listingSlug}`} className="text-sm font-black text-[#1f6b43]">
                        Ver
                      </Link>
                    ) : null}
                  </div>
                ))
              ) : (
                <p className="text-sm text-[#667062]">Todavía no hay consultas vinculadas a publicaciones.</p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { title: "Backoffice", text: "Aprobaciones, usuarios, cobros, facturación y auditoría.", href: "/admin/backoffice", Icon: ClipboardList },
            { title: "Gestión de leads", text: "Estados comerciales, asignación y notas internas.", href: "/admin/leads", Icon: Users },
            { title: "Analítica", text: "Tráfico, conversión, MRR, churn, GMV y comisiones.", href: "/admin/analitica", Icon: Images },
          ].map(({ title, text, href, Icon }) => (
            <Link key={title} href={href} className="rounded-xl border border-[#152018]/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1f6b43]/35">
              <Icon className="text-[#1f6b43]" />
              <h2 className="mt-4 text-xl font-black">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#667062]">{text}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8 rounded-xl border border-[#152018]/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#1f6b43]">Tipos de consulta</p>
          <h2 className="mt-2 text-2xl font-black">Mapa de demanda comercial</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667062]">
            El CRM ya clasifica interés por publicación, financiación, permuta, venta, búsquedas específicas y contacto general.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {Object.entries(leadMetrics.byType).map(([type, count]) => (
              <span key={type} className="rounded-md bg-[#f0f3eb] px-3 py-2 text-xs font-black text-[#384239]">
                {leadTypeLabels[type as keyof typeof leadTypeLabels]}: {count}
              </span>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
