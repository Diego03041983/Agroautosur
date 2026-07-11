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
    area: "Panel proveedor Agro",
    status: "Base creada ahora",
    done: ["Taxonomía agro", "estructura de catálogo", "solicitudes de cotización", "comisiones"],
    missing: ["portal autenticado completo", "documentos gestionables", "flujo de oportunidades"],
  },
  {
    area: "Backoffice",
    status: "Parcialmente hecho",
    done: ["Admin dashboard", "CRM leads", "roles/RLS", "aprobaciones modeladas"],
    missing: ["moderación visual", "reportes exportables", "auditoría completa", "cobros/facturación operativa"],
  },
  {
    area: "Módulo Agrocanje",
    status: "Base creada ahora",
    done: ["Modelo de solicitud, toneladas, operador, entrega, liquidación y cierre"],
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
  { title: "Stock", text: "Publicaciones propias, estados, fotos, destacados y renovación.", href: "/publicaciones", Icon: Boxes },
  { title: "Vendedores", text: "Equipo comercial, asignación de leads y desempeño.", href: "/concesionaria", Icon: Users },
  { title: "Leads", text: "Consultas por publicación, financiación, permuta y contacto.", href: "/admin/leads", Icon: UserCheck },
  { title: "Estadísticas", text: "Vistas, consultas, conversión y unidades con más demanda.", href: "/admin/analitica", Icon: BarChart3 },
  { title: "Planes", text: "Suscripción, límites de stock, destacados incluidos y upgrades.", href: "/concesionaria", Icon: ClipboardList },
  { title: "Facturas", text: "Comprobantes, pagos pendientes y vencimientos.", href: "/concesionaria", Icon: ReceiptText },
  { title: "Destacados", text: "Promociones por slot, fechas, inversión y rendimiento.", href: "/concesionaria", Icon: Megaphone },
];

export const sellerPanelCards = [
  { title: "Alta de vehículo", text: "Carga completa de unidad para revisión y publicación.", href: "/vender", Icon: Truck },
  { title: "Verificación", text: "Documentación, fotos, titularidad y control del aviso.", href: "/particular", Icon: ShieldCheck },
  { title: "Pagos", text: "Publicación, destacados, renovación y comprobantes.", href: "/particular", Icon: CreditCard },
  { title: "Edición", text: "Cambios de precio, fotos, descripción y estado.", href: "/particular", Icon: FileText },
  { title: "Métricas", text: "Vistas, compartidos, consultas y tasa de respuesta.", href: "/particular", Icon: LineChart },
  { title: "Renovación", text: "Reactivar publicación y sostener visibilidad.", href: "/particular", Icon: PackageCheck },
];

export const agroProviderPanelCards = [
  { title: "Catálogo", text: "Productos, servicios, repuestos, equipos y disponibilidad.", href: "/proveedor-agro", Icon: Store },
  { title: "Cotizaciones", text: "Solicitudes recibidas con rubro, cantidad y zona.", href: "/proveedor-agro", Icon: ClipboardCheck },
  { title: "Oportunidades", text: "Demandas activas por categoría agro y presupuesto.", href: "/proveedor-agro", Icon: HandCoins },
  { title: "Documentos", text: "Fichas técnicas, presupuestos, facturas y acuerdos.", href: "/proveedor-agro", Icon: FileText },
  { title: "Comisiones", text: "Comisiones por operación declarada o cerrada.", href: "/proveedor-agro", Icon: BadgeDollarSign },
];

export const backofficeCards = [
  { title: "Aprobaciones", text: "Unidades pendientes, proveedores, documentos y destacados.", href: "/admin/backoffice", Icon: ClipboardCheck },
  { title: "Usuarios", text: "Roles, perfiles, concesionarias, particulares y proveedores.", href: "/admin/backoffice", Icon: Users },
  { title: "Cobros", text: "Pagos, suscripciones, vencimientos y conciliación.", href: "/admin/backoffice", Icon: CreditCard },
  { title: "Facturación", text: "Facturas, notas, impuestos y estado de emisión.", href: "/admin/backoffice", Icon: ReceiptText },
  { title: "Moderación", text: "Avisos reportados, contenido sensible y cambios críticos.", href: "/admin/backoffice", Icon: ShieldCheck },
  { title: "Reportes", text: "Ventas declaradas, GMV, comisiones, churn y MRR.", href: "/admin/analitica", Icon: BarChart3 },
  { title: "Auditoría", text: "Eventos administrativos, cambios de estado y trazabilidad.", href: "/admin/backoffice", Icon: FileText },
];

export const agrocanjeCards = [
  { title: "Solicitud", text: "Productor, cultivo, toneladas, publicación o proveedor asociado.", href: "/agrocanje", Icon: ClipboardList },
  { title: "Cotización en toneladas", text: "Valor de referencia, equivalencia y vigencia.", href: "/agrocanje", Icon: Scale },
  { title: "Operador", text: "Responsable interno y seguimiento del acuerdo.", href: "/agrocanje", Icon: UserCheck },
  { title: "Entrega", text: "Estado de entrega, documentación y recepción.", href: "/agrocanje", Icon: PackageCheck },
  { title: "Liquidación y cierre", text: "Importe liquidado, comisión y estado final.", href: "/agrocanje", Icon: ReceiptText },
];

export const analyticsCards = [
  { title: "Tráfico", text: "Sesiones, fuentes, redes, campañas y páginas de entrada.", href: "/admin/analitica", Icon: BarChart3 },
  { title: "Conversión", text: "Visita a lead, lead a operación y rendimiento por publicación.", href: "/admin/analitica", Icon: LineChart },
  { title: "Leads", text: "Nuevos, contactados, financiación, permuta y búsqueda.", href: "/admin/leads", Icon: UserCheck },
  { title: "Ventas declaradas", text: "Operaciones informadas por agencia, particular o proveedor.", href: "/admin/analitica", Icon: HandCoins },
  { title: "MRR y churn", text: "Ingresos recurrentes, bajas, upgrades y planes activos.", href: "/admin/analitica", Icon: ReceiptText },
  { title: "GMV", text: "Valor bruto de operaciones declaradas por vertical.", href: "/admin/analitica", Icon: BadgeDollarSign },
  { title: "Comisiones", text: "Comisiones esperadas, liquidadas y pendientes.", href: "/admin/analitica", Icon: CreditCard },
];
