import { AdminNav } from "@/components/admin-nav";
import { SiteHeader } from "@/components/site-header";

export const metadata = { title: "Login admin" };

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <AdminNav />
      <main className="aas-surface mx-auto grid min-h-[74vh] w-full max-w-5xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-[0.9fr_1fr] md:items-center lg:px-8">
        <section className="rounded-2xl bg-[#101713] p-6 text-white shadow-[0_20px_70px_rgba(21,32,24,0.18)]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d6a82f]">Acceso administrativo</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Ingreso seguro para operar la plataforma.</h1>
          <p className="mt-4 text-sm leading-6 text-white/66">Acceso reservado para operación interna, CRM, backoffice y analítica.</p>
          <div className="mt-5 grid gap-2 text-sm font-bold text-white/75">
            <span className="rounded-lg bg-white/8 px-3 py-2">Roles: super admin, admin, agencia y vendedor</span>
            <span className="rounded-lg bg-white/8 px-3 py-2">Protección de rutas administrativas</span>
            <span className="rounded-lg bg-white/8 px-3 py-2">Auditoría de accesos y acciones críticas</span>
          </div>
        </section>
        <form className="w-full rounded-xl border border-[#152018]/10 bg-white p-6 shadow-[0_18px_56px_rgba(21,32,24,0.14)]">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#1f6b43]">Acceso privado</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">Ingresar al panel</h1>
          <label className="mt-6 grid gap-1.5 text-sm font-bold">
            Email
            <input type="email" className="aas-field" />
          </label>
          <label className="mt-3 grid gap-1.5 text-sm font-bold">
            Contraseña
            <input type="password" className="aas-field" />
          </label>
          <button className="mt-5 min-h-12 w-full rounded-lg bg-[#183d2a] px-4 text-sm font-black text-white">
            Ingresar
          </button>
          <p className="mt-4 text-xs leading-5 text-[#667062]">Acceso administrativo preparado para validación por roles.</p>
        </form>
      </main>
    </>
  );
}
