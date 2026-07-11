# Alcance de Plataforma AgroAutoSur

## Diagnóstico actual

### Sitio público

Estado: parcialmente implementado.

Ya existe:

- Inicio comercial mobile-first.
- Buscador y filtros UI.
- Listado de publicaciones.
- Ficha individual con consulta, compartir, comparar y financiación.
- Comparador inicial.
- Cotizador preliminar de financiación.
- Permutas como tipo de lead.
- Línea agro con taxonomía extendida.
- Cuenta básica y carga de unidad pendiente.
- Metadata SEO base.

Falta profundizar:

- Perfiles públicos de concesionarias, particulares y proveedores.
- Filtros conectados a búsqueda real por todos los parámetros.
- SEO regional programático por ciudad, marca, categoría y operación.
- Tracking de eventos de tráfico/conversión.

### Panel concesionaria

Estado: base creada.

Ya existe:

- Modelo de organizaciones.
- Roles por usuario.
- Publicaciones vinculables a organización.
- Leads y CRM inicial.
- Ruta base `/concesionaria`.
- Entidades para miembros, planes, facturas, pagos, destacados y estadísticas.

Falta construir:

- CRUD de stock por concesionaria.
- CRUD de vendedores.
- Vista de facturas y plan activo.
- Compra/renovación de destacados.
- Estadísticas reales por vendedor y publicación.

### Panel particular

Estado: parcialmente implementado.

Ya existe:

- Registro/login con Supabase Auth.
- Alta de unidad como `seller_listing_submissions`.
- Verificación modelada.
- Ruta base `/particular`.
- Entidades para pagos, edición, métricas y renovación.

Falta construir:

- Listado “mis publicaciones”.
- Edición completa de publicación.
- Subida de imágenes/documentos.
- Pagos/renovaciones reales.
- Métricas visibles para el vendedor.

### Panel proveedor Agro

Estado: base creada.

Ya existe:

- Línea agro categorizada.
- Ruta base `/proveedor-agro`.
- Entidades para perfil proveedor, catálogo, cotizaciones, documentos y comisiones.

Falta construir:

- Onboarding de proveedor.
- CRUD de catálogo.
- Bandeja de solicitudes de cotización.
- Gestión documental.
- Liquidación de comisiones.

### Backoffice

Estado: parcialmente implementado.

Ya existe:

- Dashboard admin.
- CRM de leads con estados, notas y WhatsApp.
- Roles/RLS.
- Ruta `/admin/backoffice`.
- Entidades de aprobación, moderación, cobros, facturación, reportes y auditoría.

Falta construir:

- Vistas CRUD por entidad.
- Middleware de protección por rol.
- Aprobación de publicaciones/proveedores.
- Moderación operativa.
- Reportes exportables.
- Auditoría visual.

### Módulo Agrocanje

Estado: base creada.

Ya existe:

- Ruta `/agrocanje`.
- Entidades para solicitud, cotización en toneladas, operador, entrega, liquidación y cierre.
- Historial de estados.

Falta construir:

- Formulario de solicitud.
- Cotizador de toneladas.
- Asignación de operador.
- Documentación de entrega.
- Liquidación/cierre operativo.

### Analítica

Estado: base creada.

Ya existe:

- Ruta `/admin/analitica`.
- Entidades para eventos, métricas diarias, ventas declaradas, métricas mensuales, GMV, MRR, churn y comisiones.

Falta construir:

- Captura client-side de eventos.
- Agregación programada.
- Tablero con datos reales.
- Métricas por fuente, campaña, vendedor, publicación y vertical.

## Migración agregada

`supabase/migrations/0006_platform_expansion.sql`

Incluye:

- `organization_members`
- `subscription_plans`
- `organization_subscriptions`
- `invoices`
- `payments`
- `listing_promotions`
- `listing_renewals`
- `document_files`
- `agro_provider_profiles`
- `provider_catalog_items`
- `quote_requests`
- `provider_commissions`
- `agrocanje_requests`
- `agrocanje_status_events`
- `analytics_events`
- `listing_metrics_daily`
- `sales_declarations`
- `business_metrics_monthly`
- `moderation_cases`
- `audit_logs`

## Orden recomendado de implementación

1. Proteger rutas con middleware y roles.
2. Completar CRUD de publicaciones y seller submissions.
3. Panel concesionaria: stock, vendedores y leads.
4. Panel particular: mis publicaciones, edición, pagos y métricas.
5. Backoffice: aprobaciones, usuarios, moderación y cobros.
6. Proveedor agro: catálogo y cotizaciones.
7. Agrocanje operativo.
8. Analítica real y reportes.
