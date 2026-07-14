import Link from "next/link";
import { AdminListingStatusAction } from "@/components/admin-listing-status-action";
import { AdminNav } from "@/components/admin-nav";
import { SiteHeader } from "@/components/site-header";
import { requireStaff } from "@/lib/auth";
import { getAdminListings } from "@/lib/listings";
import { formatDateTime, formatListingPrices } from "@/lib/utils";
import type { ListingStatus } from "@/types/domain";

export const metadata = { title: "Admin publicaciones" };

const statuses: { value: ListingStatus | ""; label: string }[] = [
  { value: "", label: "Todas" },
  { value: "pending", label: "Pendientes" },
  { value: "published", label: "Publicadas" },
  { value: "paused", label: "Pausadas" },
  { value: "rejected", label: "Rechazadas" },
  { value: "sold", label: "Vendidas" },
];

export default async function AdminListingsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  await requireStaff();
  const params = await searchParams;
  const status = params.status ?? "";
  const listings = await getAdminListings(status);

  return (
    <>
      <SiteHeader />
      <AdminNav />
      <main className="aas-surface mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1f6b43]">Backoffice</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Publicaciones</h1>
            <p className="mt-1 max-w-2xl text-sm text-[#667062]">Aprobá, pausá o rechazá unidades cargadas por particulares y concesionarias.</p>
          </div>
          <Link href="/admin/backoffice" className="rounded-md border border-[#152018]/12 bg-white px-3 py-2 text-center text-xs font-black">
            Volver a backoffice
          </Link>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto rounded-lg border border-[#152018]/10 bg-white p-2 shadow-sm">
          {statuses.map((item) => (
            <Link
              key={item.value || "all"}
              href={item.value ? `/admin/publicaciones?status=${item.value}` : "/admin/publicaciones"}
              className={`shrink-0 rounded-md px-3 py-2 text-xs font-black ${status === item.value ? "bg-[#183d2a] text-white" : "bg-[#f8faf6] text-[#4d574c]"}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mt-4 overflow-hidden rounded-lg border border-[#152018]/10 bg-white shadow-sm">
          <div className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-[#152018]/10 bg-[#f8faf6] px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-[#667062]">
            <span>Publicación</span>
            <span>Estado</span>
            <span>Acciones</span>
          </div>
          <div className="divide-y divide-[#152018]/8">
            {listings.length ? (
              listings.map((listing) => (
                <div key={listing.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 px-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-[#152018]">{listing.title}</p>
                    <p className="mt-0.5 text-xs text-[#667062]">
                      {listing.location_city}, {listing.location_province} · {formatDateTime(listing.created_at)} · {formatListingPrices(listing).join(" / ")}
                    </p>
                  </div>
                  <span className="rounded-full bg-[#fff5d8] px-2 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-[#6f4e00]">{listing.status}</span>
                  <AdminListingStatusAction listingId={listing.id} currentStatus={listing.status} />
                </div>
              ))
            ) : (
              <p className="px-3 py-8 text-center text-sm font-bold text-[#667062]">No hay publicaciones para este filtro.</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
