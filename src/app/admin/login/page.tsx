import { AdminNav } from "@/components/admin-nav";
import { AdminLoginForm } from "@/components/admin-login-form";
import { SiteHeader } from "@/components/site-header";

export const metadata = { title: "Login admin" };

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <AdminNav />
      <main className="aas-surface mx-auto grid min-h-[70vh] w-full max-w-4xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-[0.9fr_1fr] md:items-center lg:px-8">
        <section className="rounded-lg bg-[#101713] p-5 text-white shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d6a82f]">Acceso administrativo</p>
          <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Ingreso seguro para operar la plataforma.</h1>
          <p className="mt-4 text-sm leading-6 text-white/66">Acceso reservado para operación interna, CRM, backoffice y analítica.</p>
          <div className="mt-5 grid gap-2 text-sm font-bold text-white/75">
            <span className="rounded-lg bg-white/8 px-3 py-2">Roles: super admin, admin, agencia y vendedor</span>
            <span className="rounded-lg bg-white/8 px-3 py-2">Protección de rutas administrativas</span>
            <span className="rounded-lg bg-white/8 px-3 py-2">Auditoría de accesos y acciones críticas</span>
          </div>
        </section>
        <AdminLoginForm />
      </main>
    </>
  );
}
