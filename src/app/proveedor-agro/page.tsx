import { ModuleDashboard } from "@/components/module-dashboard";
import { agroProviderPanelCards } from "@/lib/platform-modules";

export const metadata = { title: "Panel proveedor Agro" };

export default function AgroProviderPanelPage() {
  return (
    <ModuleDashboard
      eyebrow="Proveedor Agro"
      title="Catálogo, cotizaciones, oportunidades y comisiones para proveedores."
      description="Estructura inicial para que proveedores agro gestionen productos, solicitudes de cotización, documentos comerciales y oportunidades originadas por la plataforma."
      cards={agroProviderPanelCards}
      cta={{ label: "Ver línea agro", href: "/agro" }}
    />
  );
}
