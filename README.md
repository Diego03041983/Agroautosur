# AgroAutoSur

Marketplace regional para compra, venta, publicación, gestión comercial y futura financiación de autos, pickups, utilitarios, camiones livianos, maquinaria agro e implementos del sur de Santa Fe.

## Stack

- Next.js App Router 16
- TypeScript
- Tailwind CSS 4
- Supabase Auth, PostgreSQL, Storage y RLS
- Zod para validaciones
- Deploy preparado para Vercel

## Desarrollo local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abrir `http://localhost:3000`.

Sin variables de Supabase, el sitio usa datos demo locales para que la UI pueda revisarse de inmediato.

## Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_WHATSAPP_PHONE=
```

`SUPABASE_SERVICE_ROLE_KEY` es solo server-side. No debe usarse en componentes cliente ni exponerse en Vercel como variable pública.

## Supabase

1. Crear un proyecto en Supabase.
2. Ejecutar `supabase/migrations/0001_initial_schema.sql` en SQL Editor o con Supabase CLI.
3. Ejecutar `supabase/migrations/0002_lead_crm_context.sql`.
4. Ejecutar `supabase/migrations/0003_bimonetary_prices.sql`.
5. Ejecutar `supabase/seed.sql` para cargar categorías, marcas, publicaciones y leads demo.
6. Crear un bucket de Storage para imágenes, por ejemplo `listing-images`.
7. Configurar Supabase Auth y crear usuarios operativos.
8. Insertar filas en `profiles` y `users_roles` con roles `super_admin`, `admin`, `agency` o `seller`.

## Arquitectura

Ver [docs/architecture.md](docs/architecture.md).

Rutas iniciales:

- `/`: home comercial con buscador, categorías, destacados y CTAs.
- `/publicaciones`: listado con filtros iniciales.
- `/publicaciones/[slug]`: ficha con galería, sellos, WhatsApp y formulario.
- `/contacto`, `/vender`, `/agencias`, `/agro`, `/que-es-agroautosur`: páginas comerciales.
- `/admin`: dashboard inicial preparado para backoffice.
- `/admin/leads`: CRM interno con filtros por estado, tipo, fecha, publicación y responsable.
- `/admin/leads/[id]`: detalle de lead, cambio de estado, responsable, WhatsApp y notas internas.
- `/admin/login`: pantalla base de autenticación.
- `/api/leads`: endpoint validado para consultas públicas.
- `/api/admin/leads/[id]`: actualización de estado/responsable.
- `/api/admin/leads/[id]/notes`: historial de notas internas.
- `/buscar`: formulario para búsquedas específicas.
- `/comparar`: comparador inicial de publicaciones.
- `/financiacion`: cotizador preliminar con opciones simuladas.
- `/tasacion`: herramienta de evaluación inicial para vendedores, con rango orientativo y posterior lead comercial.

## Seguridad

- RLS activo en tablas principales.
- Público solo lee publicaciones `published`.
- Leads públicos solo permiten `insert`.
- Staff puede gestionar datos mediante roles.
- El CRM usa `leads`, `lead_notes`, `assigned_to`, `source_path`, `source_label` y `metadata` para no perder contexto comercial.
- Los precios son bimonetarios manuales: `price_usd` y `price_ars` se cargan por publicación. No hay conversión automática.
- Owners/agencias pueden gestionar publicaciones propias según `owner_profile_id` u `organization_id`.
- La service role key no se usa en cliente.

## Deploy en Vercel

1. Importar el repo en Vercel.
2. Configurar las variables de entorno.
3. Verificar que `NEXT_PUBLIC_SITE_URL` apunte al dominio final.
4. Ejecutar migraciones y seed en Supabase antes de abrir el sitio público.
5. Conectar dominio y revisar metadata/SEO.

## Checklist de producción

- Reemplazar imágenes demo por Storage real.
- Conectar login con Supabase Auth y server actions.
- Implementar CRUD completo de publicaciones, categorías, marcas, modelos y organizaciones.
- Implementar vistas de leads, financiación, permutas y búsquedas.
- Agregar middleware de protección para `/admin`.
- Crear políticas de Storage para `listing-images`.
- Configurar analytics, monitoreo de errores y backups de Supabase.
- Revisar textos legales, privacidad y consentimiento de contacto.
