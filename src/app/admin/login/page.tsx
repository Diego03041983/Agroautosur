import { SiteHeader } from "@/components/site-header";

export const metadata = { title: "Login admin" };

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <main className="aas-surface mx-auto grid min-h-[74vh] w-full max-w-md place-items-center px-4 py-10">
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
          <p className="mt-4 text-xs leading-5 text-[#667062]">
            La autenticación queda preparada para conectar con Supabase Auth en server actions/middleware.
          </p>
        </form>
      </main>
    </>
  );
}
