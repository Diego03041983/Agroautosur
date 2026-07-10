"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { whatsappUrl } from "@/lib/utils";

type ShareListingButtonProps = {
  title: string;
  slug: string;
  compact?: boolean;
  prices?: string[];
};

export function ShareListingButton({ title, slug, compact = false, prices = [] }: ShareListingButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = `${window.location.origin}/publicaciones/${slug}`;
    const priceText = prices.length ? `\nPrecio: ${prices.join(" / ")}` : "";
    const text = `Mirá esta publicación de AgroAutoSur:\n${title}${priceText}\n${url}`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        return;
      }
    }

    try {
      await navigator.clipboard?.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // WhatsApp remains the useful fallback when clipboard is unavailable.
    }

    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={
        compact
          ? "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#152018]/12 bg-white px-3 text-xs font-black text-[#152018] transition hover:border-[#1f6b43]/40 hover:text-[#1f6b43]"
          : "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#152018]/12 bg-white px-4 text-sm font-black text-[#152018] transition hover:border-[#1f6b43]/40 hover:text-[#1f6b43]"
      }
      aria-label={`Compartir ${title}`}
    >
      {copied ? <Check size={compact ? 15 : 17} /> : <Share2 size={compact ? 15 : 17} />}
      {compact ? "Compartir" : copied ? "Link copiado" : "Compartir"}
    </button>
  );
}
