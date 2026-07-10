insert into public.categories (id, name, slug, description, icon, sort_order) values
('00000000-0000-4000-8000-000000000001', 'Autos', 'autos', 'Unidades urbanas y familiares.', 'car', 1),
('00000000-0000-4000-8000-000000000002', 'Pickups', 'pickups', 'Trabajo, campo y ruta.', 'truck', 2),
('00000000-0000-4000-8000-000000000003', 'Utilitarios', 'utilitarios', 'Logística liviana y reparto.', 'package', 3),
('00000000-0000-4000-8000-000000000004', 'Camiones livianos', 'camiones-livianos', 'Carga regional.', 'truck', 4),
('00000000-0000-4000-8000-000000000005', 'Agro', 'agro', 'Soluciones productivas.', 'sprout', 5),
('00000000-0000-4000-8000-000000000006', 'Maquinaria agrícola', 'maquinaria-agricola', 'Equipos para campaña.', 'tractor', 6),
('00000000-0000-4000-8000-000000000007', 'Implementos', 'implementos', 'Herramientas e implementos.', 'wrench', 7)
on conflict (slug) do nothing;

insert into public.brands (id, name, slug) values
('10000000-0000-4000-8000-000000000001', 'Toyota', 'toyota'),
('10000000-0000-4000-8000-000000000002', 'Volkswagen', 'volkswagen'),
('10000000-0000-4000-8000-000000000003', 'John Deere', 'john-deere'),
('10000000-0000-4000-8000-000000000004', 'Ford', 'ford'),
('10000000-0000-4000-8000-000000000005', 'Chevrolet', 'chevrolet')
on conflict (slug) do nothing;

insert into public.listings (
  id, title, slug, category_id, brand_id, year, price, currency, price_usd, price_ars, location_city,
  description, condition, mileage, fuel_type, transmission, traction, engine,
  hours_used, accepts_trade_in, financing_available, is_verified, is_select,
  is_featured, status, seller_type
) values
('11111111-1111-4111-8111-111111111111', 'Toyota Hilux SRX 4x4 AT', 'toyota-hilux-srx-4x4-at-2022', '00000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000001', 2022, 43500, 'USD', 43500, 52000000, 'Venado Tuerto', 'Pickup verificada, lista para transferencia. Service al día, neumáticos en buen estado y equipamiento completo.', 'used', 74000, 'Diesel', 'Automática', '4x4', '2.8', null, true, true, true, true, true, 'published', 'agency'),
('22222222-2222-4222-8222-222222222222', 'Volkswagen Amarok Comfortline', 'volkswagen-amarok-comfortline-2021', '00000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000002', 2021, 36500, 'USD', 36500, 43800000, 'Firmat', 'Unidad de uso particular, interior cuidado, apta financiación y permuta menor.', 'used', 91000, 'Diesel', 'Manual', '4x2', '2.0', null, true, true, true, false, true, 'published', 'agency'),
('33333333-3333-4333-8333-333333333333', 'Tractor John Deere 5075E', 'tractor-john-deere-5075e-2019', '00000000-0000-4000-8000-000000000006', '10000000-0000-4000-8000-000000000003', 2019, 52000, 'USD', 52000, 62400000, 'Rufino', 'Tractor con 1800 horas, cabina, hidráulicos revisados y disponibilidad inmediata para campaña.', 'used', null, 'Diesel', 'Manual', '4x4', '75 HP', 1800, false, true, true, true, true, 'published', 'internal')
on conflict (slug) do nothing;

insert into public.listing_images (listing_id, url, alt, sort_order) values
('11111111-1111-4111-8111-111111111111', 'https://loremflickr.com/1200/900/toyota,hilux,pickup', 'Toyota Hilux pickup en exterior', 0),
('22222222-2222-4222-8222-222222222222', 'https://loremflickr.com/1200/900/volkswagen,amarok,pickup', 'Volkswagen Amarok pickup', 0),
('33333333-3333-4333-8333-333333333333', 'https://loremflickr.com/1200/900/john-deere,tractor', 'Tractor John Deere trabajando', 0);

insert into public.leads (
  id, listing_id, lead_type, full_name, phone, email, city, message,
  has_trade_in, needs_financing, desired_budget, status, source_path,
  source_label, metadata
) values
('90000000-0000-4000-8000-000000000001', '11111111-1111-4111-8111-111111111111', 'listing_interest', 'Martín Alvarez', '5493462000001', 'martin@example.com', 'Venado Tuerto', 'Hola, quiero saber si la Hilux sigue disponible y si toman permuta menor.', true, false, null, 'new', '/publicaciones/toyota-hilux-srx-4x4-at-2022', 'Toyota Hilux SRX 4x4 AT', '{"channel":"demo","campaign":"whatsapp"}'),
('90000000-0000-4000-8000-000000000002', '33333333-3333-4333-8333-333333333333', 'financing', 'Sofía Benítez', '5493382000002', 'sofia@example.com', 'Rufino', 'Necesito financiar una parte del tractor. Tengo entrega inicial.', false, true, 30000, 'in_financing', '/publicaciones/tractor-john-deere-5075e-2019', 'Quiero financiar', '{"channel":"demo","campaign":"instagram"}'),
('90000000-0000-4000-8000-000000000003', null, 'sell_request', 'Agro Las Marías', '5493462000003', null, 'Firmat', 'Queremos publicar una Amarok y una tolva. Necesitamos tasación.', false, false, null, 'contacted', '/vender', 'Quiero vender', '{"channel":"demo","campaign":"facebook"}')
on conflict (id) do nothing;

insert into public.lead_notes (id, lead_id, note) values
('91000000-0000-4000-8000-000000000001', '90000000-0000-4000-8000-000000000002', 'Pide financiación parcial. Consultar documentación y actividad.')
on conflict (id) do nothing;
