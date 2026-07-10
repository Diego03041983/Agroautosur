"use client";

import { useMemo, useState } from "react";
import { BadgeDollarSign, Building2, Calculator, CheckCircle2 } from "lucide-react";
import { formatMoney } from "@/lib/utils";

const entities = [
  { name: "Banco aliado", rate: 0.043, minTerm: 12, maxTerm: 48, tag: "Prendario" },
  { name: "Financiera agro", rate: 0.039, minTerm: 6, maxTerm: 36, tag: "Capital de trabajo" },
  { name: "Plan flexible", rate: 0.052, minTerm: 12, maxTerm: 60, tag: "Cuota baja inicial" },
];

export function FinancingCalculator({
  initialPrice = 30000,
  listingTitle,
}: {
  initialPrice?: number;
  listingTitle?: string;
}) {
  const [price, setPrice] = useState(initialPrice);
  const [downPayment, setDownPayment] = useState(Math.round(initialPrice * 0.3));
  const [term, setTerm] = useState(36);

  const amount = Math.max(price - downPayment, 0);
  const options = useMemo(
    () =>
      entities.map((entity) => {
        const monthlyRate = entity.rate;
        const payment =
          amount === 0 ? 0 : (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
        return { ...entity, payment };
      }),
    [amount, term],
  );

  return (
    <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-2xl border border-[#152018]/10 bg-white p-5 shadow-[0_18px_56px_rgba(21,32,24,0.12)]">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-[#183d2a] text-white">
            <Calculator size={22} />
          </span>
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1f6b43]">Cotizador</p>
            <h2 className="text-2xl font-black">Armá una primera opción</h2>
          </div>
        </div>
        {listingTitle ? <p className="mt-4 text-sm font-bold text-[#667062]">Sobre: {listingTitle}</p> : null}
        <div className="mt-5 grid gap-4">
          <label className="grid gap-1.5 text-sm font-bold">
            Valor de referencia en USD
            <input value={price} onChange={(event) => setPrice(Number(event.target.value))} type="number" className="aas-field" />
          </label>
          <label className="grid gap-1.5 text-sm font-bold">
            Entrega inicial
            <input value={downPayment} onChange={(event) => setDownPayment(Number(event.target.value))} type="number" className="aas-field" />
          </label>
          <label className="grid gap-1.5 text-sm font-bold">
            Plazo: {term} meses
            <input value={term} onChange={(event) => setTerm(Number(event.target.value))} min={6} max={60} step={6} type="range" className="accent-[#1f6b43]" />
          </label>
        </div>
        <div className="mt-5 rounded-xl bg-[#f0f3eb] p-4">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#667062]">Monto estimado a financiar</p>
          <p className="mt-1 text-3xl font-black text-[#1f6b43]">{formatMoney(amount, "USD")}</p>
          <p className="mt-2 text-xs font-bold text-[#667062]">La simulación usa el valor en USD cargado. No convierte precios en pesos.</p>
        </div>
      </div>

      <div className="grid gap-3">
        {options.map((option) => (
          <div key={option.name} className="rounded-2xl border border-[#152018]/10 bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <div className="flex items-center gap-2">
                  <Building2 className="text-[#1f6b43]" size={20} />
                  <h3 className="text-xl font-black">{option.name}</h3>
                </div>
                <p className="mt-2 text-sm text-[#667062]">{option.tag}. Sujeto a evaluación crediticia y documentación.</p>
              </div>
              <span className="rounded-full bg-[#fff5d8] px-3 py-1.5 text-xs font-black text-[#6f4e00]">
                {option.minTerm}-{option.maxTerm} meses
              </span>
            </div>
            <div className="mt-5 flex flex-col justify-between gap-3 border-t border-[#152018]/10 pt-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#667062]">Cuota estimada</p>
                <p className="mt-1 text-3xl font-black text-[#152018]">{formatMoney(option.payment, "USD")}</p>
              </div>
              <a href="#solicitud-financiacion" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#d6a82f] px-5 text-sm font-black text-[#152018]">
                Solicitar evaluación <BadgeDollarSign size={18} />
              </a>
            </div>
          </div>
        ))}
        <p className="rounded-xl border border-[#152018]/10 bg-[#f8faf6] p-4 text-sm leading-6 text-[#667062]">
          <CheckCircle2 className="mr-2 inline text-[#1f6b43]" size={17} />
          Esto es una simulación inicial. El equipo puede derivar la operación a entidades disponibles y ajustar condiciones reales.
        </p>
      </div>
    </div>
  );
}
