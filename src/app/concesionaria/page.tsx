import { ModuleDashboard } from "@/components/module-dashboard";
import { dealerPanelCards } from "@/lib/platform-modules";

export const metadata = { title: "Panel concesionaria" };

export default function DealerPanelPage() {
  return (
    <ModuleDashboard
      eyebrow="Panel concesionaria"
      title="Stock, equipo comercial, leads y monetización para agencias."
      description="Superficie inicial para operar publicaciones, vendedores, estadísticas, planes, facturas y destacados desde una misma cuenta de organización."
      cards={dealerPanelCards}
      cta={{ label: "Ver CRM", href: "/admin/leads" }}
    />
  );
}
