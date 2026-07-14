alter table public.organizations
  add column if not exists commercial_vertical text not null default 'vehicle_dealer',
  add column if not exists can_sell_vehicles boolean not null default true,
  add column if not exists can_sell_agro boolean not null default false,
  add column if not exists can_offer_services boolean not null default false,
  add column if not exists accepts_cash boolean not null default true,
  add column if not exists accepts_financing boolean not null default false,
  add column if not exists accepts_trade_in boolean not null default false,
  add column if not exists accepts_agrocanje boolean not null default false,
  add column if not exists agrocanje_terms jsonb not null default '{}'::jsonb;

comment on column public.organizations.commercial_vertical is
  'Tipo comercial principal: vehicle_dealer, agro_dealer, mixed_dealer, service_provider. Proveedor agro se modela como organización comercial, no como panel separado.';

create table if not exists public.organization_payment_methods (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  method text not null,
  is_enabled boolean not null default true,
  terms jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, method)
);

create table if not exists public.listing_payment_options (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  method text not null,
  is_enabled boolean not null default true,
  terms jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (listing_id, method)
);

alter table public.agro_provider_profiles
  add column if not exists migrated_to_commercial_account boolean not null default true;

comment on table public.agro_provider_profiles is
  'Perfil complementario para organizaciones comerciales con vertical agro. No representa un panel separado.';

alter table public.provider_catalog_items
  add column if not exists organization_id uuid references public.organizations(id) on delete cascade;

update public.provider_catalog_items pci
set organization_id = app.organization_id
from public.agro_provider_profiles app
where pci.provider_id = app.id
  and pci.organization_id is null
  and app.organization_id is not null;

alter table public.quote_requests
  add column if not exists target_organization_id uuid references public.organizations(id) on delete set null,
  add column if not exists commercial_vertical text not null default 'agro';

update public.quote_requests qr
set target_organization_id = app.organization_id
from public.agro_provider_profiles app
where qr.provider_id = app.id
  and qr.target_organization_id is null
  and app.organization_id is not null;

alter table public.agrocanje_requests
  add column if not exists seller_organization_id uuid references public.organizations(id) on delete set null,
  add column if not exists payment_option_id uuid references public.listing_payment_options(id) on delete set null,
  add column if not exists enabled_by_organization boolean not null default true,
  add column if not exists grain_delivery_deadline date,
  add column if not exists grain_delivery_reference text;

update public.agrocanje_requests
set seller_organization_id = organization_id
where seller_organization_id is null
  and organization_id is not null;

insert into public.organization_payment_methods (organization_id, method, is_enabled, terms)
select id, 'cash', accepts_cash, '{}'::jsonb
from public.organizations
on conflict (organization_id, method) do update set is_enabled = excluded.is_enabled;

insert into public.organization_payment_methods (organization_id, method, is_enabled, terms)
select id, 'financing', accepts_financing, '{}'::jsonb
from public.organizations
on conflict (organization_id, method) do update set is_enabled = excluded.is_enabled;

insert into public.organization_payment_methods (organization_id, method, is_enabled, terms)
select id, 'trade_in', accepts_trade_in, '{}'::jsonb
from public.organizations
on conflict (organization_id, method) do update set is_enabled = excluded.is_enabled;

insert into public.organization_payment_methods (organization_id, method, is_enabled, terms)
select id, 'agrocanje', accepts_agrocanje, agrocanje_terms
from public.organizations
on conflict (organization_id, method) do update set
  is_enabled = excluded.is_enabled,
  terms = excluded.terms;

insert into public.listing_payment_options (listing_id, method, is_enabled, terms)
select id, 'financing', financing_available, '{}'::jsonb
from public.listings
on conflict (listing_id, method) do update set is_enabled = excluded.is_enabled;

insert into public.listing_payment_options (listing_id, method, is_enabled, terms)
select id, 'trade_in', accepts_trade_in, '{}'::jsonb
from public.listings
on conflict (listing_id, method) do update set is_enabled = excluded.is_enabled;

create index if not exists organization_payment_methods_org_idx on public.organization_payment_methods(organization_id, method);
create index if not exists listing_payment_options_listing_idx on public.listing_payment_options(listing_id, method);
create index if not exists organizations_vertical_idx on public.organizations(commercial_vertical);
create index if not exists agrocanje_seller_org_idx on public.agrocanje_requests(seller_organization_id, status);
create index if not exists quote_requests_target_org_idx on public.quote_requests(target_organization_id, status);

alter table public.organization_payment_methods enable row level security;
alter table public.listing_payment_options enable row level security;

create policy "staff manage organization payment methods" on public.organization_payment_methods for all
  using (public.is_staff())
  with check (public.is_staff());

create policy "org members read organization payment methods" on public.organization_payment_methods for select
  using (exists (
    select 1 from public.organization_members om
    where om.organization_id = organization_payment_methods.organization_id
      and om.profile_id = auth.uid()
  ));

create policy "public read listing payment options" on public.listing_payment_options for select
  using (exists (
    select 1 from public.listings l
    where l.id = listing_payment_options.listing_id
      and l.status = 'published'
  ));

create policy "staff manage listing payment options" on public.listing_payment_options for all
  using (public.is_staff())
  with check (public.is_staff());

create policy "owners manage own listing payment options" on public.listing_payment_options for all
  using (exists (
    select 1 from public.listings l
    where l.id = listing_payment_options.listing_id
      and l.owner_profile_id = auth.uid()
  ))
  with check (exists (
    select 1 from public.listings l
    where l.id = listing_payment_options.listing_id
      and l.owner_profile_id = auth.uid()
  ));

update public.subscription_plans
set audience = 'commercial',
    features = features || '{"vehicles":true,"agro_catalog":true,"payment_methods":["cash","financing","trade_in","agrocanje"]}'::jsonb
where slug in ('concesionaria-base', 'concesionaria-pro', 'proveedor-agro');
