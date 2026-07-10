"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import type { LeadType } from "@/types/domain";
import { leadTypeLabels } from "@/lib/utils";

export function LeadForm({
  listingId,
  leadType = "listing_interest",
  sourceLabel,
  context,
  allowTypeSelect = false,
}: {
  listingId?: string;
  leadType?: LeadType;
  sourceLabel?: string;
  context?: Record<string, string | number | boolean | null | undefined>;
  allowTypeSelect?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [selectedType, setSelectedType] = useState<LeadType>(leadType);

  async function onSubmit(formData: FormData) {
    setStatus("loading");
    const effectiveType = allowTypeSelect ? selectedType : leadType;
    const response = await fetch("/api/leads", {
      method: "POST",
      body: JSON.stringify({
        listing_id: listingId ?? null,
        lead_type: effectiveType,
        full_name: formData.get("full_name"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        city: formData.get("city"),
        message: formData.get("message"),
        desired_budget: formData.get("desired_budget") || null,
        has_trade_in: effectiveType === "trade_in",
        needs_financing: effectiveType === "financing",
        source_path: window.location.pathname,
        source_label: sourceLabel ?? document.title,
        metadata: {
          user_agent: navigator.userAgent,
          context,
        },
      }),
    });
    setStatus(response.ok ? "success" : "error");
  }

  return (
    <form action={onSubmit} className="grid gap-4 rounded-xl border border-[#152018]/10 bg-white p-5 shadow-[0_16px_46px_rgba(21,32,24,0.1)]">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1f6b43]">Respuesta comercial</p>
        <h3 className="mt-1 text-xl font-black">Solicitar más información</h3>
        <p className="mt-1 text-sm leading-6 text-[#667062]">Dejá tus datos y seguimos la consulta por WhatsApp.</p>
      </div>
      {allowTypeSelect ? (
        <label className="grid gap-1.5 text-sm font-bold">
          Tipo de consulta
          <select value={selectedType} onChange={(event) => setSelectedType(event.target.value as LeadType)} className="aas-field">
            {(["listing_interest", "financing", "trade_in", "wanted"] as LeadType[]).map((type) => (
              <option key={type} value={type}>
                {leadTypeLabels[type]}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      <label className="grid gap-1.5 text-sm font-bold">
        Nombre y apellido
        <input name="full_name" required className="aas-field" />
      </label>
      <label className="grid gap-1.5 text-sm font-bold">
        WhatsApp
        <input name="phone" required className="aas-field" />
      </label>
      <label className="grid gap-1.5 text-sm font-bold">
        Email
        <input name="email" type="email" className="aas-field" />
      </label>
      <label className="grid gap-1.5 text-sm font-bold">
        Ciudad
        <input name="city" className="aas-field" />
      </label>
      <label className="grid gap-1.5 text-sm font-bold">
        Presupuesto estimado
        <input name="desired_budget" type="number" min="1" placeholder="Opcional" className="aas-field" />
      </label>
      <label className="grid gap-1.5 text-sm font-bold">
        Mensaje
        <textarea name="message" rows={4} className="aas-field min-h-28 resize-y" />
      </label>
      <button disabled={status === "loading"} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#d6a82f] px-4 text-sm font-black text-[#152018] shadow-[0_12px_28px_rgba(214,168,47,0.22)] disabled:opacity-60">
        {status === "loading" ? "Enviando..." : "Enviar consulta"}
        <Send size={17} />
      </button>
      {status === "success" ? (
        <p className="inline-flex items-center gap-2 rounded-lg bg-[#edf4e8] px-3 py-2 text-sm font-bold text-[#1f6b43]">
          <CheckCircle2 size={17} /> Consulta recibida. Te contactamos a la brevedad.
        </p>
      ) : null}
      {status === "error" ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-bold text-red-700">No pudimos enviar la consulta. Revisá los datos e intentá otra vez.</p> : null}
    </form>
  );
}
