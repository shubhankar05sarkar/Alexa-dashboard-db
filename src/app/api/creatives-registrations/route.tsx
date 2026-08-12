import { NextRequest, NextResponse } from "next/server";
import {
  authenticateRecruitment26Request,
  getRecruitment26EntryRound,
  isAuthenticatedUser,
  registrationSupabase,
} from "../../../lib/recruitments26-server";

interface RecruitmentData {
  id: number;
  name: string;
  register_number: string;
  srmist_email: string;
  phone_number: string;
  created_at: string;
  first_domain: string;
  second_domain: string | null;
  domain1_round: number;
  domain2_round: number | null;
}

interface IndividualRegistrationWithRound {
  id: string;
  name: string;
  registerNumber: string;
  email: string;
  phone: string;
  registeredAt: string;
  round: number;
  domain1: string;
  domain2: string | null;
  domain1_round: number;
  domain2_round: number | null;
}

export async function GET(req: NextRequest) {
  try {
    const authResult = await authenticateRecruitment26Request(req);
    if (!isAuthenticatedUser(authResult)) {
      return authResult.response;
    }

    const { data, error } = await registrationSupabase
      .from("recruitment_entries")
      .select("*")
      .or("first_domain.ilike.%creatives%,second_domain.ilike.%creatives%");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json([]);
    }

    const transformedData: IndividualRegistrationWithRound[] = (
      data as RecruitmentData[]
    ).map((item) => {
      return {
        id: item.id.toString(),
        name: item.name,
        registerNumber: item.register_number,
        email: item.srmist_email,
        phone: item.phone_number,
        registeredAt: new Date(item.created_at).toLocaleDateString(),

        round: getRecruitment26EntryRound(item, "creatives"),

        domain1: item.first_domain,
        domain2: item.second_domain,

        domain1_round: item.domain1_round,
        domain2_round: item.domain2_round,
      };
    });

    return NextResponse.json(transformedData);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
