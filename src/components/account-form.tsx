"use client";

import { useState } from "react";
import { CheckCircle2, LogIn, UserPlus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function AccountForm() {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [userType, setUserType] = useState("particular");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(formData: FormData) {
    setStatus("loading");
    setMessage("");

    try {
      const supabase = createClient();
      const email = String(formData.get("email") ?? "");
      const password = String(formData.get("password") ?? "");

      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setStatus("success");
        setMessage("Ingresaste correctamente. Ya podés cargar una unidad.");
        window.setTimeout(() => window.location.assign("/vender"), 700);
        return;
      }

      const metadata = {
        full_name: formData.get("full_name"),
        phone: formData.get("phone"),
        city: formData.get("city"),
        province: formData.get("province") || "Santa Fe",
        document_type: formData.get("document_type"),
        document_number: formData.get("document_number"),
        user_type: formData.get("user_type"),
        organization_name: formData.get("organization_name"),
      };

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: metadata },
      });
      if (error) throw error;

      if (data.user) {
        await supabase.from("profiles").upsert({
          id: data.user.id,
          ...metadata,
        });
      }

      setStatus("success");
      setMessage("Cuenta creada. Si Supabase pide confirmar email, revisá tu correo; si no, ya podés ingresar.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "No pudimos completar la operación.");
    }
  }

  return (
    <form action={onSubmit} className="rounded-xl border border-[#152018]/10 bg-white p-5 shadow-[0_18px_56px_rgba(21,32,24,0.12)]">
      <div className="grid grid-cols-2 gap-2 rounded-lg bg-[#f0f3eb] p-1">
        <button type="button" onClick={() => setMode("signup")} className={`rounded-md px-3 py-2 text-sm font-black ${mode === "signup" ? "bg-white text-[#152018] shadow-sm" : "text-[#667062]"}`}>
          Crear cuenta
        </button>
        <button type="button" onClick={() => setMode("login")} className={`rounded-md px-3 py-2 text-sm font-black ${mode === "login" ? "bg-white text-[#152018] shadow-sm" : "text-[#667062]"}`}>
          Ingresar
        </button>
      </div>

      <div className="mt-5 grid gap-3">
        {mode === "signup" ? (
          <>
            <label className="grid gap-1.5 text-sm font-bold">
              Nombre y apellido / razón social
              <input name="full_name" required className="aas-field" />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-bold">
                WhatsApp
                <input name="phone" required className="aas-field" />
              </label>
              <label className="grid gap-1.5 text-sm font-bold">
                Tipo de usuario
                <select name="user_type" value={userType} onChange={(event) => setUserType(event.target.value)} className="aas-field">
                  <option value="particular">Particular</option>
                  <option value="agency">Agencia / concesionaria</option>
                  <option value="producer">Productor / empresa agro</option>
                </select>
              </label>
            </div>
            {userType === "agency" ? (
              <label className="grid gap-1.5 text-sm font-bold">
                Nombre comercial de la agencia o concesionaria
                <input name="organization_name" required placeholder="Ej: AgroAutoSur Firmat" className="aas-field" />
              </label>
            ) : null}
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-bold">
                Documento
                <select name="document_type" className="aas-field">
                  <option value="dni">DNI</option>
                  <option value="cuit">CUIT</option>
                </select>
              </label>
              <label className="grid gap-1.5 text-sm font-bold">
                Número
                <input name="document_number" required className="aas-field" />
              </label>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-bold">
                Ciudad
                <input name="city" required className="aas-field" />
              </label>
              <label className="grid gap-1.5 text-sm font-bold">
                Provincia
                <input name="province" defaultValue="Santa Fe" className="aas-field" />
              </label>
            </div>
          </>
        ) : null}

        <label className="grid gap-1.5 text-sm font-bold">
          Email
          <input name="email" type="email" required className="aas-field" />
        </label>
        <label className="grid gap-1.5 text-sm font-bold">
          Contraseña
          <input name="password" type="password" required minLength={6} className="aas-field" />
        </label>
        <button disabled={status === "loading"} className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#d6a82f] px-4 text-sm font-black text-[#152018] disabled:opacity-60">
          {mode === "signup" ? "Crear cuenta" : "Ingresar"}
          {mode === "signup" ? <UserPlus size={17} /> : <LogIn size={17} />}
        </button>
      </div>

      {message ? (
        <p className={`mt-4 inline-flex items-start gap-2 rounded-lg px-3 py-2 text-sm font-bold ${status === "error" ? "bg-red-50 text-red-700" : "bg-[#edf4e8] text-[#1f6b43]"}`}>
          {status === "success" ? <CheckCircle2 size={17} /> : null}
          {message}
        </p>
      ) : null}
    </form>
  );
}
