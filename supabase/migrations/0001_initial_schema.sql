create extension if not exists "pgcrypto";

create type public.app_role as enum ('super_admin', 'admin', 'agency', 'seller', 'visitor');
create type public.listing_status as enum ('draft', 'pending', 'published', 'paused', 'sold', 'rejected');
create type public.lead_status as enum ('new', 'contacted', 'interested', 'in_financing', 'in_negotiation', 'closed', 'lost');
create type public.lead_type as enum ('listing_interest', 'financing', 'trade_in', 'wanted', 'sell_request', 'general_contact');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  type text not null default 'agency',
  city text,
  province text default 'Santa Fe',
  phone text,
  email text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.users_roles (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role public.app_role not null,
  organization_id uuid references public.organizations(id) on delete set null,
  primary key (profile_id, role)
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  icon text,
  sort_order int not null default 0,
  is_active boolean not null default true
);

create table public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique
);

create table public.models (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references public.brands(id) on delete cascade,
  name text not null,
  slug text not null,
  unique (brand_id, slug)
);

create table public.listings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category_id uuid not null references public.categories(id),
  brand_id uuid references public.brands(id),
  model_id uuid references public.models(id),
  year int,
  price numeric(14,2),
  currency text not null default 'USD',
  location_city text not null,
  location_province text not null default 'Santa Fe',
  description text not null,
  condition text not null default 'used',
  mileage int,
  fuel_type text,
  transmission text,
  traction text,
  engine text,
  hours_used int,
  accepts_trade_in boolean not null default false,
  financing_available boolean not null default false,
  is_verified boolean not null default false,
  is_select boolean not null default false,
  is_featured boolean not null default false,
  status public.listing_status not null default 'draft',
  seller_type text not null default 'individual',
  organization_id uuid references public.organizations(id),
  owner_profile_id uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.listing_images (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  storage_path text,
  url text not null,
  alt text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.listing_specs_vehicle (
  listing_id uuid primary key references public.listings(id) on delete cascade,
  doors int,
  color text,
  version text,
  chassis text
);

create table public.listing_specs_agro (
  listing_id uuid primary key references public.listings(id) on delete cascade,
  power_hp int,
  working_width text,
  crop_type text,
  hydraulic_outlets int
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references public.listings(id) on delete set null,
  lead_type public.lead_type not null,
  full_name text not null,
  phone text not null,
  email text,
  city text,
  message text,
  has_trade_in boolean not null default false,
  needs_financing boolean not null default false,
  desired_budget numeric(14,2),
  status public.lead_status not null default 'new',
  assigned_to uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.lead_notes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  author_profile_id uuid references public.profiles(id),
  note text not null,
  created_at timestamptz not null default now()
);

create table public.financing_requests (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  requested_amount numeric(14,2),
  down_payment numeric(14,2),
  term_months int,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table public.trade_in_requests (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  brand text,
  model text,
  year int,
  mileage int,
  estimated_value numeric(14,2),
  notes text,
  created_at timestamptz not null default now()
);

create table public.wanted_requests (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  category_id uuid references public.categories(id),
  budget_min numeric(14,2),
  budget_max numeric(14,2),
  desired_features text,
  created_at timestamptz not null default now()
);

create table public.verification_checklists (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  documentation_ok boolean not null default false,
  ownership_ok boolean not null default false,
  photos_ok boolean not null default false,
  mechanical_review_ok boolean not null default false,
  notes text,
  created_at timestamptz not null default now()
);

create table public.featured_slots (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  slot_key text not null,
  sort_order int not null default 0,
  starts_at timestamptz,
  ends_at timestamptz
);

create table public.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create index listings_status_idx on public.listings(status);
create index listings_featured_idx on public.listings(is_featured, created_at desc);
create index leads_status_idx on public.leads(status, created_at desc);

create or replace function public.has_role(required_role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.users_roles
    where profile_id = auth.uid() and role = required_role
  );
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.has_role('super_admin') or public.has_role('admin');
$$;

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.users_roles enable row level security;
alter table public.categories enable row level security;
alter table public.brands enable row level security;
alter table public.models enable row level security;
alter table public.listings enable row level security;
alter table public.listing_images enable row level security;
alter table public.listing_specs_vehicle enable row level security;
alter table public.listing_specs_agro enable row level security;
alter table public.leads enable row level security;
alter table public.lead_notes enable row level security;
alter table public.financing_requests enable row level security;
alter table public.trade_in_requests enable row level security;
alter table public.wanted_requests enable row level security;
alter table public.verification_checklists enable row level security;
alter table public.featured_slots enable row level security;
alter table public.settings enable row level security;

create policy "public read active categories" on public.categories for select using (is_active = true);
create policy "public read brands" on public.brands for select using (true);
create policy "public read models" on public.models for select using (true);
create policy "public read published listings" on public.listings for select using (status = 'published');
create policy "public read published listing images" on public.listing_images for select using (
  exists (select 1 from public.listings l where l.id = listing_id and l.status = 'published')
);

create policy "staff manage categories" on public.categories for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage brands" on public.brands for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage models" on public.models for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage all listings" on public.listings for all using (public.is_staff()) with check (public.is_staff());
create policy "owners manage own listings" on public.listings for all
  using (owner_profile_id = auth.uid())
  with check (owner_profile_id = auth.uid());
create policy "agency manage org listings" on public.listings for all
  using (
    exists (
      select 1 from public.users_roles ur
      where ur.profile_id = auth.uid()
        and ur.role = 'agency'
        and ur.organization_id = listings.organization_id
    )
  )
  with check (
    exists (
      select 1 from public.users_roles ur
      where ur.profile_id = auth.uid()
        and ur.role = 'agency'
        and ur.organization_id = listings.organization_id
    )
  );

create policy "staff manage listing images" on public.listing_images for all using (public.is_staff()) with check (public.is_staff());
create policy "owners manage listing images" on public.listing_images for all
  using (exists (select 1 from public.listings l where l.id = listing_id and l.owner_profile_id = auth.uid()))
  with check (exists (select 1 from public.listings l where l.id = listing_id and l.owner_profile_id = auth.uid()));

create policy "anyone can create leads" on public.leads for insert with check (true);
create policy "staff read leads" on public.leads for select using (public.is_staff());
create policy "staff update leads" on public.leads for update using (public.is_staff()) with check (public.is_staff());
create policy "staff manage lead notes" on public.lead_notes for all using (public.is_staff()) with check (public.is_staff());

create policy "staff manage financing" on public.financing_requests for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage trade ins" on public.trade_in_requests for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage wanted" on public.wanted_requests for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage verification" on public.verification_checklists for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage featured slots" on public.featured_slots for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage settings" on public.settings for all using (public.is_staff()) with check (public.is_staff());
