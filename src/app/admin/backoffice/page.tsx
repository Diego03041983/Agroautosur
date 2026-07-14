import { ModuleDashboard } from "@/components/module-dashboard";
import { requireStaff } from "@/lib/auth";
import { getBackofficeQueue } from "@/lib/backoffice";
import { backofficeCards } from "@/lib/platform-modules";

export const metadata = { title: "Backoffice" };

export default async function BackofficePage() {
  await requireStaff();
  const queue = await getBackofficeQueue();
  return (
    <>
      <ModuleDashboard
        eyebrow="Backoffice"
        title="Aprobaciones, usuarios, cobros, facturación, moderación y auditoría."
        description="Mapa operativo para administrar la plataforma completa: actores, publicaciones, proveedores, cobros, reportes y trazabilidad."
        cards={backofficeCards}
        cta={{ label: "Ver publicaciones", href: "/admin/publicaciones" }}
        admin
      />
      <section className="aas-surface border-t border-[#152018]/10 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-lg border border-[#152018]/10 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[#152018]/10 bg-[#f8faf6] px-3 py-2">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1f6b43]">Cola operativa</p>
              <span className="text-xs font-bold text-[#667062]">Pendientes de gestión</span>
            </div>
            <div className="divide-y divide-[#152018]/8">
              {queue.map(({ title, detail, count, state, isDemo }) => (
                <div key={title} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 px-3 py-3">
                  <div>
                    <p className="text-sm font-black text-[#152018]">{title}</p>
                    <p className="mt-0.5 text-xs text-[#667062]">{detail}{isDemo ? " Demo sin Supabase." : ""}</p>
                  </div>
                  <span className="rounded-md bg-[#edf4e8] px-2 py-1 text-xs font-black text-[#1f6b43]">{count}</span>
                  <span className="rounded-md border border-[#152018]/10 px-2 py-1 text-xs font-black text-[#152018]">{state}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
