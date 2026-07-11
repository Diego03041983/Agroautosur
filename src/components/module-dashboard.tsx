import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type ModuleCard = {
  title: string;
  text: string;
  href: string;
  Icon: LucideIcon;
};

export function ModuleDashboard({
  eyebrow,
  title,
  description,
  cards,
  cta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  cards: ModuleCard[];
  cta?: { label: string; href: string };
}) {
  return (
    <>
      <SiteHeader />
      <main className="aas-surface">
        <section className="bg-[#101713] text-white">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d6a82f]">{eyebrow}</p>
            <div className="mt-3 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">{title}</h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-white/68">{description}</p>
              </div>
              {cta ? (
                <Link href={cta.href} className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-lg bg-[#d6a82f] px-5 text-sm font-black text-[#152018]">
                  {cta.label} <ArrowRight size={18} />
                </Link>
              ) : null}
            </div>
          </div>
        </section>
        <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {cards.map(({ title: cardTitle, text, href, Icon }) => (
            <Link
              key={cardTitle}
              href={href}
              className="group rounded-xl border border-[#152018]/10 bg-white p-5 shadow-[0_14px_42px_rgba(21,32,24,0.08)] transition hover:-translate-y-0.5 hover:border-[#1f6b43]/35 hover:shadow-[0_24px_60px_rgba(21,32,24,0.14)]"
            >
              <span className="grid size-12 place-items-center rounded-lg bg-[#edf4e8] text-[#1f6b43] transition group-hover:bg-[#1f6b43] group-hover:text-white">
                <Icon size={23} />
              </span>
              <h2 className="mt-5 text-xl font-black text-[#152018]">{cardTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-[#667062]">{text}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#1f6b43]">
                Abrir módulo <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
