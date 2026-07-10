import { ListingCard } from "@/components/listing-card";
import { SearchPanel } from "@/components/search-panel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublishedListings } from "@/lib/listings";
import { SearchX } from "lucide-react";

export const metadata = {
  title: "Publicaciones",
  description: "Listado de autos, pickups, utilitarios, camiones livianos y maquinaria agro publicados en AgroAutoSur.",
};

export default async function ListingsPage() {
  const listings = await getPublishedListings();

  return (
    <>
      <SiteHeader />
      <main className="aas-surface mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#1f6b43]">Publicaciones</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Oportunidades disponibles</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#667062]">
            Autos, pickups, utilitarios y agro con información clara para consultar, comparar y avanzar.
          </p>
          <div className="mt-6">
            <SearchPanel compact />
          </div>
        </div>
        {listings.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-[#152018]/10 bg-white p-10 text-center shadow-sm">
            <SearchX className="mx-auto text-[#1f6b43]" size={42} />
            <h2 className="mt-4 text-xl font-black">No hay publicaciones activas</h2>
            <p className="mx-auto mt-2 max-w-md text-[#667062]">Cuando se publiquen unidades verificadas van a aparecer acá. También podemos buscar la unidad por vos.</p>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
