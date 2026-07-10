import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0f1712] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.35fr_0.8fr_0.8fr_1fr] lg:px-8">
        <div>
          <BrandLogo variant="light" className="w-60 max-w-full" />
          <p className="mt-3 max-w-md text-sm leading-6 text-white/68">
            Vehículos, maquinaria y oportunidades seleccionadas para comprar, vender o financiar con acompañamiento real.
          </p>
          <div className="mt-5 h-1 w-24 rounded-full bg-[#d6a82f]" />
        </div>
        <div className="grid content-start gap-2 text-sm text-white/75">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#d6a82f]">Comprar</p>
          <Link href="/publicaciones">Publicaciones</Link>
          <Link href="/comparar">Comparador</Link>
          <Link href="/financiacion">Financiación</Link>
          <Link href="/agro">Línea agro</Link>
          <Link href="/buscar">Buscamos por vos</Link>
        </div>
        <div className="grid content-start gap-2 text-sm text-white/75">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#d6a82f]">Vender</p>
          <Link href="/vender">Quiero vender</Link>
          <Link href="/tasacion">Evaluar mi unidad</Link>
          <Link href="/agencias">Agencias</Link>
          <Link href="/que-es-agroautosur">Qué es AgroAutoSur</Link>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <p className="text-sm font-black">Canales comerciales</p>
          <p className="mt-2 text-sm leading-6 text-white/65">Cada consulta queda ordenada para responder mejor, comparar opciones y avanzar sin perder datos.</p>
          <Link href="/admin">Panel administrativo</Link>
        </div>
      </div>
    </footer>
  );
}
