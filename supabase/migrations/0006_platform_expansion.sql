create type public.billing_status as enum ('draft', 'open', 'paid', 'void', 'overdue');
create type public.payment_status as enum ('pending', 'approved', 'rejected', 'refunded');
create type public.quote_status as enum ('new', 'quoted', 'accepted', 'rejected', 'expired', 'closed');
create type public.agrocanje_status as enum ('requested', 'quoted', 'operator_assigned', 'delivery_pending', 'delivered', 'liquidated', 'closed', 'cancelled');
create type public.moderation_status as enum ('open', 'in_review', 'resolved', 'dismissed');

create table public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'seller',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (organization_id, profile_id)
);

create table public.subscription_plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  audience text not null default 'agency',
  monthly_price numeric(14,2) not null default 0,
  currency text not null default 'ARS',
  listing_limit int,
  featured_slots int not null default 0,
  lead_limit int,
  features jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.organization_subscriptions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  plan_id uuid not null references public.subscription_plans(id),
  status text not null default 'active',
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  trial_ends_at timestamptz,
  created_at timestamptz not null default now(),
  check (organization_id is not null or profile_id is not null)
);

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete set null,
  profile_id uuid references public.profiles(id) on delete set null,
  subscription_id uuid references public.organization_subscriptions(id) on delete set null,
  invoice_number text unique,
  concept text not null,
  amount numeric(14,2) not null,
  currency text not null default 'ARS',
  status public.billing_status not null default 'open',
  due_date date,
  paid_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid references public.invoices(id) on delete set null,
  organization_id uuid references public.organizations(id) on delete set null,
  profile_id uuid references public.profiles(id) on delete set null,
  provider text,
  external_reference text,
  amount numeric(14,2) not null,
  currency text not null default 'ARS',
  status public.payment_status not null default 'pending',
  paid_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.listing_promotions (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  invoice_id uuid references public.invoices(id) on delete set null,
  slot_key text not null,
  status text not null default 'active',
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  amount numeric(14,2),
  currency text default 'ARS',
  created_at timestamptz not null default now()
);

create table public.listing_renewals (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  invoice_id uuid references public.invoices(id) on delete set null,
  renewed_by uuid references public.profiles(id) on delete set null,
  previous_expires_at timestamptz,
  new_expires_at timestamptz,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.document_files (
  id uuid primary key default gen_random_uuid(),
  owner_profile_id uuid references public.profiles(id) on delete set null,
  organization_id uuid references public.organizations(id) on delete set null,
  listing_id uuid references public.listings(id) on delete cascade,
  document_type text not null,
  title text not null,
  storage_path text,
  public_url text,
  status text not null default 'pending',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.agro_provider_profiles (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  business_name text not null,
  tax_id text,
  categories text[] not null default '{}',
  service_area text,
  commission_rate numeric(6,4) not null default 0,
  is_verified boolean not null default false,
  created_at timestamptz not null default now(),
  check (organization_id is not null or profile_id is not null)
);

create table public.provider_catalog_items (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.agro_provider_profiles(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  description text,
  sku text,
  price_usd numeric(14,2),
  price_ars numeric(16,2),
  unit text,
  availability_status text not null default 'available',
  document_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  requester_profile_id uuid references public.profiles(id) on delete set null,
  provider_id uuid references public.agro_provider_profiles(id) on delete set null,
  listing_id uuid references public.listings(id) on delete set null,
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  description text,
  quantity numeric(14,2),
  unit text,
  city text,
  province text default 'Santa Fe',
  status public.quote_status not null default 'new',
  quoted_amount_usd numeric(14,2),
  quoted_amount_ars numeric(16,2),
  quoted_at timestamptz,
  expires_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.provider_commissions (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid references public.agro_provider_profiles(id) on delete set null,
  quote_request_id uuid references public.quote_requests(id) on delete set null,
  invoice_id uuid references public.invoices(id) on delete set null,
  base_amount numeric(14,2) not null default 0,
  commission_amount numeric(14,2) not null default 0,
  currency text not null default 'ARS',
  status text not null default 'pending',
  liquidated_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.agrocanje_requests (
  id uuid primary key default gen_random_uuid(),
  requester_profile_id uuid references public.profiles(id) on delete set null,
  organization_id uuid references public.organizations(id) on delete set null,
  listing_id uuid references public.listings(id) on delete set null,
  provider_id uuid references public.agro_provider_profiles(id) on delete set null,
  operator_profile_id uuid references public.profiles(id) on delete set null,
  crop text not null,
  tons_requested numeric(14,3) not null,
  reference_price_per_ton numeric(14,2),
  currency text not null default 'USD',
  quoted_value numeric(14,2),
  delivery_location text,
  delivery_status text not null default 'pending',
  liquidation_amount numeric(14,2),
  commission_amount numeric(14,2),
  status public.agrocanje_status not null default 'requested',
  notes text,
  closed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.agrocanje_status_events (
  id uuid primary key default gen_random_uuid(),
  agrocanje_request_id uuid not null references public.agrocanje_requests(id) on delete cascade,
  actor_profile_id uuid references public.profiles(id) on delete set null,
  from_status public.agrocanje_status,
  to_status public.agrocanje_status not null,
  note text,
  created_at timestamptz not null default now()
);

create table public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  listing_id uuid references public.listings(id) on delete set null,
  organization_id uuid references public.organizations(id) on delete set null,
  event_name text not null,
  source text,
  path text,
  referrer text,
  session_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.listing_metrics_daily (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  metric_date date not null,
  views int not null default 0,
  shares int not null default 0,
  leads int not null default 0,
  whatsapp_clicks int not null default 0,
  financing_clicks int not null default 0,
  compare_clicks int not null default 0,
  unique (listing_id, metric_date)
);

create table public.sales_declarations (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references public.listings(id) on delete set null,
  organization_id uuid references public.organizations(id) on delete set null,
  seller_profile_id uuid references public.profiles(id) on delete set null,
  buyer_profile_id uuid references public.profiles(id) on delete set null,
  declared_amount numeric(14,2) not null,
  currency text not null default 'USD',
  commission_amount numeric(14,2),
  status text not null default 'declared',
  closed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.business_metrics_monthly (
  id uuid primary key default gen_random_uuid(),
  metric_month date not null unique,
  traffic_sessions int not null default 0,
  leads_count int not null default 0,
  declared_sales_count int not null default 0,
  mrr numeric(14,2) not null default 0,
  churn_count int not null default 0,
  gmv numeric(16,2) not null default 0,
  commissions numeric(14,2) not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.moderation_cases (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references public.listings(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete set null,
  assigned_to uuid references public.profiles(id) on delete set null,
  reason text not null,
  status public.moderation_status not null default 'open',
  resolution text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_profile_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  before_data jsonb,
  after_data jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index organization_members_org_idx on public.organization_members(organization_id);
create index invoices_status_idx on public.invoices(status, created_at desc);
create index payments_status_idx on public.payments(status, created_at desc);
create index quote_requests_status_idx on public.quote_requests(status, created_at desc);
create index agrocanje_status_idx on public.agrocanje_requests(status, created_at desc);
create index analytics_events_name_created_idx on public.analytics_events(event_name, created_at desc);
create index listing_metrics_daily_listing_idx on public.listing_metrics_daily(listing_id, metric_date desc);
create index audit_logs_entity_idx on public.audit_logs(entity_type, entity_id, created_at desc);

alter table public.organization_members enable row level security;
alter table public.subscription_plans enable row level security;
alter table public.organization_subscriptions enable row level security;
alter table public.invoices enable row level security;
alter table public.payments enable row level security;
alter table public.listing_promotions enable row level security;
alter table public.listing_renewals enable row level security;
alter table public.document_files enable row level security;
alter table public.agro_provider_profiles enable row level security;
alter table public.provider_catalog_items enable row level security;
alter table public.quote_requests enable row level security;
alter table public.provider_commissions enable row level security;
alter table public.agrocanje_requests enable row level security;
alter table public.agrocanje_status_events enable row level security;
alter table public.analytics_events enable row level security;
alter table public.listing_metrics_daily enable row level security;
alter table public.sales_declarations enable row level security;
alter table public.business_metrics_monthly enable row level security;
alter table public.moderation_cases enable row level security;
alter table public.audit_logs enable row level security;

create policy "public read active plans" on public.subscription_plans for select using (is_active = true);
create policy "public insert analytics events" on public.analytics_events for insert with check (true);

create policy "staff manage organization members" on public.organization_members for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage plans" on public.subscription_plans for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage subscriptions" on public.organization_subscriptions for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage invoices" on public.invoices for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage payments" on public.payments for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage listing promotions" on public.listing_promotions for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage listing renewals" on public.listing_renewals for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage documents" on public.document_files for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage agro providers" on public.agro_provider_profiles for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage provider catalog" on public.provider_catalog_items for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage quote requests" on public.quote_requests for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage provider commissions" on public.provider_commissions for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage agrocanje" on public.agrocanje_requests for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage agrocanje events" on public.agrocanje_status_events for all using (public.is_staff()) with check (public.is_staff());
create policy "staff read analytics events" on public.analytics_events for select using (public.is_staff());
create policy "staff manage listing metrics" on public.listing_metrics_daily for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage sales declarations" on public.sales_declarations for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage business metrics" on public.business_metrics_monthly for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage moderation" on public.moderation_cases for all using (public.is_staff()) with check (public.is_staff());
create policy "staff read audit logs" on public.audit_logs for select using (public.is_staff());
create policy "staff insert audit logs" on public.audit_logs for insert with check (public.is_staff());

create policy "org members read own memberships" on public.organization_members for select
  using (profile_id = auth.uid());

create policy "owners read own invoices" on public.invoices for select
  using (profile_id = auth.uid() or exists (
    select 1 from public.organization_members om
    where om.organization_id = invoices.organization_id and om.profile_id = auth.uid()
  ));

create policy "owners read own payments" on public.payments for select
  using (profile_id = auth.uid() or exists (
    select 1 from public.organization_members om
    where om.organization_id = payments.organization_id and om.profile_id = auth.uid()
  ));

create policy "owners manage own documents" on public.document_files for all
  using (owner_profile_id = auth.uid())
  with check (owner_profile_id = auth.uid());

create policy "providers manage own profile" on public.agro_provider_profiles for all
  using (profile_id = auth.uid())
  with check (profile_id = auth.uid());

create policy "providers manage own catalog" on public.provider_catalog_items for all
  using (exists (
    select 1 from public.agro_provider_profiles p
    where p.id = provider_catalog_items.provider_id and p.profile_id = auth.uid()
  ))
  with check (exists (
    select 1 from public.agro_provider_profiles p
    where p.id = provider_catalog_items.provider_id and p.profile_id = auth.uid()
  ));

create policy "owners manage own quote requests" on public.quote_requests for all
  using (requester_profile_id = auth.uid())
  with check (requester_profile_id = auth.uid());

create policy "owners manage own agrocanje" on public.agrocanje_requests for all
  using (requester_profile_id = auth.uid())
  with check (requester_profile_id = auth.uid());

insert into public.subscription_plans (name, slug, audience, monthly_price, currency, listing_limit, featured_slots, lead_limit, features) values
('Particular inicial', 'particular-inicial', 'seller', 0, 'ARS', 1, 0, null, '{"support":"basic","renewal_days":30}'),
('Concesionaria base', 'concesionaria-base', 'agency', 49000, 'ARS', 25, 2, 250, '{"crm":true,"seller_seats":3}'),
('Concesionaria pro', 'concesionaria-pro', 'agency', 99000, 'ARS', 80, 8, 1000, '{"crm":true,"seller_seats":10,"analytics":true}'),
('Proveedor agro', 'proveedor-agro', 'provider', 79000, 'ARS', null, 4, 500, '{"catalog":true,"quote_requests":true,"commission_tracking":true}')
on conflict (slug) do update set
  name = excluded.name,
  audience = excluded.audience,
  monthly_price = excluded.monthly_price,
  currency = excluded.currency,
  listing_limit = excluded.listing_limit,
  featured_slots = excluded.featured_slots,
  lead_limit = excluded.lead_limit,
  features = excluded.features,
  is_active = true;
