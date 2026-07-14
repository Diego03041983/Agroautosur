"use client";

import { useState } from "react";
import { LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function AdminLoginForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(formData: FormData) {
    setStatus("loading");
    setMessage("");

    try {
      const supabase = createClient();
      const email = String(formData.get("email") ?? "");
      const password = String(formData.get("password") ?? "");
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      window.location.assign("/admin");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "No pudimos iniciar sesión.");
    }
  }

  return (
    <form action={onSubmit} className="w-full rounded-lg border border-[#152018]/10 bg-white p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1f6b43]">Acceso privado</p>
      <h1 className="mt-2 text-2xl font-black tracking-tight">Ingresar al panel</h1>
      <label className="mt-5 grid gap-1.5 text-xs font-bold">
        Email
        <input name="email" type="email" required className="aas-admin-field" />
      </label>
      <label className="mt-3 grid gap-1.5 text-xs font-bold">
        Contraseña
        <input name="password" type="password" required className="aas-admin-field" />
      </label>
      <button disabled={status === "loading"} className="mt-5 inline-flex h-9 w-full items-center justify-center gap-2 rounded-md bg-[#183d2a] px-4 text-xs font-black text-white disabled:opacity-60">
        {status === "loading" ? "Ingresando..." : "Ingresar"}
        <LogIn size={14} />
      </button>
      {message ? <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-xs font-bold text-red-700">{message}</p> : null}
      <p className="mt-4 text-xs leading-5 text-[#667062]">El acceso a backoffice requiere rol admin o super admin.</p>
    </form>
  );
}
