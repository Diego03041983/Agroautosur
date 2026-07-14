"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ListingStatus } from "@/types/domain";

const actions: { status: ListingStatus; label: string; className: string }[] = [
  { status: "published", label: "Aprobar", className: "bg-[#183d2a] text-white" },
  { status: "paused", label: "Pausar", className: "border border-[#152018]/12 text-[#152018]" },
  { status: "rejected", label: "Rechazar", className: "bg-red-50 text-red-700" },
];

export function AdminListingStatusAction({ listingId, currentStatus }: { listingId: string; currentStatus: ListingStatus }) {
  const router = useRouter();
  const [loading, setLoading] = useState<ListingStatus | null>(null);

  async function update(status: ListingStatus) {
    setLoading(status);
    await fetch(`/api/admin/listings/${listingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setLoading(null);
    router.refresh();
  }

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <button
          key={action.status}
          type="button"
          disabled={loading !== null || currentStatus === action.status}
          onClick={() => update(action.status)}
          className={`h-8 rounded-md px-2.5 text-xs font-black disabled:opacity-45 ${action.className}`}
        >
          {loading === action.status ? "..." : action.label}
        </button>
      ))}
    </div>
  );
}
