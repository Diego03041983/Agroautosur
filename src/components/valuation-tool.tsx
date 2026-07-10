"use client";

import { useMemo, useState } from "react";
import { Calculator, CheckCircle2 } from "lucide-react";
import { formatMoney } from "@/lib/utils";

const categoryBase = {
  auto: 18000,
  pickup: 34000,
  utilitario: 24000,
  camion: 38000,
  maquinaria: 52000,
  implemento: 16000,
};

const conditionFactor = {
  excelente: 1.08,
  muy_bueno: 1,
  bueno: 0.9,
  revisar: 0.75,
};

export function ValuationTool() {
  const [category, setCategory] = useState<keyof typeof categoryBase>("pickup");
  const [year, setYear] = useState(2020);
  const [usage, setUsage] = useState(90000);
  const [condition, setCondition] = useState<keyof typeof conditionFactor>("muy_bueno");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  const estimate = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const age = Math.max(currentYear - year, 0);
    const usagePenalty = category === "maquinaria" || category === "implemento"
      ? Math.min(usage / 12000, 0.25)
      : Math.min(usage / 450000, 0.32);
    const agePenalty = Math.min(age * 0.055, 0.48);
    const base = categoryBase[category] * conditionFactor[condition] * (1 - agePenalty) * (1 - usagePenalty);
    const low = Math.max(base * 0.92, 1000);
    const high = Math.max(base * 1.12, low + 500);

    return {
      low: Math.round(low / 100) * 100,
      high: Math.round(high / 100) * 100,
      quickSale: Math.round((low * 0.97) / 100) * 100,
      aspirational: Math.round((high * 1.06) / 100) * 100,
    };
  }, [category, condition, usage, year]);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="rounded-2xl border border-[#152018]/10 bg-white p-5 shadow-[0_18px_56px_rgba(21,32,24,0.12)]">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-[#183d2a] text-white">
            <Calculator size={22} />
          </span>
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1f6b43]">Evaluación inicial</p>
            <h2 className="text-2xl font-black">Cargá los datos de tu unidad</h2>
          </div>
        </div>

        <div className="mt-5 grid gap-4">
          <label className="grid gap-1.5 text-sm font-bold">
            Tipo de unidad
            <select value={category} onChange={(event) => setCategory(event.target.value as keyof typeof categoryBase)} className="aas-field">
              <option value="auto">Auto</option>
              <option value="pickup">Pickup</option>
              <option value="utilitario">Utilitario</option>
              <option value="camion">Camión liviano</option>
              <option value="maquinaria">Maquinaria agrícola</option>
              <option value="implemento">Implemento</option>
            </select>
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-bold">
              Marca
              <input value={brand} onChange={(event) => setBrand(event.target.value)} placeholder="Ej: Toyota" className="aas-field" />
            </label>
            <label className="grid gap-1.5 text-sm font-bold">
              Modelo
              <input value={model} onChange={(event) => setModel(event.target.value)} placeholder="Ej: Hilux SRX" className="aas-field" />
            </label>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-bold">
              Año
              <input value={year} onChange={(event) => setYear(Number(event.target.value))} type="number" className="aas-field" />
            </label>
            <label className="grid gap-1.5 text-sm font-bold">
              Km u horas
              <input value={usage} onChange={(event) => setUsage(Number(event.target.value))} type="number" className="aas-field" />
            </label>
          </div>
          <label className="grid gap-1.5 text-sm font-bold">
            Estado general
            <select value={condition} onChange={(event) => setCondition(event.target.value as keyof typeof conditionFactor)} className="aas-field">
              <option value="excelente">Excelente</option>
              <option value="muy_bueno">Muy bueno</option>
              <option value="bueno">Bueno</option>
              <option value="revisar">A revisar</option>
            </select>
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-[#152018]/10 bg-[#101713] p-5 text-white shadow-[0_18px_56px_rgba(21,32,24,0.18)]">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#d6a82f]">Resultado orientativo</p>
        <h2 className="mt-2 text-3xl font-black">
          {brand || model ? `${brand} ${model}`.trim() : "Tu unidad"}
        </h2>
        <div className="mt-6 rounded-2xl bg-white p-5 text-[#152018]">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#667062]">Rango sugerido en USD</p>
          <p className="mt-2 text-4xl font-black text-[#1f6b43]">
            {formatMoney(estimate.low, "USD")} - {formatMoney(estimate.high, "USD")}
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-[#f8faf6] p-4">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[#667062]">Para vender más rápido</p>
              <p className="mt-1 text-2xl font-black">{formatMoney(estimate.quickSale, "USD")}</p>
            </div>
            <div className="rounded-xl bg-[#fff5d8] p-4">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[#6f4e00]">Precio aspiracional</p>
              <p className="mt-1 text-2xl font-black">{formatMoney(estimate.aspirational, "USD")}</p>
            </div>
          </div>
        </div>
        <div className="mt-5 grid gap-2 text-sm text-white/75">
          <p className="flex gap-2"><CheckCircle2 className="mt-0.5 shrink-0 text-[#d6a82f]" size={17} /> Es una referencia preliminar, no una tasación final.</p>
          <p className="flex gap-2"><CheckCircle2 className="mt-0.5 shrink-0 text-[#d6a82f]" size={17} /> No usa conversión automática a pesos. El vendedor puede cargar ambos valores manualmente.</p>
          <p className="flex gap-2"><CheckCircle2 className="mt-0.5 shrink-0 text-[#d6a82f]" size={17} /> Para una evaluación final hacen falta fotos, documentación y revisión del estado.</p>
        </div>
      </div>
    </div>
  );
}
