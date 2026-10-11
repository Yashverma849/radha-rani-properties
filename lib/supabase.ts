import { createClient } from "@supabase/supabase-js";

// Read Supabase environment variables (supporting both NEXT_PUBLIC_ prefixes and custom names)
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.supabase_url ||
  "";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.supabase_anon_key ||
  "";

const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.supabase_service_role_key ||
  "";

if (!supabaseUrl && typeof window !== "undefined") {
  console.warn(
    "[Supabase] Warning: Missing supabase_url / NEXT_PUBLIC_SUPABASE_URL."
  );
}

if (!supabaseAnonKey && typeof window !== "undefined") {
  console.warn(
    "[Supabase] Warning: Missing supabase_anon_key / NEXT_PUBLIC_SUPABASE_ANON_KEY."
  );
}

/**
 * Standard Supabase client for frontend / browser components.
 * Uses anon key and respects Row Level Security (RLS).
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/**
 * Server-side Admin client for API routes / server actions.
 * Uses the service_role key to bypass RLS and perform direct server-side operations.
 * DO NOT expose or call this inside client-side browser components.
 */
export const getSupabaseAdmin = () => {
  if (typeof window !== "undefined") {
    throw new Error(
      "[Supabase Security] Attempted to use supabaseServiceRoleKey in a browser/client environment. This is blocked to protect database security."
    );
  }

  const key = supabaseServiceRoleKey || supabaseAnonKey;
  if (!supabaseUrl || !key) {
    throw new Error("[Supabase] Missing Supabase URL or Service Role Key in environment variables.");
  }

  return createClient(supabaseUrl, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
