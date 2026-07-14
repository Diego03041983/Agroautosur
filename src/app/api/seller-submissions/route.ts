import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sellerListingSchema } from "@/lib/validations";

function nullableText(value: unknown) {
  const text = String(value ?? "").trim();
  return text || null;
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function splitPhotoLinks(value?: string | null) {
  return String(value ?? "")
    .split(/\n|,|\s{2,}/)
    .map((item) => item.trim())
    .filter((item) => item.startsWith("http://") || item.startsWith("https://"));
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  if (!payload) return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });

  const parsed = sellerListingSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Datos inválidos" }, { status: 400 });
  }

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

  const membershipResult = await supabase
    .from("organization_members")
    .select("organization_id, role, organization:organizations(id,name,type)")
    .eq("profile_id", user.id)
    .eq("is_active", true)
    .limit(1)
    .maybeSingle();
  const organizationId = membershipResult.data?.organization_id ?? null;
  const sellerType = organizationId ? "agency" : "individual";

  const { data: category } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", parsed.data.category_slug)
    .eq("is_active", true)
    .maybeSingle();

  if (!category) {
    return NextResponse.json({ error: "El rubro seleccionado no está disponible." }, { status: 400 });
  }

  const { data: submission, error: submissionError } = await supabase.from("seller_listing_submissions").insert({
    owner_profile_id: user.id,
    organization_id: organizationId,
    category_slug: parsed.data.category_slug,
    title: parsed.data.title,
    brand: parsed.data.brand,
    model: parsed.data.model,
    version: nullableText(parsed.data.version),
    year: parsed.data.year,
    condition: parsed.data.condition,
    mileage: parsed.data.mileage ?? null,
    hours_used: parsed.data.hours_used ?? null,
    fuel_type: nullableText(parsed.data.fuel_type),
    transmission: nullableText(parsed.data.transmission),
    traction: nullableText(parsed.data.traction),
    engine: nullableText(parsed.data.engine),
    price_usd: parsed.data.price_usd ?? null,
    price_ars: parsed.data.price_ars ?? null,
    location_city: parsed.data.location_city,
    location_province: parsed.data.location_province,
    accepts_trade_in: parsed.data.accepts_trade_in,
    financing_available: parsed.data.financing_available,
    description: parsed.data.description,
    photo_links: nullableText(parsed.data.photo_links),
    status: "pending",
  }).select("id").single();

  if (submissionError || !submission) {
    return NextResponse.json({ error: "No se pudo guardar la unidad." }, { status: 500 });
  }

  const slug = `${slugify(parsed.data.title)}-${submission.id.slice(0, 8)}`;
  const primaryCurrency = parsed.data.price_usd ? "USD" : "ARS";
  const primaryPrice = parsed.data.price_usd ?? parsed.data.price_ars ?? null;
  const photoLinks = splitPhotoLinks(parsed.data.photo_links);

  const { data: listing, error: listingError } = await supabase.from("listings").insert({
    title: parsed.data.title,
    slug,
    category_id: category.id,
    brand_id: null,
    model_id: null,
    year: parsed.data.year,
    price: primaryPrice,
    currency: primaryCurrency,
    price_usd: parsed.data.price_usd ?? null,
    price_ars: parsed.data.price_ars ?? null,
    location_city: parsed.data.location_city,
    location_province: parsed.data.location_province,
    description: parsed.data.description,
    condition: parsed.data.condition,
    mileage: parsed.data.mileage ?? null,
    fuel_type: nullableText(parsed.data.fuel_type),
    transmission: nullableText(parsed.data.transmission),
    traction: nullableText(parsed.data.traction),
    engine: nullableText(parsed.data.engine),
    hours_used: parsed.data.hours_used ?? null,
    accepts_trade_in: parsed.data.accepts_trade_in,
    financing_available: parsed.data.financing_available,
    status: "pending",
    seller_type: sellerType,
    organization_id: organizationId,
    owner_profile_id: user.id,
    source_submission_id: submission.id,
  }).select("id").single();

  if (listingError || !listing) {
    await supabase.from("seller_listing_submissions").update({ admin_notes: "No se pudo crear la publicación operativa." }).eq("id", submission.id);
    return NextResponse.json({ error: "Guardamos la solicitud, pero no se pudo crear la publicación operativa." }, { status: 500 });
  }

  if (photoLinks.length) {
    await supabase.from("listing_images").insert(
      photoLinks.slice(0, 12).map((url, index) => ({
        listing_id: listing.id,
        url,
        alt: parsed.data.title,
        sort_order: index,
      })),
    );
  }

  await supabase.from("listing_payment_options").insert([
    { listing_id: listing.id, method: "financing", is_enabled: parsed.data.financing_available },
    { listing_id: listing.id, method: "trade_in", is_enabled: parsed.data.accepts_trade_in },
    { listing_id: listing.id, method: "agrocanje", is_enabled: parsed.data.accepts_agrocanje },
  ]);

  return NextResponse.json({ ok: true, listing_id: listing.id, status: "pending" });
}
