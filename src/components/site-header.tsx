"use client";

import Link from "next/link";
import { Menu, MessageCircle, Search, UserRound, X } from "lucide-react";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";

const nav = [
  ["Publicaciones", "/publicaciones"],
  ["Financiación", "/financiacion"],
  ["Evaluar", "/tasacion"],
  ["Agencias", "/agencias"],
  ["Agro", "/agro"],
  ["Contacto", "/contacto"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#152018]/10 bg-[#f7f8f3]/94 shadow-[0_1px_0_rgba(255,255,255,0.75)_inset] backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="AgroAutoSur inicio" onClick={() => setOpen(false)}>
          <BrandLogo className="w-32 sm:w-40" priority />
        </Link>

        <nav className="hidden items-center gap-5 text-[13px] font-bold text-[#384239] lg:flex xl:gap-6">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="whitespace-nowrap transition hover:text-[#1f6b43]">
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/publicaciones"
            className="grid size-10 place-items-center rounded-md border border-[#152018]/10 bg-white text-[#152018] lg:hidden"
            aria-label="Buscar publicaciones"
          >
            <Search size={18} />
          </Link>
          <Link
            href="/cuenta"
            className="hidden h-10 items-center gap-2 rounded-md border border-[#152018]/12 bg-white px-3 text-[13px] font-black text-[#152018] shadow-sm transition hover:border-[#1f6b43]/40 hover:text-[#1f6b43] sm:inline-flex"
          >
            <UserRound size={16} />
            Cuenta
          </Link>
          <Link
            href="/contacto"
            className="hidden h-10 items-center gap-2 rounded-md border border-[#152018]/12 bg-white px-3 text-[13px] font-black text-[#152018] shadow-sm transition hover:border-[#1f6b43]/40 hover:text-[#1f6b43] lg:inline-flex"
          >
            <MessageCircle size={17} />
            Consultar
          </Link>
          <Link
            href="/vender"
            className="hidden h-10 items-center rounded-md bg-[#d6a82f] px-4 text-[13px] font-black text-[#152018] shadow-[0_12px_24px_rgba(214,168,47,0.22)] transition hover:bg-[#e7bf55] sm:inline-flex"
          >
            Vender
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid size-10 place-items-center rounded-md border border-[#152018]/10 bg-white lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[#152018]/10 bg-[#f7f8f3] px-4 pb-4 pt-2 shadow-[0_18px_42px_rgba(21,32,24,0.14)] lg:hidden">
          <nav className="grid gap-1">
            {[...nav, ["Mi cuenta", "/cuenta"], ["Quiero vender", "/vender"]].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-black text-[#152018] transition hover:bg-white hover:text-[#1f6b43]"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link href="/publicaciones" onClick={() => setOpen(false)} className="rounded-lg bg-[#152018] px-3 py-3 text-center text-sm font-black text-white">
              Buscar
            </Link>
            <Link href="/vender" onClick={() => setOpen(false)} className="rounded-lg bg-[#d6a82f] px-3 py-3 text-center text-sm font-black text-[#152018]">
              Publicar
            </Link>
          </div>
        </div>
      ) : null}

      <div className="border-t border-[#152018]/8 bg-[#152018] px-4 py-2 text-center text-xs font-bold text-white sm:hidden">
        Comprá, vendé o consultá desde el celular
      </div>
    </header>
  );
}
