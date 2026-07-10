import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { FinancingCalculator } from "@/components/financing-calculator";
import { LeadForm } from "@/components/lead-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getListingBySlug } from "@/lib/listings";

export const metadata = { title: "Cotizador de financiación" };

export default async function FinancingPage({
  searchParams,
}: {
  searchParams: Promise<{ listing?: string; price?: string }>;
}) {
  const params = await searchParams;
  const listing = params.listing ? await getListingBySlug(params.listing) : null;
  const price = Number(params.price || listing?.price_usd || listing?.price || 30000);

  return (
    <>
      <SiteHeader />
      <main className="aas-surface">
        <section className="bg-[#101713] text-white">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <Link href={listing ? `/publicaciones/${listing.slug}` : "/publicaciones"} className="inline-flex items-center gap-2 text-sm font-black text-[#d6a82f]">
              <ArrowLeft size={17} /> Volver
            </Link>
            <div className="mt-6 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-[#f1d382]">
                <ShieldCheck size={16} /> Simulación inicial
              </div>
              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Cotizá una financiación posible</h1>
              <p className="mt-4 text-lg leading-8 text-white/70">
                Ajustá entrega y plazo para comparar escenarios. Después podés dejar la solicitud lista para que el equipo revise documentación y alternativas.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8">
          <FinancingCalculator initialPrice={price} listingTitle={listing?.title} />
          <div className="grid gap-6 lg:grid-cols-[0.9fr_0.7fr]">
            <div className="rounded-2xl border border-[#152018]/10 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black">Cómo sigue</h2>
              <div className="mt-4 grid gap-3 text-sm leading-6 text-[#4d574c]">
                <p>1. Elegís una opción estimada según entrega y plazo.</p>
                <p>2. Dejás tus datos y el monto queda asociado a la publicación.</p>
                <p>3. El equipo revisa perfil, documentación y alternativas disponibles.</p>
                <p>4. Si aplica, se deriva a entidad o plan de financiación.</p>
              </div>
            </div>
            <div id="solicitud-financiacion">
              <LeadForm
                listingId={listing?.id}
                leadType="financing"
                sourceLabel={listing ? `Financiación: ${listing.title}` : "Cotizador de financiación"}
                context={{
                  listing_title: listing?.title,
                  listing_price_usd: listing?.price_usd,
                  listing_price_ars: listing?.price_ars,
                  calculator_price: price,
                }}
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
