import Link from "next/link";
import { ArrowRight, GitCompareArrows, SearchX } from "lucide-react";
import { SearchPanel } from "@/components/search-panel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublishedListings } from "@/lib/listings";
import { formatListingPrices } from "@/lib/utils";

export const metadata = { title: "Comparador" };

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ items?: string }>;
}) {
  const params = await searchParams;
  const listings = await getPublishedListings();
  const requested = params.items?.split(",").filter(Boolean) ?? [];
  const selected = requested.length
    ? listings.filter((listing) => requested.includes(listing.slug)).slice(0, 3)
    : listings.slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main className="aas-surface">
        <section className="bg-[#101713] text-white">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-[#f1d382]">
              <GitCompareArrows size={16} /> Comparador
            </div>
            <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
              Compará antes de consultar
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
              Revisá precio, año, kilometraje, financiación, permuta y datos clave en una sola vista.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {selected.length ? (
            <div className="overflow-x-auto rounded-2xl border border-[#152018]/10 bg-white shadow-[0_18px_56px_rgba(21,32,24,0.12)]">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#152018]/10 bg-[#f8faf6]">
                    <th className="w-48 p-4 text-xs font-black uppercase tracking-[0.16em] text-[#667062]">Dato</th>
                    {selected.map((listing) => (
                      <th key={listing.id} className="p-4 align-top">
                        <p className="text-lg font-black text-[#152018]">{listing.title}</p>
                        <Link href={`/publicaciones/${listing.slug}`} className="mt-2 inline-flex items-center gap-2 text-sm font-black text-[#1f6b43]">
                          Ver ficha <ArrowRight size={16} />
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Precio", ...selected.map((item) => formatListingPrices(item).join(" / "))],
                    ["Año", ...selected.map((item) => item.year ?? "Consultar")],
                    ["Kilómetros / horas", ...selected.map((item) => item.mileage ? `${item.mileage.toLocaleString("es-AR")} km` : item.hours_used ? `${item.hours_used.toLocaleString("es-AR")} hs` : "Consultar")],
                    ["Motor", ...selected.map((item) => item.engine ?? "Consultar")],
                    ["Transmisión", ...selected.map((item) => item.transmission ?? "Consultar")],
                    ["Tracción", ...selected.map((item) => item.traction ?? "Consultar")],
                    ["Financiación", ...selected.map((item) => item.financing_available ? "Disponible" : "Consultar")],
                    ["Permuta", ...selected.map((item) => item.accepts_trade_in ? "Acepta" : "No informada")],
                    ["Ubicación", ...selected.map((item) => `${item.location_city}, ${item.location_province}`)],
                  ].map((row) => (
                    <tr key={row[0]?.toString()} className="border-b border-[#152018]/8 last:border-0">
                      {row.map((cell, index) => (
                        <td key={`${row[0]}-${index}`} className={index === 0 ? "bg-[#fbfcf8] p-4 font-black text-[#384239]" : "p-4 font-semibold text-[#4d574c]"}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-xl border border-[#152018]/10 bg-white p-10 text-center shadow-sm">
              <SearchX className="mx-auto text-[#1f6b43]" size={42} />
              <h2 className="mt-4 text-xl font-black">No hay publicaciones para comparar</h2>
              <p className="mt-2 text-[#667062]">Buscá unidades y usá el botón comparar en cada card.</p>
            </div>
          )}

          <div className="mt-8">
            <SearchPanel compact />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
