import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { LeadStatus, LeadType } from "@/types/domain";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(value: number | null, currency = "USD") {
  if (!value) return "Consultar";

  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatListingPrices({
  price,
  currency,
  price_usd,
  price_ars,
}: {
  price?: number | null;
  currency?: "ARS" | "USD";
  price_usd?: number | null;
  price_ars?: number | null;
}) {
  const usd = price_usd ?? (currency === "USD" ? price : null);
  const ars = price_ars ?? (currency === "ARS" ? price : null);

  if (!usd && !ars) return ["Consultar"];

  return [
    usd ? formatMoney(usd, "USD") : null,
    ars ? formatMoney(ars, "ARS") : null,
  ].filter(Boolean) as string[];
}

export function whatsappUrl(message: string) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "5493410000000";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const leadStatusLabels: Record<LeadStatus, string> = {
  new: "Nuevo",
  contacted: "Contactado",
  interested: "Interesado",
  in_financing: "En financiación",
  in_negotiation: "En negociación",
  closed: "Cerrado",
  lost: "Perdido",
};

export const leadStatuses: LeadStatus[] = [
  "new",
  "contacted",
  "interested",
  "in_financing",
  "in_negotiation",
  "closed",
  "lost",
];

export const leadTypeLabels: Record<LeadType, string> = {
  listing_interest: "Interés por publicación",
  financing: "Solicitud de financiación",
  trade_in: "Permuta",
  wanted: "Busco algo específico",
  sell_request: "Quiero vender",
  general_contact: "Contacto general",
};

export const leadTypes: LeadType[] = [
  "listing_interest",
  "financing",
  "trade_in",
  "sell_request",
  "wanted",
  "general_contact",
];

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

export function leadWhatsappUrl({
  fullName,
  listingTitle,
  leadType,
}: {
  fullName: string;
  listingTitle?: string | null;
  leadType: LeadType;
}) {
  const context = listingTitle ? ` por ${listingTitle}` : "";
  return whatsappUrl(
    `Hola ${fullName}, soy de AgroAutoSur. Recibimos tu consulta de ${leadTypeLabels[leadType].toLowerCase()}${context}. ¿Podemos avanzar por acá?`,
  );
}
