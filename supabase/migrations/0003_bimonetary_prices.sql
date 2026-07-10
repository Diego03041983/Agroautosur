alter table public.listings
  add column if not exists price_usd numeric(14,2),
  add column if not exists price_ars numeric(16,2);

update public.listings
set price_usd = price
where currency = 'USD' and price_usd is null;

update public.listings
set price_ars = price
where currency = 'ARS' and price_ars is null;
