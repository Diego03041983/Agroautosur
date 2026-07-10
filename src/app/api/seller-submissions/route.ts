import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function nullableNumber(value: unknown) {
  const text = String(value ?? "").trim();
  if (!text) return null;
  const number = Number(text);
  return Number.isFinite(number) ? number : null;
}

function nullableText(value: unknown) {
  const text = String(value ?? "").trim();
  return text || null;
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  if (!payload) return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ ok: true, mode: "demo" }, { status: 202 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Necesitás ingresar con tu cuenta para cargar una unidad." }, { status: 401 });
  }

  const required = ["category_slug", "title", "brand", "model", "year", "location_city", "description"];
  if (required.some((field) => !String(payload[field] ?? "").trim())) {
    return NextResponse.json({ error: "Faltan datos obligatorios." }, { status: 400 });
  }

  await supabase.from("profiles").upsert({
    id: user.id,
    full_name: user.user_metadata?.full_name ?? user.email,
    phone: user.user_metadata?.phone ?? null,
    city: user.user_metadata?.city ?? null,
    province: user.user_metadata?.province ?? "Santa Fe",
    document_type: user.user_metadata?.document_type ?? null,
    document_number: user.user_metadata?.document_number ?? null,
    user_type: user.user_metadata?.user_type ?? "particular",
  });

  const { error } = await supabase.from("seller_listing_submissions").insert({
    owner_profile_id: user.id,
    category_slug: String(payload.category_slug),
    title: String(payload.title).trim(),
    brand: nullableText(payload.brand),
    model: nullableText(payload.model),
    version: nullableText(payload.version),
    year: nullableNumber(payload.year),
    condition: payload.condition === "new" ? "new" : "used",
    mileage: nullableNumber(payload.mileage),
    hours_used: nullableNumber(payload.hours_used),
    fuel_type: nullableText(payload.fuel_type),
    transmission: nullableText(payload.transmission),
    traction: nullableText(payload.traction),
    engine: nullableText(payload.engine),
    price_usd: nullableNumber(payload.price_usd),
    price_ars: nullableNumber(payload.price_ars),
    location_city: String(payload.location_city).trim(),
    location_province: nullableText(payload.location_province) ?? "Santa Fe",
    accepts_trade_in: Boolean(payload.accepts_trade_in),
    financing_available: Boolean(payload.financing_available),
    description: String(payload.description).trim(),
    photo_links: nullableText(payload.photo_links),
    status: "pending",
  });

  if (error) {
    return NextResponse.json({ error: "No se pudo guardar la unidad." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
