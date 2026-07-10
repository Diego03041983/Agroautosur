import { SimplePage } from "@/components/simple-page";

export const metadata = { title: "Qué es AgroAutoSur" };

export default function AboutPage() {
  return (
    <SimplePage eyebrow="Institucional" title="Una plataforma para resolver mejor operaciones de movilidad, trabajo y agro.">
      <p>
        AgroAutoSur ordena publicaciones, consultas, financiación y permutas en un entorno pensado para operaciones reales.
      </p>
      <p>
        La plataforma nace preparada para crecer con agencias, vendedores, validaciones internas, publicaciones destacadas
        y trazabilidad comercial desde el primer contacto.
      </p>
    </SimplePage>
  );
}
