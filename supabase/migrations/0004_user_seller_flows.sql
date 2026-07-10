alter table public.profiles
  add column if not exists city text,
  add column if not exists province text default 'Santa Fe',
  add column if not exists document_type text,
  add column if not exists document_number text,
  add column if not exists user_type text default 'particular';

create table if not exists public.seller_listing_submissions (
  id uuid primary key default gen_random_uuid(),
  owner_profile_id uuid not null references public.profiles(id) on delete cascade,
  category_slug text not null,
  title text not null,
  brand text,
  model text,
  version text,
  year int,
  condition text not null default 'used',
  mileage int,
  hours_used int,
  fuel_type text,
  transmission text,
  traction text,
  engine text,
  price_usd numeric(14,2),
  price_ars numeric(14,2),
  location_city text not null,
  location_province text not null default 'Santa Fe',
  accepts_trade_in boolean not null default false,
  financing_available boolean not null default false,
  description text not null,
  photo_links text,
  status public.listing_status not null default 'pending',
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.seller_listing_submissions enable row level security;

drop policy if exists "owners manage own profile" on public.profiles;
create policy "owners manage own profile" on public.profiles for all
  using (id = auth.uid())
  with check (id = auth.uid());

drop policy if exists "staff read profiles" on public.profiles;
create policy "staff read profiles" on public.profiles for select using (public.is_staff());

drop policy if exists "owners manage own seller submissions" on public.seller_listing_submissions;
create policy "owners manage own seller submissions" on public.seller_listing_submissions for all
  using (owner_profile_id = auth.uid())
  with check (owner_profile_id = auth.uid());

drop policy if exists "staff manage seller submissions" on public.seller_listing_submissions;
create policy "staff manage seller submissions" on public.seller_listing_submissions for all
  using (public.is_staff())
  with check (public.is_staff());

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
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
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'city',
    coalesce(new.raw_user_meta_data->>'province', 'Santa Fe'),
    new.raw_user_meta_data->>'document_type',
    new.raw_user_meta_data->>'document_number',
    coalesce(new.raw_user_meta_data->>'user_type', 'particular')
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

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
