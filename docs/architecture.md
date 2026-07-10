# Arquitectura AgroAutoSur

## Carpetas

- `src/app`: rutas públicas, panel inicial, API routes y layouts de Next.js App Router.
- `src/components`: componentes reutilizables de UI y producto.
- `src/lib`: acceso a datos, Supabase, validaciones, utilidades y fallback demo.
- `src/types`: contratos TypeScript del dominio.
- `supabase/migrations`: esquema SQL versionado, enums, índices y RLS.
- `supabase/seed.sql`: categorías, marcas y publicaciones demo.

## Módulos previstos

- Público: home, buscador, listado, ficha, contacto, vender, agencias y agro.
- Admin: dashboard, login y futura gestión CRUD por recurso.
- Datos: Supabase Auth, PostgreSQL, Storage y RLS por rol/propiedad.
- Leads: endpoint validado con Zod para consultas públicas.
