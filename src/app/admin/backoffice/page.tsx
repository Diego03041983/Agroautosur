import { ModuleDashboard } from "@/components/module-dashboard";
import { backofficeCards, platformAudit } from "@/lib/platform-modules";

export const metadata = { title: "Backoffice" };

export default function BackofficePage() {
  return (
    <>
      <ModuleDashboard
        eyebrow="Backoffice"
        title="Aprobaciones, usuarios, cobros, facturación, moderación y auditoría."
        description="Mapa operativo para administrar la plataforma completa: actores, publicaciones, proveedores, cobros, reportes y trazabilidad."
        cards={backofficeCards}
        cta={{ label: "Ver analítica", href: "/admin/analitica" }}
        admin
      />
      <section className="aas-surface border-t border-[#152018]/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1f6b43]">Auditoría de alcance</p>
          <h2 className="mt-2 text-3xl font-black">Qué está hecho y qué falta</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {platformAudit.map((item) => (
              <article key={item.area} className="rounded-xl border border-[#152018]/10 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-black">{item.area}</h3>
                  <span className="rounded-full bg-[#edf4e8] px-3 py-1 text-xs font-black text-[#1f6b43]">{item.status}</span>
                </div>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-[#667062]">Ya existe</p>
                <p className="mt-1 text-sm leading-6 text-[#4d574c]">{item.done.join(", ")}.</p>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-[#667062]">Pendiente</p>
                <p className="mt-1 text-sm leading-6 text-[#4d574c]">{item.missing.join(", ")}.</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
