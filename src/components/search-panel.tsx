import { ArrowRight, BadgeDollarSign, Calendar, MapPin, Repeat2, Search, SlidersHorizontal } from "lucide-react";
import { categories } from "@/lib/demo-data";

export function SearchPanel({ compact = false }: { compact?: boolean }) {
  const brands = ["Toyota", "Volkswagen", "Ford", "Chevrolet", "John Deere"];

  return (
    <form
      action="/publicaciones"
      className="overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_28px_80px_rgba(21,32,24,0.22)] ring-1 ring-[#152018]/8"
    >
      {!compact ? (
        <div className="flex flex-col justify-between gap-2 bg-[#f8faf6] px-4 py-4 sm:flex-row sm:items-end sm:px-5">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#1f6b43]">Búsqueda</p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-[#152018]">Buscá por tipo, marca o modelo</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#667062]">Usá los filtros si ya tenés una idea clara de lo que querés ver.</p>
        </div>
      ) : null}

      <div className="p-4 sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <label className="flex min-h-16 items-center gap-3 rounded-xl border border-[#152018]/12 bg-white px-4 shadow-[inset_0_1px_0_rgba(21,32,24,0.04)] focus-within:border-[#1f6b43] focus-within:ring-4 focus-within:ring-[#1f6b43]/10">
            <Search size={22} className="shrink-0 text-[#1f6b43]" />
            <span className="sr-only">Buscar</span>
            <input
              name="q"
              placeholder="Ej: Hilux 4x4, Amarok, tractor 75 hp, utilitario..."
              className="w-full bg-transparent text-base font-semibold text-[#152018] outline-none placeholder:text-[#8a9285]"
            />
          </label>
          <button className="inline-flex min-h-16 items-center justify-center gap-2 rounded-xl bg-[#d6a82f] px-6 text-sm font-black text-[#152018] shadow-[0_12px_28px_rgba(214,168,47,0.22)] transition hover:bg-[#e4bd54]">
            {compact ? <SlidersHorizontal size={18} /> : <ArrowRight size={18} />}
            {compact ? "Aplicar filtros" : "Buscar"}
          </button>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-12">
          <Field label="Rubro" className="lg:col-span-2">
            <select name="categoria" className="aas-search-field">
              <option value="">Todos</option>
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Marca" className="lg:col-span-2">
            <select name="marca" className="aas-search-field">
              <option value="">Todas</option>
              {brands.map((brand) => (
                <option key={brand} value={brand.toLowerCase().replaceAll(" ", "-")}>
                  {brand}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Modelo" className="lg:col-span-2">
            <input name="modelo" placeholder="SRX, Comfortline" className="aas-search-field" />
          </Field>

          <Field label="Operación" className="lg:col-span-2">
            <select name="operacion" className="aas-search-field">
              <option value="">Comprar</option>
              <option value="financiacion">Quiero financiar</option>
              <option value="permuta">Tengo permuta</option>
            </select>
          </Field>

          <Field label="Año" className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <Calendar className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#667062]" size={16} />
                <input name="anio_desde" type="number" placeholder="Desde" className="aas-search-field pl-9" />
              </div>
              <input name="anio_hasta" type="number" placeholder="Hasta" className="aas-search-field" />
            </div>
          </Field>

          <Field label="Precio hasta" className="lg:col-span-2">
            <input name="precio_hasta" type="number" placeholder="USD" className="aas-search-field" />
          </Field>

          <Field label="Ubicación" className="lg:col-span-3">
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#667062]" size={16} />
              <input name="ubicacion" placeholder="Ciudad o zona" className="aas-search-field pl-9" />
            </div>
          </Field>

          <div className="grid gap-2 lg:col-span-3">
            <span className="text-[11px] font-black uppercase tracking-[0.14em] text-[#667062]">Condiciones</span>
            <div className="grid min-h-12 grid-cols-2 overflow-hidden rounded-xl border border-[#152018]/12 bg-[#f8faf6]">
              <label className="flex items-center justify-center gap-2 border-r border-[#152018]/10 px-3 text-xs font-black text-[#183d2a]">
                <input type="checkbox" name="financiacion" value="true" className="accent-[#1f6b43]" />
                Financiación
              </label>
              <label className="flex items-center justify-center gap-2 px-3 text-xs font-black text-[#183d2a]">
                <input type="checkbox" name="permuta" value="true" className="accent-[#1f6b43]" />
                Permuta
              </label>
            </div>
          </div>
        </div>
      </div>

      {!compact ? (
        <div className="mt-3 flex flex-wrap gap-2 border-t border-[#152018]/10 pt-3">
          {[
            ["Pickups con financiación", "/publicaciones?categoria=pickups&operacion=financiacion", BadgeDollarSign],
            ["Aceptan permuta", "/publicaciones?operacion=permuta", Repeat2],
            ["Maquinaria agrícola", "/publicaciones?categoria=maquinaria-agricola", SlidersHorizontal],
          ].map(([label, href, Icon]) => (
            <a key={label as string} href={href as string} className="inline-flex items-center gap-2 rounded-full bg-[#eef3ea] px-3 py-2 text-xs font-black text-[#183d2a]">
              <Icon size={15} /> {label as string}
            </a>
          ))}
        </div>
      ) : null}
    </form>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`grid gap-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#667062] ${className}`}>
      {label}
      {children}
    </label>
  );
}
