import { redirect } from "next/navigation";

export const metadata = { title: "Proveedor agro" };

export default function AgroProviderPanelPage() {
  redirect("/concesionaria");
}
