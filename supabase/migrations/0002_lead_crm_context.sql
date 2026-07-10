alter table public.leads
  add column if not exists source_path text,
  add column if not exists source_label text,
  add column if not exists metadata jsonb not null default '{}'::jsonb;

create index if not exists leads_type_created_idx on public.leads(lead_type, created_at desc);
create index if not exists leads_listing_idx on public.leads(listing_id);
create index if not exists leads_assigned_to_idx on public.leads(assigned_to);
create index if not exists lead_notes_lead_created_idx on public.lead_notes(lead_id, created_at desc);
