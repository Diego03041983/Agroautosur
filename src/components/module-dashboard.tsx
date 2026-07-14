import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { AdminNav } from "@/components/admin-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type ModuleCard = {
  title: string;
  text: string;
  href: string;
  Icon: LucideIcon;
  state?: string;
  functionality?: string;
  nextStep?: string;
};

export function ModuleDashboard({
  eyebrow,
  title,
  description,
  cards,
  cta,
  admin = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  cards: ModuleCard[];
  cta?: { label: string; href: string };
  admin?: boolean;
}) {
  return (
    <>
      <SiteHeader />
      {admin ? <AdminNav /> : null}
      <main className="aas-surface">
        <section className={admin ? "border-b border-[#152018]/10 bg-white" : "bg-[#101713] text-white"}>
          <div className={admin ? "mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8" : "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"}>
            <p className={admin ? "text-[11px] font-black uppercase tracking-[0.16em] text-[#1f6b43]" : "text-xs font-black uppercase tracking-[0.2em] text-[#d6a82f]"}>{eyebrow}</p>
            <div className="mt-2 flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
              <div>
                <h1 className={admin ? "max-w-4xl text-2xl font-black tracking-tight text-[#152018] sm:text-3xl" : "max-w-4xl text-4xl font-black tracking-tight sm:text-6xl"}>{title}</h1>
                <p className={admin ? "mt-2 max-w-3xl text-sm leading-6 text-[#667062]" : "mt-4 max-w-3xl text-base leading-7 text-white/68"}>{description}</p>
              </div>
              {cta ? (
                <Link href={cta.href} className={admin ? "inline-flex h-9 w-fit items-center justify-center gap-2 rounded-md bg-[#152018] px-3 text-xs font-black text-white" : "inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-lg bg-[#d6a82f] px-5 text-sm font-black text-[#152018]"}>
                  {cta.label} <ArrowRight size={admin ? 14 : 18} />
                </Link>
              ) : null}
            </div>
          </div>
        </section>
        {admin ? (
          <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-lg border border-[#152018]/10 bg-white">
              <div className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-[#152018]/10 bg-[#f8faf6] px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-[#667062]">
                <span>Módulo</span>
                <span>Estado</span>
                <span>Acción</span>
              </div>
              <div className="divide-y divide-[#152018]/8">
                {cards.map(({ title: cardTitle, text, href, Icon, state }) => (
                  <Link key={cardTitle} href={href} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 px-3 py-3 transition hover:bg-[#f8faf6]">
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="grid size-8 shrink-0 place-items-center rounded-md bg-[#edf4e8] text-[#1f6b43]">
                        <Icon size={16} />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-black text-[#152018]">{cardTitle}</span>
                        <span className="mt-0.5 block truncate text-xs text-[#667062]">{text}</span>
                      </span>
                    </span>
                    <span className="rounded-full bg-[#fff5d8] px-2 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-[#6f4e00]">{state ?? "Base"}</span>
                    <span className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#152018]/10 px-2 text-xs font-black text-[#1f6b43]">
                      Abrir <ArrowRight size={13} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {cards.map(({ title: cardTitle, text, href, Icon, state }) => (
              <Link key={cardTitle} href={href} className="group rounded-xl border border-[#152018]/10 bg-white p-5 shadow-[0_14px_42px_rgba(21,32,24,0.08)] transition hover:-translate-y-0.5 hover:border-[#1f6b43]/35 hover:shadow-[0_24px_60px_rgba(21,32,24,0.14)]">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-[#edf4e8] text-[#1f6b43] transition group-hover:bg-[#1f6b43] group-hover:text-white">
                    <Icon size={23} />
                  </span>
                  {state ? <span className="rounded-full bg-[#fff5d8] px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.08em] text-[#6f4e00]">{state}</span> : null}
                </div>
                <h2 className="mt-5 text-xl font-black text-[#152018]">{cardTitle}</h2>
                <p className="mt-2 text-sm leading-6 text-[#667062]">{text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#1f6b43]">
                  Abrir módulo <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
