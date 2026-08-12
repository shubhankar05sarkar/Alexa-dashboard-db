import { NextRequest, NextResponse } from 'next/server';
import {
  authenticateRecruitment26Request,
  isAuthenticatedUser,
  registrationSupabase,
} from '../../../lib/recruitments26-server';

export async function GET(req: NextRequest) {
  try {

    const authResult = await authenticateRecruitment26Request(req);
    if (!isAuthenticatedUser(authResult)) {
      return authResult.response;
    }
    const { count, error: countError } = await registrationSupabase
      .from('recruitment_entries')
      .select('*', { count: 'exact' });

    if (countError) {
      return NextResponse.json({ error: countError.message }, { status: 500 });
    }

    return NextResponse.json({ totalRegistrations: count || 0 });
    
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
