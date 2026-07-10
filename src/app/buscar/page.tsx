import { LeadForm } from "@/components/lead-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = { title: "Busco algo específico" };

export default function WantedPage() {
  return (
    <>
      <SiteHeader />
      <main className="aas-surface mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1fr_0.8fr] lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#1f6b43]">Buscamos por vos</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">Contanos qué unidad necesitás.</h1>
          <p className="mt-5 text-lg leading-8 text-[#4d574c]">
            Cargá categoría, presupuesto, ciudad y detalles. Lo dejamos registrado como búsqueda activa para seguirlo en serio.
          </p>
        </div>
        <LeadForm leadType="wanted" sourceLabel="Busco algo específico" />
      </main>
      <SiteFooter />
    </>
  );
}
