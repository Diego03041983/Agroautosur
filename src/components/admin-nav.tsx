import Link from "next/link";
import { BarChart3, ClipboardCheck, LayoutDashboard, LogIn, MessageSquareText } from "lucide-react";

const adminLinks = [
  { label: "Dashboard", href: "/admin", Icon: LayoutDashboard },
  { label: "CRM Leads", href: "/admin/leads", Icon: MessageSquareText },
  { label: "Backoffice", href: "/admin/backoffice", Icon: ClipboardCheck },
  { label: "Analítica", href: "/admin/analitica", Icon: BarChart3 },
  { label: "Acceso", href: "/admin/login", Icon: LogIn },
];

export function AdminNav() {
  return (
    <nav className="border-b border-[#152018]/10 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-1.5 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
        {adminLinks.map(({ label, href, Icon }) => (
          <Link
            key={href}
            href={href}
            className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md px-2.5 text-xs font-bold text-[#4d574c] transition hover:bg-[#edf4e8] hover:text-[#1f6b43]"
          >
            <Icon size={14} />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
