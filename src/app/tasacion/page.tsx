import { Calculator } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ValuationTool } from "@/components/valuation-tool";

export const metadata = { title: "Tasación" };

export default function ValuationPage() {
  return (
    <>
      <SiteHeader />
      <main className="aas-surface">
        <section className="bg-[#101713] text-white">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-[#f1d382]">
              <Calculator size={16} /> Evaluar mi unidad
            </div>
            <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
              ¿Querés saber cuánto pedir?
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
              Cargá datos básicos, obtené una referencia inicial y después dejá la unidad lista para revisión comercial.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8">
          <ValuationTool />
          <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr]">
            <div className="rounded-2xl border border-[#152018]/10 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black">¿Querés que lo revisemos?</h2>
              <p className="mt-3 text-sm leading-6 text-[#667062]">
                El resultado anterior es orientativo. Si dejás tus datos, el equipo puede pedir fotos, documentación y detalles para armar una referencia más seria antes de publicar.
              </p>
            </div>
            <LeadForm
              leadType="sell_request"
              sourceLabel="Evaluar mi unidad"
              context={{ request_type: "valuation" }}
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
