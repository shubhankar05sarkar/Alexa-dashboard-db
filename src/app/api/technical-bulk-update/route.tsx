import { NextRequest, NextResponse } from "next/server";
import {
  authenticateRecruitment26Request,
  isAuthenticatedUser,
  registrationSupabase,
} from "../../../lib/recruitments26-server";

interface BulkUpdateRequest {
  registrationNumbers: string[];
  round: number;
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await authenticateRecruitment26Request(req);
    if (!isAuthenticatedUser(authResult)) {
      return authResult.response;
    }
    const { user } = authResult;

    const currentTime = new Date().toISOString();
    const modifierEmail = user.email || "";

    const body: BulkUpdateRequest = await req.json();
    const { registrationNumbers, round } = body;

    if (
      !registrationNumbers ||
      !Array.isArray(registrationNumbers) ||
      registrationNumbers.length === 0
    ) {
      return NextResponse.json(
        { error: "Registration numbers array is required" },
        { status: 400 },
      );
    }

    if (!round || round < 1 || round > 3) {
      return NextResponse.json(
        { error: "Valid round number (1-3) is required" },
        { status: 400 },
      );
    }

    // First, get the current records to determine which domain round to update
    const { data: currentRecords, error: fetchCurrentError } =
      await registrationSupabase
        .from("recruitment_entries")
        .select("*")
        .in("registration_number", registrationNumbers);

    if (fetchCurrentError) {
      return NextResponse.json(
        { error: fetchCurrentError.message },
        { status: 500 },
      );
    }

    // Update domain1_round for records where domain1 is technical
    const technicalDomain1Records =
      currentRecords?.filter((record) =>
        record.domain1.toLowerCase().includes("technical"),
      ) || [];

    if (technicalDomain1Records.length > 0) {
      const { error: domain1Error } = await registrationSupabase
        .from("recruitment_entries")
        .update({
          domain1_round: round,
          modified_at: currentTime,
          modified_by1: modifierEmail,
        })
        .in(
          "registration_number",
          technicalDomain1Records.map((r) => r.registration_number),
        );

      if (domain1Error) {
        return NextResponse.json(
          { error: domain1Error.message },
          { status: 500 },
        );
      }
    }

    const technicalDomain2Records =
      currentRecords?.filter(
        (record) =>
          record.domain2 && record.domain2.toLowerCase().includes("technical"),
      ) || [];

    if (technicalDomain2Records.length > 0) {
      const { error: domain2Error } = await registrationSupabase
        .from("recruitment_entries")
        .update({
          domain2_round: round,
          modified_at: currentTime,
          modified_by2: modifierEmail,
        })
        .in(
          "registration_number",
          technicalDomain2Records.map((r) => r.registration_number),
        );

      if (domain2Error) {
        return NextResponse.json(
          { error: domain2Error.message },
          { status: 500 },
        );
      }
    }

    // Get the updated records to return
    const { data: updatedData, error: fetchError } = await registrationSupabase
      .from("recruitment_entries")
      .select("*")
      .in("registration_number", registrationNumbers);

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    return NextResponse.json(updatedData || []);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
