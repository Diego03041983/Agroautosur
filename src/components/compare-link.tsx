import Link from "next/link";
import { GitCompareArrows } from "lucide-react";

export function CompareLink({ slug, compact = false }: { slug: string; compact?: boolean }) {
  return (
    <Link
      href={`/comparar?items=${slug}`}
      className={
        compact
          ? "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#152018]/12 bg-white px-3 text-xs font-black text-[#152018]"
          : "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#152018]/12 bg-white px-4 text-sm font-black text-[#152018] transition hover:border-[#1f6b43]/40 hover:text-[#1f6b43]"
      }
    >
      <GitCompareArrows size={compact ? 15 : 17} />
      Comparar
    </Link>
  );
}
