import { createClient } from '@supabase/supabase-js';

const dashboardUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  process.env.NEXT_PUBLIC_DASHBOARD_URL;
const dashboardAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_DASBOARD_ANON_KEY;
const registrationUrl = process.env.NEXT_PUBLIC_REGISTRATION_URL;
const registrationAnonKey =
  process.env.NEXT_PUBLIC_REGISTRATION_ANON_KEY ??
  process.env.NEXT_PUBLIC_RESGISTRATION_ANON_KEY;

// This client owns authentication and authorization for the dashboard project.
export const supabase = createClient(
  dashboardUrl!,
  dashboardAnonKey!,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);

// This client reads and updates recruitment data in the separate registration project.
export const registrationSupabase = createClient(
  registrationUrl!,
  registrationAnonKey!,
);
