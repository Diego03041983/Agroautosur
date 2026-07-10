export type UserRole = "super_admin" | "admin" | "agency" | "seller" | "visitor";

export type ListingStatus =
  | "draft"
  | "pending"
  | "published"
  | "paused"
  | "sold"
  | "rejected";

export type LeadStatus =
  | "new"
  | "contacted"
  | "interested"
  | "in_financing"
  | "in_negotiation"
  | "closed"
  | "lost";

export type LeadType =
  | "listing_interest"
  | "financing"
  | "trade_in"
  | "wanted"
  | "sell_request"
  | "general_contact";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
};

export type ListingImage = {
  id: string;
  listing_id: string;
  url: string;
  alt: string | null;
  sort_order: number;
};

export type Listing = {
  id: string;
  title: string;
  slug: string;
  category_id: string;
  category?: Category | null;
  brand_id: string | null;
  brand?: Brand | null;
  model_id: string | null;
  year: number | null;
  price: number | null;
  currency: "ARS" | "USD";
  price_usd?: number | null;
  price_ars?: number | null;
  location_city: string;
  location_province: string;
  description: string;
  condition: "new" | "used";
  mileage: number | null;
  fuel_type: string | null;
  transmission: string | null;
  traction: string | null;
  engine: string | null;
  hours_used: number | null;
  accepts_trade_in: boolean;
  financing_available: boolean;
  is_verified: boolean;
  is_select: boolean;
  is_featured: boolean;
  status: ListingStatus;
  seller_type: "agency" | "individual" | "internal";
  organization_id: string | null;
  owner_profile_id: string | null;
  created_at: string;
  updated_at: string;
  listing_images?: ListingImage[];
};

export type LeadInput = {
  listing_id?: string | null;
  lead_type: LeadType;
  full_name: string;
  phone: string;
  email?: string | null;
  city?: string | null;
  message?: string | null;
  has_trade_in?: boolean;
  needs_financing?: boolean;
  desired_budget?: number | null;
  source_path?: string | null;
  source_label?: string | null;
  metadata?: Record<string, unknown>;
};

export type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url?: string | null;
};

export type LeadNote = {
  id: string;
  lead_id: string;
  author_profile_id: string | null;
  note: string;
  created_at: string;
  author_profile?: Profile | null;
};

export type Lead = {
  id: string;
  listing_id: string | null;
  listing?: Pick<
    Listing,
    "id" | "title" | "slug" | "price" | "currency" | "price_usd" | "price_ars" | "location_city" | "location_province"
  > | null;
  lead_type: LeadType;
  full_name: string;
  phone: string;
  email: string | null;
  city: string | null;
  message: string | null;
  has_trade_in: boolean;
  needs_financing: boolean;
  desired_budget: number | null;
  status: LeadStatus;
  assigned_to: string | null;
  assigned_profile?: Profile | null;
  source_path?: string | null;
  source_label?: string | null;
  metadata?: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
  lead_notes?: LeadNote[];
};

export type LeadFilters = {
  status?: LeadStatus | "";
  lead_type?: LeadType | "";
  listing_id?: string;
  assigned_to?: string;
  date_from?: string;
  date_to?: string;
};
