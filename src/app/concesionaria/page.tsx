import { ModuleDashboard } from "@/components/module-dashboard";
import { dealerPanelCards } from "@/lib/platform-modules";

export const metadata = { title: "Panel concesionaria" };

export default function DealerPanelPage() {
  return (
    <ModuleDashboard
      eyebrow="Panel comercial"
      title="Concesionarias, agencias y empresas agro en una misma cuenta."
      description="Desde este panel una organización puede operar stock, catálogo agro, vendedores, leads, planes, facturas, destacados y modalidades de cobro como financiación, permuta o agrocanje."
      cards={dealerPanelCards}
      cta={{ label: "Ver CRM", href: "/admin/leads" }}
    />
  );
}
