import { z } from "zod";

export const leadSchema = z.object({
  listing_id: z.string().uuid().nullable().optional(),
  lead_type: z.enum([
    "listing_interest",
    "financing",
    "trade_in",
    "wanted",
    "sell_request",
    "general_contact",
  ]),
  full_name: z.string().trim().min(3, "Ingresá nombre y apellido").max(120),
  phone: z.string().trim().min(8, "Ingresá un teléfono válido").max(40),
  email: z.string().trim().email("Email inválido").nullable().optional().or(z.literal("")),
  city: z.string().trim().max(80).nullable().optional(),
  message: z.string().trim().max(1200).nullable().optional(),
  has_trade_in: z.coerce.boolean().optional().default(false),
  needs_financing: z.coerce.boolean().optional().default(false),
  desired_budget: z
    .preprocess((value) => (value === "" || value === null || value === undefined ? null : Number(value)), z.number().positive().nullable())
    .optional(),
  source_path: z.string().trim().max(240).nullable().optional(),
  source_label: z.string().trim().max(160).nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).optional().default({}),
});

export const leadStatusSchema = z.object({
  status: z.enum([
    "new",
    "contacted",
    "interested",
    "in_financing",
    "in_negotiation",
    "closed",
    "lost",
  ]),
});

export const leadUpdateSchema = leadStatusSchema.extend({
  assigned_to: z.string().uuid().nullable().optional(),
});

export const leadNoteSchema = z.object({
  note: z.string().trim().min(3, "La nota debe tener al menos 3 caracteres").max(2000),
});
