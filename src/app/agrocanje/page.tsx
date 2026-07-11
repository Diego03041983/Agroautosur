import { ModuleDashboard } from "@/components/module-dashboard";
import { agrocanjeCards } from "@/lib/platform-modules";

export const metadata = { title: "Agrocanje" };

export default function AgrocanjePage() {
  return (
    <ModuleDashboard
      eyebrow="Módulo Agrocanje"
      title="Operaciones expresadas en toneladas, con entrega, liquidación y cierre."
      description="Base funcional para registrar solicitudes de agrocanje, cotizar en toneladas, asignar operador, seguir entrega y cerrar liquidaciones con trazabilidad."
      cards={agrocanjeCards}
      cta={{ label: "Consultar operación", href: "/contacto" }}
    />
  );
}
