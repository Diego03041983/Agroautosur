import { LeadForm } from "@/components/lead-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = { title: "Contacto" };

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1fr_0.8fr] lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#1f6b43]">Contacto</p>
          <h1 className="mt-3 text-4xl font-black">Consultas, publicaciones, financiación y búsquedas específicas.</h1>
          <p className="mt-5 text-lg leading-8 text-[#4d574c]">
            Dejá tus datos y el equipo comercial podrá clasificar el lead según la necesidad: vender, comprar, financiar,
            permutar o buscar una unidad puntual.
          </p>
        </div>
        <LeadForm leadType="general_contact" sourceLabel="Contacto general" />
      </main>
      <SiteFooter />
    </>
  );
}
