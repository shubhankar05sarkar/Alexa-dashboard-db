import { NextRequest, NextResponse } from "next/server";
import {
  authenticateRecruitment26Request,
  isAuthenticatedUser,
  registrationSupabase,
} from "../../../lib/recruitments26-server";

export async function GET(req: NextRequest) {
  try {
    const authResult = await authenticateRecruitment26Request(req);
    if (!isAuthenticatedUser(authResult)) {
      return authResult.response;
    }

    const domains = [
      "technical",
      "creatives",
      "business",
      "events",
    ];

    const domainCounts: { [key: string]: number } = {};

    for (const domain of domains) {
      const { count, error: countError } = await registrationSupabase
        .from("recruitment_entries")
        .select("*", { count: "exact" })
        .or(
          `first_domain.ilike.%${domain}%,second_domain.ilike.%${domain}%`,
        );

      if (countError) {
        console.error(
          `Error counting ${domain} registrations:`,
          countError,
        );

        domainCounts[domain] = 0;
      } else {
        domainCounts[domain] = count || 0;
      }
    }

    return NextResponse.json({ domainCounts });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}