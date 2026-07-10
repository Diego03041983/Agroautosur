import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeDollarSign, Building2, Calculator, CheckCircle2, Gauge, GitCompareArrows, MapPin, SearchCheck, ShieldCheck } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { ListingCard } from "@/components/listing-card";
import { SearchPanel } from "@/components/search-panel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { categories } from "@/lib/demo-data";
import { getPublishedListings } from "@/lib/listings";
import { formatListingPrices, whatsappUrl } from "@/lib/utils";

export default async function Home() {
  const listings = await getPublishedListings();
  const featured = listings.filter((listing) => listing.is_featured).slice(0, 3);
  const select = listings.filter((listing) => listing.is_select).slice(0, 3);
  return (
    <>
      <SiteHeader />
      <main className="aas-surface">
        <section className="relative overflow-hidden bg-[#121b15] text-white">
          <div className="absolute inset-0 opacity-90 [background:linear-gradient(105deg,#101713_0%,rgba(16,23,19,0.94)_38%,rgba(16,23,19,0.58)_68%,rgba(16,23,19,0.16)_100%),url('/brand/agroautosur-hero-bg.png')] bg-cover bg-[center_right]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f3f5ef] to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 md:pb-20 md:pt-16 lg:px-8">
            <div className="max-w-5xl">
              <BrandLogo variant="light" className="mb-5 w-64 max-w-full" priority />
              <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-[#f1d382] backdrop-blur">
                <ShieldCheck size={16} /> Te ayudamos a comprar mejor
              </div>
              <h1 className="mt-5 max-w-3xl font-[var(--font-slab)] text-[2.55rem] font-black leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
                Autos, pickups y soluciones agro
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8">
                Encontrá una buena opción, compará datos importantes y avanzá con financiación, permuta o venta asistida.
              </p>
              <div className="mt-8 max-w-6xl">
                <SearchPanel />
              </div>
              <div className="mt-5 grid gap-2 text-sm font-bold text-white/78 sm:flex sm:flex-wrap">
                {["Vendé con alguien que te acompañe", "Compará opciones de financiación", "Decinos qué buscás y lo seguimos"].map((claim) => (
                  <span key={claim} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 backdrop-blur">
                    <CheckCircle2 size={16} className="text-[#d6a82f]" /> {claim}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1f6b43]">Categorías</p>
              <h2 className="mt-1 text-2xl font-black">¿Qué estás buscando?</h2>
            </div>
            <Link href="/publicaciones" className="hidden items-center gap-2 text-sm font-black text-[#1f6b43] sm:flex">
              Inventario completo <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
            {categories.map((category) => (
              <Link key={category.id} href={`/publicaciones?categoria=${category.slug}`} className="rounded-xl border border-[#152018]/10 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1f6b43]/35 hover:shadow-lg">
                <p className="text-sm font-black text-[#152018]">{category.name}</p>
                <p className="mt-1 text-xs leading-5 text-[#667062]">{category.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#1f6b43]">Oportunidades destacadas</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Unidades listas para consultar</h2>
            </div>
            <Link href="/publicaciones" className="hidden items-center gap-2 text-sm font-black text-[#1f6b43] sm:flex">
              Ver todas <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {featured.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        <section className="bg-[#101713] py-10 text-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
            <div className="max-w-xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d6a82f]">AgroAutoSur Select</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Unidades destacadas para avanzar con más información.</h2>
              <p className="mt-3 text-sm leading-6 text-white/64">
                Seleccionamos publicaciones con datos claros, fotos visibles y señales comerciales para que puedas consultar sin perder tiempo.
              </p>
              <Link href="/publicaciones" className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#d6a82f] px-4 py-3 text-sm font-black text-[#152018] transition hover:bg-[#e7bf55]">
                Ver publicaciones <ArrowRight size={17} />
              </Link>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {select.map((listing) => (
                <Link
                  key={listing.id}
                  href={`/publicaciones/${listing.slug}`}
                  className="group grid min-h-36 grid-cols-[116px_1fr] overflow-hidden rounded-xl border border-white/10 bg-white/[0.055] shadow-[0_16px_42px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:border-[#d6a82f]/80 hover:bg-white/[0.075]"
                >
                  <div className="relative bg-white/8">
                    {listing.listing_images?.[0] ? (
                      <Image
                        src={listing.listing_images[0].url}
                        alt={listing.listing_images[0].alt ?? listing.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        sizes="116px"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#101713]/20" />
                  </div>
                  <div className="grid gap-2 p-4">
                    <div>
                      <div className="flex flex-wrap gap-1.5">
                        {listing.is_verified ? <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-white">Verificada</span> : null}
                        {listing.financing_available ? <span className="rounded-full bg-[#d6a82f]/18 px-2 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-[#f1d382]">Cotizable</span> : null}
                      </div>
                      <h3 className="mt-2 line-clamp-2 text-base font-black leading-tight">{listing.title}</h3>
                    </div>
                    <div>
                      {formatListingPrices(listing).map((price) => (
                        <p key={price} className="text-sm font-black leading-tight text-[#f1d382]">
                          {price}
                        </p>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-bold text-white/60">
                      <span>{listing.year ?? "A consultar"}</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={13} /> {listing.location_city}
                      </span>
                      {listing.mileage ? (
                        <span className="inline-flex items-center gap-1">
                          <Gauge size={13} /> {listing.mileage.toLocaleString("es-AR")} km
                        </span>
                      ) : listing.hours_used ? (
                        <span className="inline-flex items-center gap-1">
                          <Gauge size={13} /> {listing.hours_used.toLocaleString("es-AR")} hs
                        </span>
                      ) : null}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-3 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {[
            { title: "Vender", text: "Publicación cuidada, precio claro y consultas ordenadas.", href: "/vender", cta: "Cargar unidad", Icon: Building2 },
            { title: "Financiar", text: "Probá entrega, plazo y cuota antes de consultar.", href: "/financiacion", cta: "Cotizar", Icon: BadgeDollarSign },
            { title: "Buscar", text: "Dejá lo que necesitás y lo seguimos como pedido activo.", href: "/buscar", cta: "Pedir búsqueda", Icon: SearchCheck },
            { title: "Agencias", text: "Stock, leads y seguimiento en una mesa comercial.", href: "/agencias", cta: "Ver solución", Icon: Building2 },
          ].map(({ title, text, href, cta, Icon }) => (
            <Link key={title} href={href} className="group rounded-xl border border-[#152018]/10 bg-white p-4 shadow-[0_10px_30px_rgba(21,32,24,0.06)] transition hover:-translate-y-0.5 hover:border-[#1f6b43]/35 hover:shadow-[0_20px_45px_rgba(21,32,24,0.12)]">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#edf4e8] text-[#1f6b43] transition group-hover:bg-[#1f6b43] group-hover:text-white">
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="text-lg font-black leading-tight">{title}</h3>
                  <p className="mt-1 text-sm leading-5 text-[#667062]">{text}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.08em] text-[#1f6b43]">
                    {cta} <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </section>

        <section className="bg-white py-12">
          <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
            {[
              {
                title: "Compará publicaciones",
                text: "Poné unidades lado a lado para revisar precio, año, kilómetros, financiación y permuta.",
                href: "/comparar",
                cta: "Abrir comparador",
                Icon: GitCompareArrows,
              },
              {
                title: "Cotizá financiación",
                text: "Probá entrega y plazo para tener una primera referencia antes de solicitar evaluación.",
                href: "/financiacion",
                cta: "Simular financiación",
                Icon: BadgeDollarSign,
              },
              {
                title: "Evaluá tu unidad",
                text: "Cargá datos básicos y obtené una referencia inicial antes de publicarla.",
                href: "/tasacion",
                cta: "Evaluar ahora",
                Icon: Calculator,
              },
            ].map(({ title, text, href, cta, Icon }) => (
              <Link key={href} href={href} className="rounded-2xl border border-[#152018]/10 bg-[#f8faf6] p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1f6b43]/35 hover:shadow-xl">
                <Icon className="text-[#1f6b43]" size={26} />
                <h2 className="mt-4 text-2xl font-black">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#667062]">{text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#1f6b43]">
                  {cta} <ArrowRight size={17} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-[#183d2a] py-12 text-white">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
            <div>
              <h2 className="text-3xl font-black tracking-tight">¿Querés avanzar con una operación?</h2>
              <p className="mt-2 text-white/75">Contanos qué necesitás y lo dejamos ordenado para darte una respuesta útil.</p>
            </div>
            <a href={whatsappUrl("Hola AgroAutoSur, quiero hacer una consulta.")} className="rounded-lg bg-[#d6a82f] px-5 py-3 text-center text-sm font-black text-[#152018] shadow-[0_12px_28px_rgba(0,0,0,0.18)]">
              Contactar por WhatsApp
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
