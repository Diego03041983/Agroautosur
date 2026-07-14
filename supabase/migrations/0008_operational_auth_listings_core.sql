alter table public.organizations
  add column if not exists owner_profile_id uuid references public.profiles(id) on delete set null,
  add column if not exists onboarding_status text not null default 'active',
  add column if not exists tax_id text,
  add column if not exists address text,
  add column if not exists updated_at timestamptz not null default now();

alter table public.seller_listing_submissions
  add column if not exists organization_id uuid references public.organizations(id) on delete set null,
  add column if not exists reviewed_by uuid references public.profiles(id) on delete set null,
  add column if not exists reviewed_at timestamptz,
  add column if not exists rejection_reason text;

alter table public.listings
  add column if not exists source_submission_id uuid references public.seller_listing_submissions(id) on delete set null,
  add column if not exists published_at timestamptz,
  add column if not exists expires_at timestamptz;

create index if not exists organizations_owner_idx on public.organizations(owner_profile_id);
create index if not exists seller_submissions_owner_status_idx on public.seller_listing_submissions(owner_profile_id, status, created_at desc);
create index if not exists seller_submissions_org_status_idx on public.seller_listing_submissions(organization_id, status, created_at desc);
create index if not exists listings_org_status_idx on public.listings(organization_id, status, created_at desc);

create or replace function public.slugify(input text)
returns text
language sql
immutable
as $$
  select trim(both '-' from regexp_replace(lower(coalesce(input, '')), '[^a-z0-9]+', '-', 'g'));
$$;

create or replace function public.is_org_member(org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.organization_members om
    where om.organization_id = org_id
      and om.profile_id = auth.uid()
      and om.is_active = true
  );
$$;

create or replace function public.can_manage_org(org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_staff() or exists (
    select 1 from public.organization_members om
    where om.organization_id = org_id
      and om.profile_id = auth.uid()
      and om.is_active = true
      and om.role in ('owner', 'admin')
  );
$$;

drop policy if exists "staff manage organizations" on public.organizations;
create policy "staff manage organizations" on public.organizations for all
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists "org members read own organizations" on public.organizations;
create policy "org members read own organizations" on public.organizations for select
  using (public.is_org_member(id));

drop policy if exists "org owners update own organizations" on public.organizations;
create policy "org owners update own organizations" on public.organizations for update
  using (public.can_manage_org(id))
  with check (public.can_manage_org(id));

drop policy if exists "org admins manage own members" on public.organization_members;
create policy "org admins manage own members" on public.organization_members for all
  using (public.can_manage_org(organization_id))
  with check (public.can_manage_org(organization_id));

drop policy if exists "org members manage organization submissions" on public.seller_listing_submissions;
create policy "org members manage organization submissions" on public.seller_listing_submissions for all
  using (organization_id is not null and public.is_org_member(organization_id))
  with check (organization_id is not null and public.is_org_member(organization_id));

drop policy if exists "org members manage listings" on public.listings;
create policy "org members manage listings" on public.listings for all
  using (organization_id is not null and public.is_org_member(organization_id))
  with check (organization_id is not null and public.is_org_member(organization_id));

drop policy if exists "org members manage listing payment options" on public.listing_payment_options;
create policy "org members manage listing payment options" on public.listing_payment_options for all
  using (exists (
    select 1 from public.listings l
    where l.id = listing_payment_options.listing_id
      and l.organization_id is not null
      and public.is_org_member(l.organization_id)
  ))
  with check (exists (
    select 1 from public.listings l
    where l.id = listing_payment_options.listing_id
      and l.organization_id is not null
      and public.is_org_member(l.organization_id)
  ));

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  user_type text := coalesce(new.raw_user_meta_data->>'user_type', 'particular');
  display_name text := coalesce(new.raw_user_meta_data->>'full_name', new.email, '');
  organization_name text := nullif(new.raw_user_meta_data->>'organization_name', '');
  organization_tax_id text := nullif(new.raw_user_meta_data->>'document_number', '');
  created_org_id uuid;
  created_slug text;
  assigned_role public.app_role := 'seller';
begin
  insert into public.profiles (
    id,
    full_name,
    phone,
    city,
    province,
    document_type,
    document_number,
    user_type
  )
  values (
    new.id,
    display_name,
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'city',
    coalesce(new.raw_user_meta_data->>'province', 'Santa Fe'),
    new.raw_user_meta_data->>'document_type',
    new.raw_user_meta_data->>'document_number',
    user_type
  )
  on conflict (id) do update set
    full_name = excluded.full_name,
    phone = excluded.phone,
    city = excluded.city,
    province = excluded.province,
    document_type = excluded.document_type,
    document_number = excluded.document_number,
    user_type = excluded.user_type,
    updated_at = now();

  if user_type = 'agency' then
    assigned_role := 'agency';
    created_slug := public.slugify(coalesce(organization_name, display_name));
    if created_slug = '' then
      created_slug := 'concesionaria';
    end if;
    created_slug := created_slug || '-' || substr(new.id::text, 1, 8);

    insert into public.organizations (
      name,
      slug,
      type,
      commercial_vertical,
      owner_profile_id,
      city,
      province,
      phone,
      email,
      tax_id,
      can_sell_vehicles,
      can_sell_agro,
      accepts_cash,
      accepts_financing,
      accepts_trade_in
    )
    values (
      coalesce(organization_name, display_name),
      created_slug,
      'agency',
      'mixed_dealer',
      new.id,
      new.raw_user_meta_data->>'city',
      coalesce(new.raw_user_meta_data->>'province', 'Santa Fe'),
      new.raw_user_meta_data->>'phone',
      new.email,
      organization_tax_id,
      true,
      true,
      true,
      true,
      true
    )
    returning id into created_org_id;

    insert into public.organization_members (organization_id, profile_id, role, is_active)
    values (created_org_id, new.id, 'owner', true)
    on conflict (organization_id, profile_id) do update set
      role = excluded.role,
      is_active = true;

    insert into public.organization_payment_methods (organization_id, method, is_enabled)
    values
      (created_org_id, 'cash', true),
      (created_org_id, 'financing', true),
      (created_org_id, 'trade_in', true),
      (created_org_id, 'agrocanje', false)
    on conflict (organization_id, method) do nothing;
  elsif user_type = 'producer' then
    assigned_role := 'seller';
  else
    assigned_role := 'seller';
  end if;

  insert into public.users_roles (profile_id, role, organization_id)
  values (new.id, assigned_role, created_org_id)
  on conflict (profile_id, role) do update set
    organization_id = excluded.organization_id;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
