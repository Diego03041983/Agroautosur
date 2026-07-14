import Link from "next/link";
import { BadgeDollarSign, ClipboardList, Images, MessageSquareText, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { AdminNav } from "@/components/admin-nav";
import { SiteHeader } from "@/components/site-header";
import { requireStaff } from "@/lib/auth";
import { getLeadMetrics } from "@/lib/leads";
import { getPublishedListings } from "@/lib/listings";
import { leadStatusLabels, leadTypeLabels } from "@/lib/utils";

export const metadata = { title: "Panel administrativo" };

export default async function AdminPage() {
  await requireStaff();
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
      <main className="aas-surface mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-[#152018]/10 bg-white p-4 shadow-sm">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1f6b43]">Admin</p>
              <h1 className="mt-1 text-2xl font-black tracking-tight text-[#152018] sm:text-3xl">Dashboard operativo</h1>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-[#667062]">
                Centro de control para leer la operación diaria: publicaciones activas, leads, consultas de financiación y módulos administrativos.
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/admin/login" className="rounded-md border border-[#152018]/10 bg-[#f8faf6] px-3 py-2 text-center text-xs font-black text-[#152018]">Login</Link>
              <Link href="/admin/leads" className="rounded-md bg-[#152018] px-3 py-2 text-center text-xs font-black text-white">CRM</Link>
            </div>
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {stats.map(({ label, value, Icon }) => (
            <div key={label} className="rounded-lg border border-[#152018]/10 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <Icon size={18} className="text-[#1f6b43]" />
                <TrendingUp size={15} className="text-[#d6a82f]" />
              </div>
              <p className="mt-3 text-2xl font-black">{value}</p>
              <p className="text-xs font-bold text-[#667062]">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-[#152018]/10 bg-white p-4 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1f6b43]">Leads por estado</p>
            <div className="mt-3 grid gap-2">
              {Object.entries(leadMetrics.byStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between rounded-md bg-[#f8faf6] px-3 py-2">
                  <span className="text-xs font-bold text-[#4d574c]">{leadStatusLabels[status as keyof typeof leadStatusLabels]}</span>
                  <span className="text-sm font-black">{count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-[#152018]/10 bg-white p-4 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1f6b43]">Publicaciones con más interesados</p>
            <div className="mt-3 grid gap-2">
              {leadMetrics.topListings.length ? (
                leadMetrics.topListings.map((item) => (
                  <div key={item.listingTitle} className="flex items-center justify-between gap-4 rounded-md bg-[#f8faf6] px-3 py-2">
                    <div>
                      <p className="text-sm font-black">{item.listingTitle}</p>
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
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {[
            { title: "Backoffice", text: "Aprobaciones, usuarios, cobros, facturación y auditoría.", href: "/admin/backoffice", Icon: ClipboardList },
            { title: "Publicaciones", text: "Pendientes, aprobadas, pausadas y rechazadas.", href: "/admin/publicaciones", Icon: ShieldCheck },
            { title: "Gestión de leads", text: "Estados comerciales, asignación y notas internas.", href: "/admin/leads", Icon: Users },
            { title: "Analítica", text: "Tráfico, conversión, MRR, churn, GMV y comisiones.", href: "/admin/analitica", Icon: Images },
          ].map(({ title, text, href, Icon }) => (
            <Link key={title} href={href} className="rounded-lg border border-[#152018]/10 bg-white p-4 shadow-sm transition hover:border-[#1f6b43]/35">
              <Icon size={18} className="text-[#1f6b43]" />
              <h2 className="mt-3 text-base font-black">{title}</h2>
              <p className="mt-1 text-xs leading-5 text-[#667062]">{text}</p>
            </Link>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-[#152018]/10 bg-white p-4 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1f6b43]">Tipos de consulta</p>
          <div className="mt-3 flex flex-wrap gap-2">
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
