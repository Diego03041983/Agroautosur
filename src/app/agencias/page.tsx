import Link from "next/link";
import { SimplePage } from "@/components/simple-page";

export const metadata = { title: "Agencias y concesionarias" };

export default function AgenciesPage() {
  return (
    <SimplePage eyebrow="Agencias" title="Stock propio, leads centralizados y seguimiento claro.">
      <p>
        AgroAutoSur está preparado para que agencias y concesionarias gestionen publicaciones, imágenes, estados
        comerciales y consultas desde un panel operativo simple.
      </p>
      <Link href="/contacto" className="w-fit rounded-md bg-[#183d2a] px-5 py-3 text-sm font-black text-white">
        Solicitar alta de agencia
      </Link>
    </SimplePage>
  );
}
