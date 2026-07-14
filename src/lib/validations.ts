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

export const listingStatusUpdateSchema = z.object({
  status: z.enum(["draft", "pending", "published", "paused", "sold", "rejected"]),
  admin_notes: z.string().trim().max(1200).nullable().optional(),
});

const optionalNumber = z.preprocess(
  (value) => (value === "" || value === null || value === undefined ? null : Number(value)),
  z.number().nonnegative().nullable(),
);

export const sellerListingSchema = z.object({
  category_slug: z.string().trim().min(1, "Elegí un rubro"),
  title: z.string().trim().min(6, "Ingresá un título claro").max(160),
  brand: z.string().trim().min(1, "Ingresá marca").max(80),
  model: z.string().trim().min(1, "Ingresá modelo").max(80),
  version: z.string().trim().max(80).nullable().optional().or(z.literal("")),
  year: z.coerce.number().int().min(1950).max(2035),
  condition: z.enum(["new", "used"]).default("used"),
  mileage: optionalNumber.optional(),
  hours_used: optionalNumber.optional(),
  fuel_type: z.string().trim().max(80).nullable().optional().or(z.literal("")),
  transmission: z.string().trim().max(80).nullable().optional().or(z.literal("")),
  traction: z.string().trim().max(80).nullable().optional().or(z.literal("")),
  engine: z.string().trim().max(80).nullable().optional().or(z.literal("")),
  price_usd: optionalNumber.optional(),
  price_ars: optionalNumber.optional(),
  location_city: z.string().trim().min(2, "Ingresá ciudad").max(80),
  location_province: z.string().trim().min(2).max(80).default("Santa Fe"),
  accepts_trade_in: z.coerce.boolean().default(false),
  financing_available: z.coerce.boolean().default(false),
  accepts_agrocanje: z.coerce.boolean().default(false),
  description: z.string().trim().min(20, "Sumá una descripción más completa").max(4000),
  photo_links: z.string().trim().max(3000).nullable().optional().or(z.literal("")),
});
