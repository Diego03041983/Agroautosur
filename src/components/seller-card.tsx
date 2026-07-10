import { Building2, CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";
import type { Listing } from "@/types/domain";
import { whatsappUrl } from "@/lib/utils";

export function SellerCard({ listing }: { listing: Listing }) {
  const seller =
    listing.seller_type === "internal"
      ? {
          name: "AgroAutoSur Select",
          role: "Operación acompañada por AgroAutoSur",
          response: "Seguimiento comercial ordenado",
        }
      : {
          name: "Vendedor verificado",
          role: listing.seller_type === "agency" ? "Agencia / concesionaria" : "Particular",
          response: "Consulta derivada con datos completos",
        };

  return (
    <div className="rounded-xl border border-[#152018]/10 bg-white p-5 shadow-[0_16px_46px_rgba(21,32,24,0.1)]">
      <div className="flex items-start gap-3">
        <span className="grid size-12 place-items-center rounded-xl bg-[#183d2a] text-white">
          <Building2 size={23} />
        </span>
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1f6b43]">Vendedor</p>
          <h3 className="mt-1 text-xl font-black">{seller.name}</h3>
          <p className="mt-1 text-sm font-semibold text-[#667062]">{seller.role}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-2 text-sm text-[#4d574c]">
        <p className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-[#1f6b43]" /> Datos de contacto protegidos por el CRM
        </p>
        <p className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-[#1f6b43]" /> {seller.response}
        </p>
      </div>

      <a
        href={whatsappUrl(`Hola AgroAutoSur, quiero consultar por ${listing.title}.`)}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#1f6b43] px-4 text-sm font-black text-white"
      >
        Contactar por WhatsApp <MessageCircle size={18} />
      </a>
    </div>
  );
}
