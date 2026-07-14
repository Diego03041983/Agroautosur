import Link from "next/link";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { SellerListingForm } from "@/components/seller-listing-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Quiero vender" };

export default async function SellPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

  return (
    <>
      <SiteHeader />
      <main className="aas-surface mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#1f6b43]">Quiero vender</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Publicá tu unidad con respaldo comercial.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#4d574c]">
            Para publicar pedimos una cuenta. Así podemos identificar al vendedor, guardar la unidad como pendiente y ordenar la revisión antes de mostrarla públicamente.
          </p>
        </div>
        {user ? (
          <div className="grid gap-5 lg:grid-cols-[1fr_0.38fr]">
            <SellerListingForm />
            <aside className="grid content-start gap-4">
              <div className="rounded-xl border border-[#152018]/10 bg-[#101713] p-5 text-white shadow-[0_18px_56px_rgba(21,32,24,0.16)]">
                <ShieldCheck className="text-[#d6a82f]" />
              <h2 className="mt-4 text-xl font-black">Proceso de revisión</h2>
              <p className="mt-2 text-sm leading-6 text-white/64">La unidad se guarda como publicación real en estado pendiente. AgroAutoSur revisa datos, fotos y condiciones antes de publicarla.</p>
              </div>
              <LeadForm leadType="sell_request" sourceLabel="Quiero vender - apoyo comercial" />
            </aside>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-xl border border-[#152018]/10 bg-white p-6 shadow-sm">
              <span className="grid size-12 place-items-center rounded-lg bg-[#edf4e8] text-[#1f6b43]">
                <LockKeyhole />
              </span>
              <h2 className="mt-4 text-2xl font-black">Ingresá o creá tu cuenta para cargar una unidad.</h2>
              <p className="mt-3 text-sm leading-6 text-[#667062]">
                La carga completa queda disponible para usuarios registrados. Esto ayuda a validar identidad, ordenar consultas y evitar publicaciones incompletas.
              </p>
              <Link href="/cuenta" className="mt-5 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#d6a82f] px-5 text-sm font-black text-[#152018]">
                Crear cuenta o ingresar
              </Link>
            </section>
            <LeadForm leadType="sell_request" sourceLabel="Quiero vender - sin cuenta" />
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
