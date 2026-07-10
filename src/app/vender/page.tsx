import { LeadForm } from "@/components/lead-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = { title: "Quiero vender" };

export default function SellPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1fr_0.8fr] lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#1f6b43]">Quiero vender</p>
          <h1 className="mt-3 text-4xl font-black">Publicá tu unidad con respaldo comercial.</h1>
          <p className="mt-5 text-lg leading-8 text-[#4d574c]">
            Cargá los datos iniciales y el equipo puede validar documentación, fotos, precio de referencia y condiciones
            de operación antes de publicar.
          </p>
        </div>
        <LeadForm leadType="sell_request" sourceLabel="Quiero vender" />
      </main>
      <SiteFooter />
    </>
  );
}
