import Link from "next/link";
import { ArrowRight, BadgeDollarSign, Search, Sprout } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { agroCategories } from "@/lib/agro-categories";

export const metadata = { title: "Línea agro" };

export default function AgroPage() {
  const columns = [
    agroCategories.slice(0, 13),
    agroCategories.slice(13, 26),
    agroCategories.slice(26),
  ];

  return (
    <>
      <SiteHeader />
      <main className="aas-surface">
        <section className="bg-[#101713] text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.82fr_1fr] lg:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d6a82f]">Línea agro</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">Categorías para comprar, vender o consultar maquinaria y equipos.</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/68">
                Ordenamos la oferta agro por rubro para que cada consulta llegue con contexto: tipo de equipo, condición, financiación, permuta y ubicación.
              </p>
              <div className="mt-7 grid gap-3 sm:flex">
                <Link href="/publicaciones?categoria=tractores" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#d6a82f] px-5 text-sm font-black text-[#152018]">
                  Ver tractores <ArrowRight size={18} />
                </Link>
                <Link href="/vender" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/8 px-5 text-sm font-black text-white">
                  Publicar equipo agro
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Operaciones claras", "Consultas con datos útiles para evaluar rápido.", Sprout],
                ["Financiación", "Equipos y maquinaria con posibilidad de cotizar.", BadgeDollarSign],
                ["Búsqueda activa", "Si no está publicado, dejá el pedido y lo seguimos.", Search],
              ].map(([title, text, Icon]) => (
                <div key={title as string} className="rounded-xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_18px_46px_rgba(0,0,0,0.22)]">
                  <Icon className="text-[#d6a82f]" size={24} />
                  <h2 className="mt-4 text-lg font-black">{title as string}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/60">{text as string}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1f6b43]">Categorías agro</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">Encontrá el rubro correcto</h2>
            </div>
            <Link href="/publicaciones?categoria=agro" className="inline-flex w-fit items-center gap-2 text-sm font-black text-[#1f6b43]">
              Ver toda la línea agro <ArrowRight size={17} />
            </Link>
          </div>

          <div className="rounded-2xl border border-[#152018]/10 bg-white p-4 shadow-[0_18px_56px_rgba(21,32,24,0.1)] sm:p-6">
            <div className="grid gap-x-8 gap-y-1 md:grid-cols-3">
              {columns.map((column, index) => (
                <div key={index} className="grid content-start gap-1">
                  {column.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/publicaciones?categoria=${category.slug}`}
                      className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-bold text-[#183d2a] transition hover:bg-[#edf4e8] hover:text-[#1f6b43]"
                    >
                      <span>{category.name}</span>
                      <ArrowRight size={14} className="opacity-0 transition group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
