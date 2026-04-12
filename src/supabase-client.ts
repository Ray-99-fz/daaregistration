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
 * - **INSERT** — may be allowed for legacy/alternate flows; the main registration + PayChangu
 *   path persists rows via the backend API (service role), not from the browser.
 * - **SELECT, UPDATE, DELETE** — **not** available from the frontend for typical rows; do not rely on
 *   reading rows back after insert.
 *
 * Therefore:
 * - When inserting from the browser, use only `supabase.from("registrations").insert(...)` and
 *   do **not** call `.select()` after `.insert()` if SELECT is denied — the insert can still succeed.
 * - Payment status is updated by the PayChangu webhook on the server, not from the client.
 */
export const supabase: SupabaseClient = createClient(supabaseUrl.trim(), supabaseAnonKey.trim());
