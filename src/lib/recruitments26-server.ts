import { createClient, type User } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { registrationSupabase } from "./supabase-client";

const dashboardUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  process.env.NEXT_PUBLIC_DASHBOARD_URL;
const dashboardAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_DASBOARD_ANON_KEY;

type RecruitmentEntry = {
  id: number;
  created_at: string;
  name: string;
  register_number: string;
  phone_number: string;
  srmist_email: string;
  first_domain: string;
  second_domain: string | null;
  domain1_round: number;
  domain2_round: number | null;
};

export async function authenticateRecruitment26Request(
  request: NextRequest,
): Promise<{ user: User } | { response: NextResponse }> {
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return {
      response: NextResponse.json(
        { error: "No authorization header" },
        { status: 401 },
      ),
    };
  }

  const token = authHeader.slice("Bearer ".length).trim();
  const dashboardRequestClient = createClient(
    dashboardUrl!,
    dashboardAnonKey!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
  );

  const {
    data: { user },
    error,
  } = await dashboardRequestClient.auth.getUser();

  if (error || !user) {
    return {
      response: NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 },
      ),
    };
  }

  return { user };
}

export function isAuthenticatedUser(
  result: Awaited<ReturnType<typeof authenticateRecruitment26Request>>,
): result is { user: User } {
  return "user" in result;
}

export function getRecruitment26EntryRound(
  entry: Pick<
    RecruitmentEntry,
    "first_domain" | "second_domain" | "domain1_round" | "domain2_round"
  >,
  domain: string,
): number {
  if (entry.first_domain.toLowerCase().includes(domain)) {
    return entry.domain1_round;
  }

  return entry.domain2_round ?? 1;
}

export { registrationSupabase };
export type { RecruitmentEntry };

