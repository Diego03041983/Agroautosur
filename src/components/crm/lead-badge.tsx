import type { LeadStatus, LeadType } from "@/types/domain";
import { leadStatusLabels, leadTypeLabels } from "@/lib/utils";

const statusClasses: Record<LeadStatus, string> = {
  new: "bg-[#fff5d8] text-[#6f4e00]",
  contacted: "bg-[#eef1ec] text-[#384239]",
  interested: "bg-[#edf4e8] text-[#1f6b43]",
  in_financing: "bg-[#e9f2ff] text-[#16518a]",
  in_negotiation: "bg-[#f4edff] text-[#5b3292]",
  closed: "bg-[#e9f8ee] text-[#176b38]",
  lost: "bg-[#feecec] text-[#a51f1f]",
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={`rounded-md px-2.5 py-1.5 text-xs font-black ${statusClasses[status]}`}>
      {leadStatusLabels[status]}
    </span>
  );
}

export function LeadTypeBadge({ type }: { type: LeadType }) {
  return (
    <span className="rounded-md bg-[#f0f3eb] px-2.5 py-1.5 text-xs font-black text-[#384239]">
      {leadTypeLabels[type]}
    </span>
  );
}
