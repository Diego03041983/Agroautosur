import { ModuleDashboard } from "@/components/module-dashboard";
import { analyticsCards } from "@/lib/platform-modules";

export const metadata = { title: "Analítica" };

export default function AnalyticsPage() {
  return (
    <ModuleDashboard
      eyebrow="Analítica"
      title="Tráfico, conversión, leads, MRR, churn, GMV y comisiones."
      description="Base para medir el negocio completo: adquisición, consultas, ventas declaradas, monetización recurrente, operaciones agro y comisiones."
      cards={analyticsCards}
      cta={{ label: "Ver leads", href: "/admin/leads" }}
      admin
    />
  );
}
