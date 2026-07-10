"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";

export function LeadNoteForm({ leadId }: { leadId: string }) {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submit() {
    setStatus("loading");
    const response = await fetch(`/api/admin/leads/${leadId}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note }),
    });

    if (response.ok) {
      setNote("");
      setStatus("success");
      router.refresh();
      return;
    }

    setStatus("error");
  }

  return (
    <div className="grid gap-3 rounded-xl border border-[#152018]/10 bg-white p-5 shadow-sm">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1f6b43]">Nota interna</p>
        <h2 className="mt-1 text-xl font-black">Agregar seguimiento</h2>
      </div>
      <textarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        rows={4}
        placeholder="Ej: Se contactó por WhatsApp. Pide financiación con entrega..."
        className="aas-field min-h-28 resize-y"
      />
      <button
        type="button"
        disabled={status === "loading" || note.trim().length < 3}
        onClick={submit}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#183d2a] px-4 text-sm font-black text-white disabled:opacity-50"
      >
        Guardar nota <Send size={17} />
      </button>
      {status === "success" ? <p className="text-sm font-bold text-[#1f6b43]">Nota agregada.</p> : null}
      {status === "error" ? <p className="text-sm font-bold text-red-700">No se pudo guardar la nota.</p> : null}
    </div>
  );
}
