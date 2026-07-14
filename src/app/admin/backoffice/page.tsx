import { ModuleDashboard } from "@/components/module-dashboard";
import { backofficeCards } from "@/lib/platform-modules";

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
      <section className="aas-surface border-t border-[#152018]/10 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-lg border border-[#152018]/10 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[#152018]/10 bg-[#f8faf6] px-3 py-2">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1f6b43]">Cola operativa</p>
              <span className="text-xs font-bold text-[#667062]">Pendientes de gestión</span>
            </div>
            <div className="divide-y divide-[#152018]/8">
              {[
                ["Publicaciones pendientes", "Validar datos, fotos, titularidad y precio.", "12", "Aprobación"],
                ["Usuarios comerciales", "Revisar altas de agencias, empresas agro y roles.", "4", "Usuarios"],
                ["Cobros a conciliar", "Cruzar pagos, facturas y suscripciones activas.", "7", "Cobros"],
                ["Casos de moderación", "Avisos reportados o cambios críticos para revisar.", "2", "Moderación"],
              ].map(([title, detail, count, state]) => (
                <div key={title} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 px-3 py-3">
                  <div>
                    <p className="text-sm font-black text-[#152018]">{title}</p>
                    <p className="mt-0.5 text-xs text-[#667062]">{detail}</p>
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
