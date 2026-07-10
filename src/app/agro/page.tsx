import Link from "next/link";
import { SimplePage } from "@/components/simple-page";

export const metadata = { title: "Línea agro" };

export default function AgroPage() {
  return (
    <SimplePage eyebrow="Línea agro" title="Maquinaria, implementos y soluciones productivas con seguimiento comercial.">
      <p>
        La línea agro reúne maquinaria agrícola, implementos, unidades de apoyo y oportunidades productivas con filtros
        específicos como horas de uso, condición, financiación y permuta.
      </p>
      <Link href="/publicaciones?categoria=maquinaria-agricola" className="w-fit rounded-md bg-[#d6a82f] px-5 py-3 text-sm font-black text-[#152018]">
        Ver maquinaria
      </Link>
    </SimplePage>
  );
}
