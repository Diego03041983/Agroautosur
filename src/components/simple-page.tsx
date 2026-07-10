import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SimplePage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#1f6b43]">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">{title}</h1>
        <div className="mt-8 grid gap-5 text-lg leading-8 text-[#4d574c]">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}
