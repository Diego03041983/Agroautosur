import { redirect } from "next/navigation";

export const metadata = { title: "Agrocanje" };

export default function AgrocanjePage() {
  redirect("/concesionaria");
}
