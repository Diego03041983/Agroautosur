import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types/domain";

type Membership = {
  id: string;
  organization_id: string;
  profile_id: string;
  role: string;
  is_active: boolean;
  organization?: {
    id: string;
    name: string;
    slug: string;
    type: string;
    commercial_vertical?: string | null;
  } | null;
};

export async function getCurrentUserContext() {
  const supabase = await createClient();
  if (!supabase) {
    return { supabase: null, user: null, profile: null, roles: [] as UserRole[], memberships: [] as Membership[], isStaff: true, isDemo: true };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { supabase, user: null, profile: null, roles: [] as UserRole[], memberships: [] as Membership[], isStaff: false, isDemo: false };
  }

  const [profileResult, rolesResult, membershipsResult] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
    supabase.from("users_roles").select("role").eq("profile_id", user.id),
    supabase
      .from("organization_members")
      .select("id,organization_id,profile_id,role,is_active,organization:organizations(id,name,slug,type,commercial_vertical)")
      .eq("profile_id", user.id)
      .eq("is_active", true),
  ]);

  const roles = ((rolesResult.data ?? []).map((item) => item.role) as UserRole[]) ?? [];
  const memberships = ((membershipsResult.data ?? []) as unknown as Membership[]) ?? [];
  const isStaff = roles.includes("super_admin") || roles.includes("admin");

  return {
    supabase,
    user,
    profile: profileResult.data,
    roles,
    memberships,
    isStaff,
    isDemo: false,
  };
}

export async function requireUser() {
  const context = await getCurrentUserContext();
  if (!context.user && !context.isDemo) redirect("/cuenta");
  return context;
}

export async function requireStaff() {
  const context = await getCurrentUserContext();
  if (!context.isStaff && !context.isDemo) redirect("/admin/login");
  return context;
}

