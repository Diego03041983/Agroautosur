import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Gauge, MapPin, MessageCircle } from "lucide-react";
import { CompareLink } from "@/components/compare-link";
import { ShareListingButton } from "@/components/share-listing-button";
import type { Listing } from "@/types/domain";
import { formatListingPrices } from "@/lib/utils";

export function ListingCard({ listing }: { listing: Listing }) {
  const image = listing.listing_images?.[0];
  const prices = formatListingPrices(listing);

  return (
    <article className="group overflow-hidden rounded-xl border border-[#152018]/10 bg-white shadow-[0_12px_36px_rgba(21,32,24,0.08)] transition duration-200 hover:-translate-y-1 hover:border-[#1f6b43]/35 hover:shadow-[0_24px_60px_rgba(21,32,24,0.16)]">
      <Link href={`/publicaciones/${listing.slug}`} className="block">
        <div className="relative aspect-[4/3] bg-[#dde4d8]">
          {image ? (
            <Image src={image.url} alt={image.alt ?? listing.title} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" sizes="(min-width: 1024px) 33vw, 100vw" />
          ) : null}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {listing.is_verified ? <span className="rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-[#183d2a] shadow-lg">Verificado</span> : null}
            {listing.is_select ? <span className="rounded-full bg-[#152018] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-[#e6b83f] shadow-lg">Select</span> : null}
          </div>
          <div className="absolute bottom-3 left-3 rounded-md bg-white/94 px-2.5 py-1 text-xs font-black text-[#152018]">
            {listing.category?.name ?? "Publicación"}
          </div>
        </div>
      </Link>
      <div className="grid gap-4 p-4 sm:p-5">
        <Link href={`/publicaciones/${listing.slug}`} className="block">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#6d7569]">
              {listing.year ?? "A consultar"} · {listing.seller_type === "internal" ? "AgroAutoSur" : "Disponible"}
            </p>
            <h3 className="mt-1 line-clamp-2 text-xl font-black leading-tight text-[#152018]">{listing.title}</h3>
          </div>
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-2xl font-black leading-none text-[#1f6b43]">{prices[0]}</p>
              {prices[1] ? <p className="mt-1 text-sm font-black text-[#667062]">{prices[1]}</p> : null}
            </div>
            {listing.mileage ? (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#f0f3eb] px-2 py-1 text-xs font-bold text-[#596256]">
                <Gauge size={14} /> {listing.mileage.toLocaleString("es-AR")} km
              </span>
            ) : null}
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#596256]">
            <MapPin size={16} className="text-[#1f6b43]" /> {listing.location_city}, {listing.location_province}
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-black text-[#384239]">
            {listing.financing_available ? <span className="rounded-full bg-[#fff5d8] px-3 py-1.5 text-[#6f4e00] shadow-sm">Cotizable</span> : null}
            {listing.accepts_trade_in ? <span className="rounded-full bg-[#edf4e8] px-3 py-1.5 text-[#1f6b43] shadow-sm">Toma permuta</span> : null}
            <span className="inline-flex items-center gap-1 rounded-full bg-[#eef1ec] px-3 py-1.5 shadow-sm">
              <BadgeCheck size={14} /> {listing.condition === "used" ? "Usado" : "Nuevo"}
            </span>
          </div>
        </Link>
        <div className="grid grid-cols-[1fr_auto_auto] gap-2">
          <Link href={`/publicaciones/${listing.slug}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#152018] px-4 text-sm font-black text-white transition group-hover:bg-[#1f6b43]">
            Ver detalle <MessageCircle size={17} />
          </Link>
          <ShareListingButton title={listing.title} slug={listing.slug} prices={prices} compact />
          <CompareLink slug={listing.slug} compact />
        </div>
      </div>
    </article>
  );
}
