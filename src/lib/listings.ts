import { demoListings } from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/server";
import type { Listing } from "@/types/domain";

const listingSelect = `
  *,
  category:categories(*),
  brand:brands(*),
  listing_images(*)
`;

export async function getPublishedListings(): Promise<Listing[]> {
  const supabase = await createClient();
  if (!supabase) return demoListings;

  const { data, error } = await supabase
    .from("listings")
    .select(listingSelect)
    .eq("status", "published")
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error || !data?.length) return demoListings;
  return data as Listing[];
}

export async function getAdminListings(status?: string): Promise<Listing[]> {
  const supabase = await createClient();
  if (!supabase) return demoListings;

  let query = supabase
    .from("listings")
    .select(listingSelect)
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) return [];
  return (data ?? []) as Listing[];
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const supabase = await createClient();
  if (!supabase) return demoListings.find((listing) => listing.slug === slug) ?? null;

  const { data, error } = await supabase
    .from("listings")
    .select(listingSelect)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) return demoListings.find((listing) => listing.slug === slug) ?? null;
  return data as Listing;
}
