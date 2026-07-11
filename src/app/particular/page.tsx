import { ModuleDashboard } from "@/components/module-dashboard";
import { sellerPanelCards } from "@/lib/platform-modules";

export const metadata = { title: "Panel particular" };

export default function SellerPanelPage() {
  return (
    <ModuleDashboard
      eyebrow="Panel particular"
      title="Carga, verificación, edición y rendimiento de tus publicaciones."
      description="Base para que un vendedor particular gestione sus unidades, pagos, métricas, renovaciones y solicitudes de revisión antes de publicar."
      cards={sellerPanelCards}
      cta={{ label: "Cargar vehículo", href: "/vender" }}
    />
  );
}
