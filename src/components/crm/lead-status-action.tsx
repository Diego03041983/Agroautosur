"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LeadStatus } from "@/types/domain";
import { leadStatuses, leadStatusLabels } from "@/lib/utils";

export function LeadStatusAction({
  leadId,
  currentStatus,
  currentAssignedTo,
}: {
  leadId: string;
  currentStatus: LeadStatus;
  currentAssignedTo?: string | null;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<LeadStatus>(currentStatus);
  const [assignedTo, setAssignedTo] = useState(currentAssignedTo ?? "");
  const [saving, setSaving] = useState(false);

  async function save(nextStatus = status, nextAssignedTo = assignedTo) {
    setSaving(true);
    await fetch(`/api/admin/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus, assigned_to: nextAssignedTo || null }),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <label className="grid gap-1.5 text-sm font-bold">
      Estado comercial
      <select
        value={status}
        disabled={saving}
        onChange={(event) => {
          const nextStatus = event.target.value as LeadStatus;
          setStatus(nextStatus);
          save(nextStatus);
        }}
        className="aas-field"
      >
        {leadStatuses.map((item) => (
          <option key={item} value={item}>
            {leadStatusLabels[item]}
          </option>
        ))}
      </select>
      <span className="mt-3">Responsable asignado</span>
      <input
        value={assignedTo}
        onChange={(event) => setAssignedTo(event.target.value)}
        onBlur={() => save(status, assignedTo)}
        placeholder="UUID del perfil responsable"
        className="aas-field"
      />
    </label>
  );
}
