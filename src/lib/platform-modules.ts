import {
  BadgeDollarSign,
  BarChart3,
  Boxes,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  FileText,
  HandCoins,
  LineChart,
  Megaphone,
  PackageCheck,
  ReceiptText,
  Scale,
  ShieldCheck,
  Store,
  Truck,
  UserCheck,
  Users,
} from "lucide-react";

export const platformAudit = [
  {
    area: "Sitio público",
    status: "Parcialmente hecho",
    done: ["Inicio", "buscador", "filtros UI", "fichas", "comparador", "financiación simulada", "permutas vía lead", "SEO base"],
    missing: ["perfiles públicos completos", "SEO regional programático", "filtros conectados a query real avanzada"],
  },
  {
    area: "Panel concesionaria",
    status: "Base creada ahora",
    done: ["Modelo de organizaciones", "leads", "stock por organización", "panel inicial"],
    missing: ["vendedores CRUD", "planes activos", "facturas reales", "destacados pagos"],
  },
  {
    area: "Panel particular",
    status: "Parcialmente hecho",
    done: ["Cuenta", "alta de vehículo pendiente", "precios bimonetarios"],
    missing: ["pagos", "edición completa", "métricas del aviso", "renovación"],
  },
  {
    area: "Proveedor Agro dentro de concesionaria",
    status: "Reordenado",
    done: ["Taxonomía agro", "estructura de catálogo", "solicitudes de cotización", "comisiones", "cuenta comercial unificada"],
    missing: ["activar vertical agro por organización", "documentos gestionables", "flujo de oportunidades"],
  },
  {
    area: "Backoffice",
    status: "Parcialmente hecho",
    done: ["Admin dashboard", "CRM leads", "roles/RLS", "aprobaciones modeladas"],
    missing: ["moderación visual", "reportes exportables", "auditoría completa", "cobros/facturación operativa"],
  },
  {
    area: "Agrocanje como medio de cobro",
    status: "Reordenado",
    done: ["Modelo de solicitud, toneladas, operador, entrega, liquidación y cierre", "capacidad habilitable por organización/publicación"],
    missing: ["cotizador operativo", "contratos/documentos", "liquidación real"],
  },
  {
    area: "Analítica",
    status: "Base creada ahora",
    done: ["Modelo de eventos, métricas diarias, ventas declaradas, GMV/comisiones"],
    missing: ["tracking client-side", "tableros reales", "cohortes MRR/churn"],
  },
];

export const dealerPanelCards = [
  { title: "Stock", text: "Publicaciones propias, estados, fotos, destacados y renovación.", href: "/publicaciones", Icon: Boxes, state: "Base", functionality: "Centraliza el inventario de la concesionaria para publicar, pausar, destacar o renovar unidades.", nextStep: "crear CRUD de stock por organización" },
  { title: "Catálogo agro", text: "Equipos, repuestos, insumos, servicios y disponibilidad dentro de la misma cuenta comercial.", href: "/concesionaria", Icon: Store, state: "Base", functionality: "Integra proveedores agro como una vertical de concesionaria/empresa, no como panel separado.", nextStep: "activar catálogo por organización" },
  { title: "Vendedores", text: "Equipo comercial, asignación de leads y desempeño.", href: "/concesionaria", Icon: Users, state: "Diseñado", functionality: "Permite organizar vendedores, vincular responsables y medir seguimiento comercial.", nextStep: "alta y permisos de vendedores" },
  { title: "Leads", text: "Consultas por publicación, financiación, permuta y contacto.", href: "/admin/leads", Icon: UserCheck, state: "Operativo", functionality: "Recibe consultas del sitio, filtra por estado/tipo y permite accionar por WhatsApp.", nextStep: "segmentar leads por concesionaria" },
  { title: "Estadísticas", text: "Vistas, consultas, conversión y unidades con más demanda.", href: "/admin/analitica", Icon: BarChart3, state: "Base", functionality: "Define los indicadores que una agencia necesita para saber qué stock convierte mejor.", nextStep: "conectar tracking real" },
  { title: "Planes", text: "Suscripción, límites de stock, destacados incluidos y upgrades.", href: "/concesionaria", Icon: ClipboardList, state: "Modelado", functionality: "Relaciona cada cuenta con un plan, límites comerciales y beneficios activos.", nextStep: "activar cobro y upgrades" },
  { title: "Facturas", text: "Comprobantes, pagos pendientes y vencimientos.", href: "/concesionaria", Icon: ReceiptText, state: "Modelado", functionality: "Prepara la administración de comprobantes, vencimientos y pagos asociados a planes.", nextStep: "integrar proveedor de pagos" },
  { title: "Destacados", text: "Promociones por slot, fechas, inversión y rendimiento.", href: "/concesionaria", Icon: Megaphone, state: "Modelado", functionality: "Gestiona visibilidad paga o incluida dentro del plan comercial.", nextStep: "crear pantalla de compra de destacados" },
  { title: "Agrocanje", text: "Modalidad de cobro en toneladas habilitable por concesionaria y por publicación.", href: "/concesionaria", Icon: Scale, state: "Modelado", functionality: "Permite aceptar agrocanje como forma de pago, cotizar toneladas, seguir entrega y cerrar liquidación.", nextStep: "activar cotizador por operación" },
];

export const sellerPanelCards = [
  { title: "Alta de vehículo", text: "Carga completa de unidad para revisión y publicación.", href: "/vender", Icon: Truck, state: "Operativo", functionality: "El vendedor registrado puede cargar datos técnicos, precios bimonetarios, ubicación y fotos por enlace.", nextStep: "subida directa de imágenes" },
  { title: "Verificación", text: "Documentación, fotos, titularidad y control del aviso.", href: "/particular", Icon: ShieldCheck, state: "Modelado", functionality: "Ordena controles de documentación, titularidad, fotos y revisión antes de publicar.", nextStep: "crear checklist visible para el usuario" },
  { title: "Pagos", text: "Publicación, destacados, renovación y comprobantes.", href: "/particular", Icon: CreditCard, state: "Modelado", functionality: "Prepara cobros por publicación, destacados o renovación del aviso.", nextStep: "integrar checkout" },
  { title: "Edición", text: "Cambios de precio, fotos, descripción y estado.", href: "/particular", Icon: FileText, state: "Pendiente", functionality: "Permitirá mantener la publicación actualizada sin intervención manual del equipo.", nextStep: "crear vista Mis publicaciones" },
  { title: "Métricas", text: "Vistas, compartidos, consultas y tasa de respuesta.", href: "/particular", Icon: LineChart, state: "Base", functionality: "Muestra rendimiento del aviso para decidir precio, renovación o destacado.", nextStep: "registrar eventos por publicación" },
  { title: "Renovación", text: "Reactivar publicación y sostener visibilidad.", href: "/particular", Icon: PackageCheck, state: "Modelado", functionality: "Gestiona vencimientos y reactivación comercial de publicaciones particulares.", nextStep: "definir reglas de expiración" },
];

export const agroProviderPanelCards = [
  { title: "Catálogo", text: "Productos, servicios, repuestos, equipos y disponibilidad.", href: "/proveedor-agro", Icon: Store, state: "Modelado", functionality: "Permite publicar oferta agro con categoría, precio, disponibilidad y documentación técnica.", nextStep: "crear CRUD de catálogo" },
  { title: "Cotizaciones", text: "Solicitudes recibidas con rubro, cantidad y zona.", href: "/proveedor-agro", Icon: ClipboardCheck, state: "Modelado", functionality: "Centraliza pedidos para responder precio, vigencia y condiciones de entrega.", nextStep: "crear bandeja de cotizaciones" },
  { title: "Oportunidades", text: "Demandas activas por categoría agro y presupuesto.", href: "/proveedor-agro", Icon: HandCoins, state: "Base", functionality: "Muestra demanda generada por usuarios que buscan equipos, insumos o servicios.", nextStep: "vincular wanted requests" },
  { title: "Documentos", text: "Fichas técnicas, presupuestos, facturas y acuerdos.", href: "/proveedor-agro", Icon: FileText, state: "Modelado", functionality: "Guarda respaldo comercial de cada operación y producto cotizado.", nextStep: "habilitar storage y permisos" },
  { title: "Comisiones", text: "Comisiones por operación declarada o cerrada.", href: "/proveedor-agro", Icon: BadgeDollarSign, state: "Modelado", functionality: "Registra comisiones esperadas, pendientes o liquidadas por proveedor.", nextStep: "definir reglas comerciales" },
];

export const backofficeCards = [
  { title: "Aprobaciones", text: "Unidades pendientes, proveedores, documentos y destacados.", href: "/admin/backoffice", Icon: ClipboardCheck, state: "Prioritario", functionality: "Reúne todo lo que necesita validación antes de aparecer o afectar la operación.", nextStep: "crear cola de aprobación" },
  { title: "Usuarios", text: "Roles, perfiles, concesionarias, particulares y proveedores.", href: "/admin/backoffice", Icon: Users, state: "Base", functionality: "Administra identidad, permisos, pertenencia a organizaciones y perfiles comerciales.", nextStep: "proteger rutas por rol" },
  { title: "Cobros", text: "Pagos, suscripciones, vencimientos y conciliación.", href: "/admin/backoffice", Icon: CreditCard, state: "Modelado", functionality: "Controla ingresos por planes, publicaciones, destacados y servicios.", nextStep: "integrar pasarela de pagos" },
  { title: "Facturación", text: "Facturas, notas, impuestos y estado de emisión.", href: "/admin/backoffice", Icon: ReceiptText, state: "Modelado", functionality: "Ordena comprobantes emitidos, pendientes, pagados o vencidos.", nextStep: "definir integración fiscal" },
  { title: "Moderación", text: "Avisos reportados, contenido sensible y cambios críticos.", href: "/admin/backoffice", Icon: ShieldCheck, state: "Base", functionality: "Permite intervenir publicaciones, usuarios o documentos con problemas.", nextStep: "crear casos de moderación" },
  { title: "Reportes", text: "Ventas declaradas, GMV, comisiones, churn y MRR.", href: "/admin/analitica", Icon: BarChart3, state: "Base", functionality: "Consolida indicadores de negocio para dirección y decisiones comerciales.", nextStep: "agregar datos reales" },
  { title: "Auditoría", text: "Eventos administrativos, cambios de estado y trazabilidad.", href: "/admin/backoffice", Icon: FileText, state: "Modelado", functionality: "Registra quién modificó qué, cuándo y con qué impacto.", nextStep: "instrumentar logs automáticos" },
];

export const agrocanjeCards = [
  { title: "Solicitud", text: "Productor, cultivo, toneladas, publicación o proveedor asociado.", href: "/agrocanje", Icon: ClipboardList },
  { title: "Cotización en toneladas", text: "Valor de referencia, equivalencia y vigencia.", href: "/agrocanje", Icon: Scale },
  { title: "Operador", text: "Responsable interno y seguimiento del acuerdo.", href: "/agrocanje", Icon: UserCheck },
  { title: "Entrega", text: "Estado de entrega, documentación y recepción.", href: "/agrocanje", Icon: PackageCheck },
  { title: "Liquidación y cierre", text: "Importe liquidado, comisión y estado final.", href: "/agrocanje", Icon: ReceiptText },
];

export const analyticsCards = [
  { title: "Tráfico", text: "Sesiones, fuentes, redes, campañas y páginas de entrada.", href: "/admin/analitica", Icon: BarChart3, state: "Base", functionality: "Mide cómo llegan los usuarios y qué rutas generan demanda comercial.", nextStep: "instalar tracking de eventos" },
  { title: "Conversión", text: "Visita a lead, lead a operación y rendimiento por publicación.", href: "/admin/analitica", Icon: LineChart, state: "Base", functionality: "Relaciona visitas, consultas, WhatsApp, financiación y operaciones declaradas.", nextStep: "crear embudo por fuente" },
  { title: "Leads", text: "Nuevos, contactados, financiación, permuta y búsqueda.", href: "/admin/leads", Icon: UserCheck, state: "Operativo", functionality: "Resume demanda comercial capturada por formularios públicos y fichas.", nextStep: "agregar tiempos de respuesta" },
  { title: "Ventas declaradas", text: "Operaciones informadas por agencia, particular o proveedor.", href: "/admin/analitica", Icon: HandCoins, state: "Modelado", functionality: "Permite calcular GMV y efectividad de la plataforma sin depender solo de leads.", nextStep: "crear formulario de declaración" },
  { title: "MRR y churn", text: "Ingresos recurrentes, bajas, upgrades y planes activos.", href: "/admin/analitica", Icon: ReceiptText, state: "Modelado", functionality: "Controla salud del negocio de suscripciones para agencias y proveedores.", nextStep: "activar suscripciones" },
  { title: "GMV", text: "Valor bruto de operaciones declaradas por vertical.", href: "/admin/analitica", Icon: BadgeDollarSign, state: "Modelado", functionality: "Mide volumen económico total intermediado o declarado por la plataforma.", nextStep: "vincular cierres comerciales" },
  { title: "Comisiones", text: "Comisiones esperadas, liquidadas y pendientes.", href: "/admin/analitica", Icon: CreditCard, state: "Modelado", functionality: "Controla ingresos variables por proveedores, agrocanje u operaciones cerradas.", nextStep: "definir reglas de liquidación" },
];
