import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

interface RecruitmentData {
  id: number;
  name: string;
  register_number: string;
  srmist_email: string;
  phone_number: string;
  created_at: string;
  first_domain: string;
  second_domain: string;
  github_link: string | null;
  linkedin_link: string | null;
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
    // Get the authorization header
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "No authorization header" },
        { status: 401 },
      );
    }

    // Set the session for the request
    const token = authHeader.replace("Bearer ", "");

    // Create a client with the user's token for RLS context
    const userSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
      error: authError,
    } = await userSupabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 },
      );
    }

    const { data, error } = await userSupabase
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

        // All new applicants start in Round 1
        round: 1,

        domain1: item.first_domain,
        domain2: item.second_domain,

        // Kept for compatibility with the existing frontend type
        domain1_round: 1,
        domain2_round: null,
      };
    });

    return NextResponse.json(transformedData);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
