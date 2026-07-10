import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, Banknote, CheckCircle2, MapPin, MessageCircle, Repeat2, ShieldCheck } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { CompareLink } from "@/components/compare-link";
import { ListingCard } from "@/components/listing-card";
import { SellerCard } from "@/components/seller-card";
import { ShareListingButton } from "@/components/share-listing-button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getListingBySlug, getPublishedListings } from "@/lib/listings";
import { formatListingPrices, whatsappUrl } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  return {
    title: listing?.title ?? "Publicación",
    description: listing?.description,
  };
}

export default async function ListingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) notFound();

  const related = (await getPublishedListings()).filter((item) => item.id !== listing.id).slice(0, 3);
  const image = listing.listing_images?.[0];
  const prices = formatListingPrices(listing);

  return (
    <>
      <SiteHeader />
      <main className="aas-surface mx-auto grid w-full max-w-7xl gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[1.35fr_0.65fr] lg:px-8">
        <section>
          <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-[#dde4d8] shadow-[0_18px_56px_rgba(21,32,24,0.16)] sm:aspect-[16/9]">
            {image ? <Image src={image.url} alt={image.alt ?? listing.title} fill priority className="object-cover" /> : null}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              {listing.is_verified ? <span className="rounded-md bg-white/95 px-3 py-1.5 text-xs font-black uppercase tracking-[0.1em] text-[#183d2a]">Verificado</span> : null}
              {listing.is_select ? <span className="rounded-md bg-[#152018] px-3 py-1.5 text-xs font-black uppercase tracking-[0.1em] text-[#d6a82f]">AgroAutoSur Select</span> : null}
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-[#152018]/10 bg-white p-5 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#1f6b43]">{listing.category?.name}</p>
            <h1 className="mt-2 text-4xl font-black leading-tight tracking-tight sm:text-5xl">{listing.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[#596256]">
              <span className="flex items-center gap-2"><MapPin size={17} /> {listing.location_city}, {listing.location_province}</span>
              <span>{listing.year}</span>
              {listing.mileage ? <span>{listing.mileage.toLocaleString("es-AR")} km</span> : null}
              {listing.hours_used ? <span>{listing.hours_used.toLocaleString("es-AR")} hs</span> : null}
            </div>
            <div className="mt-5 flex flex-col justify-between gap-4 border-t border-[#152018]/10 pt-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#667062]">Precio publicado</p>
                <p className="mt-1 text-4xl font-black text-[#1f6b43]">{prices[0]}</p>
                {prices[1] ? <p className="mt-1 text-xl font-black text-[#667062]">{prices[1]}</p> : null}
                <p className="mt-2 text-xs font-bold text-[#8a9285]">Valores cargados por el vendedor. No se calculan por conversión automática.</p>
              </div>
              <p className="max-w-sm text-sm leading-6 text-[#667062]">Consultá disponibilidad, financiación y permuta. El contacto queda registrado para seguimiento comercial.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {listing.is_verified ? <Badge title="Verificado" text="Datos revisados" icon={<BadgeCheck size={20} />} tone="green" /> : null}
            {listing.financing_available ? <Badge title="Financiación" text="Cotizá opciones" icon={<Banknote size={20} />} tone="gold" /> : null}
            {listing.accepts_trade_in ? <Badge title="Permuta" text="Cargá tu unidad" icon={<Repeat2 size={20} />} tone="dark" /> : null}
            {listing.is_select ? <Badge title="Select" text="Oportunidad destacada" icon={<BadgeCheck size={20} />} tone="green" /> : null}
          </div>

          <div className="mt-8 grid gap-8 rounded-xl border border-[#152018]/10 bg-white p-5 shadow-sm md:grid-cols-2">
            <div>
              <h2 className="text-xl font-black">Características principales</h2>
              <dl className="mt-4 grid gap-3 text-sm">
                {[
                  ["Marca", listing.brand?.name],
                  ["Combustible", listing.fuel_type],
                  ["Transmisión", listing.transmission],
                  ["Tracción", listing.traction],
                  ["Motor", listing.engine],
                  ["Condición", listing.condition === "used" ? "Usado" : "Nuevo"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 border-b border-[#152018]/10 pb-2">
                    <dt className="font-semibold text-[#667062]">{label}</dt>
                    <dd className="font-bold">{value ?? "Consultar"}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h2 className="text-xl font-black">Descripción</h2>
              <p className="mt-4 leading-7 text-[#4d574c]">{listing.description}</p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-black">Publicaciones relacionadas</h2>
            <div className="mt-4 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <ListingCard key={item.id} listing={item} />
              ))}
            </div>
          </div>
        </section>

        <aside className="grid content-start gap-4 lg:sticky lg:top-24">
          <div className="rounded-xl border border-[#152018]/10 bg-[#101713] p-5 text-white shadow-[0_18px_56px_rgba(21,32,24,0.18)]">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-lg bg-[#d6a82f] text-[#152018]">
                <ShieldCheck size={22} />
              </span>
              <div>
                <p className="text-sm font-black">Operación acompañada</p>
                <p className="text-xs text-white/58">AgroAutoSur registra y ordena la consulta.</p>
              </div>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-white/75">
              <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#d6a82f]" /> Datos de contacto centralizados</p>
              <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#d6a82f]" /> Consulta por financiación o permuta</p>
              <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#d6a82f]" /> Seguimiento comercial claro</p>
            </div>
          </div>
          <a href={whatsappUrl(`Hola AgroAutoSur, quiero consultar por ${listing.title}.`)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#1f6b43] px-4 text-center text-sm font-black text-white shadow-[0_14px_30px_rgba(31,107,67,0.22)]">
            Consultar por WhatsApp <MessageCircle size={18} />
          </a>
          <ShareListingButton title={listing.title} slug={listing.slug} prices={prices} />
          <CompareLink slug={listing.slug} />
          <Link href={`/financiacion?listing=${listing.slug}&price=${listing.price ?? ""}`} className="rounded-lg bg-[#d6a82f] px-4 py-3 text-center text-sm font-black text-[#152018] shadow-[0_12px_28px_rgba(214,168,47,0.22)]">
            Cotizar financiación
          </Link>
          <a href="#consulta" className="rounded-lg border border-[#152018]/15 bg-white px-4 py-3 text-center text-sm font-black">
            Tengo permuta
          </a>
          <div id="consulta">
            <LeadForm
              listingId={listing.id}
              allowTypeSelect
              sourceLabel={listing.title}
              context={{
                listing_title: listing.title,
                listing_price_usd: listing.price_usd,
                listing_price_ars: listing.price_ars,
                category: listing.category?.name,
              }}
            />
          </div>
          <SellerCard listing={listing} />
        </aside>
      </main>
      <SiteFooter />
    </>
  );
}

function Badge({
  title,
  text,
  icon,
  tone,
}: {
  title: string;
  text: string;
  icon: React.ReactNode;
  tone: "green" | "gold" | "dark";
}) {
  const styles = {
    green: "from-[#edf8ee] to-white text-[#1f6b43] ring-[#1f6b43]/15",
    gold: "from-[#fff5d8] to-white text-[#6f4e00] ring-[#d6a82f]/25",
    dark: "from-[#eef1ec] to-white text-[#152018] ring-[#152018]/15",
  };

  return (
    <div className={`flex min-h-20 items-center gap-3 rounded-2xl bg-gradient-to-br p-4 text-sm shadow-[0_16px_42px_rgba(21,32,24,0.1)] ring-1 ${styles[tone]}`}>
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white shadow-sm">{icon}</span>
      <span>
        <span className="block font-black">{title}</span>
        <span className="mt-0.5 block text-xs font-bold opacity-70">{text}</span>
      </span>
    </div>
  );
}
