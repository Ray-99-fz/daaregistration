import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl?.trim() || !supabaseAnonKey?.trim()) {
  throw new Error(
    "Missing Supabase environment variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file."
  );
}

/**
 * Singleton browser Supabase client (one shared instance for the app).
 *
 * ## Row Level Security — `registrations` table
 *
 * RLS is **enabled**. The anon (frontend) role is restricted as follows:
 *
 * - **INSERT** — allowed (this is how registrations are created).
 * - **SELECT, UPDATE, DELETE** — **not** available from the frontend; do not rely on
 *   reading rows back after insert.
 *
 * Therefore:
 * - Use only `supabase.from("registrations").insert(...)`.
 * - Do **not** call `.select()` after `.insert()` to fetch the new row — the policy
 *   may deny SELECT, and the insert can still succeed.
 * - Treat a successful insert response (no `error`) as success and show UX feedback
 *   client-side (e.g. confirmation message with the email the user typed).
 */
export const supabase: SupabaseClient = createClient(supabaseUrl.trim(), supabaseAnonKey.trim());
