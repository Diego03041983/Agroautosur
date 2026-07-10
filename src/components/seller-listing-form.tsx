"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { categories } from "@/lib/demo-data";

export function SellerListingForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(formData: FormData) {
    setStatus("loading");
    setMessage("");

    const payload = Object.fromEntries(formData.entries());
    const response = await fetch("/api/seller-submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        accepts_trade_in: formData.get("accepts_trade_in") === "on",
        financing_available: formData.get("financing_available") === "on",
      }),
    });

    if (response.ok) {
      setStatus("success");
      setMessage("Recibimos la unidad. Queda pendiente de revisión antes de publicarse.");
      return;
    }

    const data = await response.json().catch(() => null);
    setStatus("error");
    setMessage(data?.error ?? "No pudimos guardar la unidad. Revisá los datos e intentá otra vez.");
  }

  return (
    <form action={onSubmit} className="grid gap-5 rounded-xl border border-[#152018]/10 bg-white p-5 shadow-[0_18px_56px_rgba(21,32,24,0.12)]">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1f6b43]">Carga de publicación</p>
        <h2 className="mt-1 text-2xl font-black">Datos de la unidad</h2>
        <p className="mt-1 text-sm leading-6 text-[#667062]">La publicación queda en revisión para validar información, fotos y condiciones comerciales.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-bold">
          Rubro
          <select name="category_slug" required className="aas-field">
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-bold">
          Título de publicación
          <input name="title" required placeholder="Ej: Toyota Hilux SRX 4x4 AT" className="aas-field" />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <label className="grid gap-1.5 text-sm font-bold">
          Marca
          <input name="brand" required className="aas-field" />
        </label>
        <label className="grid gap-1.5 text-sm font-bold">
          Modelo
          <input name="model" required className="aas-field" />
        </label>
        <label className="grid gap-1.5 text-sm font-bold">
          Versión
          <input name="version" className="aas-field" />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <label className="grid gap-1.5 text-sm font-bold">
          Año
          <input name="year" type="number" min="1950" max="2035" required className="aas-field" />
        </label>
        <label className="grid gap-1.5 text-sm font-bold">
          Estado
          <select name="condition" className="aas-field">
            <option value="used">Usado</option>
            <option value="new">Nuevo</option>
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-bold">
          Kilómetros
          <input name="mileage" type="number" min="0" className="aas-field" />
        </label>
        <label className="grid gap-1.5 text-sm font-bold">
          Horas de uso
          <input name="hours_used" type="number" min="0" className="aas-field" />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <label className="grid gap-1.5 text-sm font-bold">
          Combustible
          <input name="fuel_type" placeholder="Diesel, nafta..." className="aas-field" />
        </label>
        <label className="grid gap-1.5 text-sm font-bold">
          Transmisión
          <input name="transmission" placeholder="Manual, automática" className="aas-field" />
        </label>
        <label className="grid gap-1.5 text-sm font-bold">
          Tracción
          <input name="traction" placeholder="4x2, 4x4" className="aas-field" />
        </label>
        <label className="grid gap-1.5 text-sm font-bold">
          Motor / potencia
          <input name="engine" placeholder="2.8, 75 HP..." className="aas-field" />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-bold">
          Precio en dólares
          <input name="price_usd" type="number" min="0" placeholder="Opcional" className="aas-field" />
        </label>
        <label className="grid gap-1.5 text-sm font-bold">
          Precio en pesos
          <input name="price_ars" type="number" min="0" placeholder="Opcional" className="aas-field" />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-bold">
          Ciudad
          <input name="location_city" required className="aas-field" />
        </label>
        <label className="grid gap-1.5 text-sm font-bold">
          Provincia
          <input name="location_province" defaultValue="Santa Fe" className="aas-field" />
        </label>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <label className="flex items-center gap-2 rounded-lg border border-[#152018]/10 bg-[#f8faf6] px-3 py-3 text-sm font-black">
          <input name="accepts_trade_in" type="checkbox" className="accent-[#1f6b43]" />
          Acepto permuta
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-[#152018]/10 bg-[#f8faf6] px-3 py-3 text-sm font-black">
          <input name="financing_available" type="checkbox" className="accent-[#1f6b43]" />
          Puede financiarse
        </label>
      </div>

      <label className="grid gap-1.5 text-sm font-bold">
        Descripción
        <textarea name="description" required rows={5} className="aas-field min-h-32 resize-y" placeholder="Estado general, documentación, service, accesorios, detalles importantes..." />
      </label>
      <label className="grid gap-1.5 text-sm font-bold">
        Links de fotos o carpeta compartida
        <textarea name="photo_links" rows={3} className="aas-field min-h-24 resize-y" placeholder="Pegá links de Drive, iCloud, WhatsApp Web o fotos disponibles." />
      </label>

      <button disabled={status === "loading"} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#d6a82f] px-4 text-sm font-black text-[#152018] disabled:opacity-60">
        {status === "loading" ? "Guardando..." : "Enviar a revisión"}
        <Send size={17} />
      </button>
      {message ? (
        <p className={`inline-flex items-start gap-2 rounded-lg px-3 py-2 text-sm font-bold ${status === "error" ? "bg-red-50 text-red-700" : "bg-[#edf4e8] text-[#1f6b43]"}`}>
          {status === "success" ? <CheckCircle2 size={17} /> : null}
          {message}
        </p>
      ) : null}
    </form>
  );
}
