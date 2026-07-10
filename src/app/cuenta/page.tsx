import Link from "next/link";
import { AccountForm } from "@/components/account-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = { title: "Mi cuenta" };

export default function AccountPage() {
  return (
    <>
      <SiteHeader />
      <main className="aas-surface mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-[0.82fr_1fr] lg:px-8">
        <section className="rounded-2xl bg-[#101713] p-6 text-white sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d6a82f]">Mi cuenta AgroAutoSur</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Creá tu usuario para publicar y seguir operaciones.</h1>
          <p className="mt-4 text-sm leading-6 text-white/68">
            Pedimos datos comerciales básicos para validar mejor las publicaciones, contactar por WhatsApp y ordenar la venta.
          </p>
          <div className="mt-6 grid gap-2 text-sm font-bold text-white/78">
            <span className="rounded-lg bg-white/8 px-3 py-2">Datos personales o razón social</span>
            <span className="rounded-lg bg-white/8 px-3 py-2">WhatsApp, ciudad y documentación</span>
            <span className="rounded-lg bg-white/8 px-3 py-2">Carga de unidad con revisión antes de publicar</span>
          </div>
          <Link href="/vender" className="mt-6 inline-flex rounded-lg border border-white/14 px-4 py-3 text-sm font-black text-white">
            Ir a publicar
          </Link>
        </section>
        <AccountForm />
      </main>
      <SiteFooter />
    </>
  );
}
