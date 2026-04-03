import { supabase } from "@/supabase-client";
import type {
  AvailabilitySelectionInput,
  RegistrationAvailabilityRow,
  RegistrationInsert,
  RegistrationRow,
  RegistrationSoftwareRow,
  SoftwareSelectionInput,
} from "./types";

function assertSupabaseEnv(): void {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url?.trim() || !key?.trim()) {
    throw new Error(
      "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment (e.g. .env locally, Vercel project settings for production)."
    );
  }
}

function formatSupabaseError(context: string, message: string, details?: string): string {
  const parts = [`${context}: ${message}`];
  if (details) parts.push(details);
  return parts.join(" — ");
}

/**
 * Insert a row into `registrations`. Returns the inserted row including `id`.
 */
export async function createRegistration(data: RegistrationInsert): Promise<RegistrationRow> {
  assertSupabaseEnv();

  const { data: row, error } = await supabase
    .from("registrations")
    .insert(data)
    .select()
    .single();

  if (error) {
    throw new Error(
      formatSupabaseError("Failed to create registration", error.message, error.details ?? undefined)
    );
  }
  if (!row) {
    throw new Error("Failed to create registration: no row returned from Supabase.");
  }

  return row as RegistrationRow;
}

/**
 * Batch insert into `registration_software`. No-ops when `softwareIds` is empty.
 */
export async function insertRegistrationSoftware(
  registrationId: string,
  softwareIds: SoftwareSelectionInput
): Promise<RegistrationSoftwareRow[]> {
  if (softwareIds.length === 0) {
    return [];
  }

  assertSupabaseEnv();

  const payload = softwareIds.map((software_id) => ({
    registration_id: registrationId,
    software_id,
  }));

  const { data, error } = await supabase.from("registration_software").insert(payload).select();

  if (error) {
    throw new Error(
      formatSupabaseError(
        "Failed to save registration software selections",
        error.message,
        error.details ?? undefined
      )
    );
  }

  return (data ?? []) as RegistrationSoftwareRow[];
}

/**
 * Batch insert into `registration_availability`. No-ops when `dayIds` is empty.
 */
export async function insertRegistrationAvailability(
  registrationId: string,
  dayIds: AvailabilitySelectionInput
): Promise<RegistrationAvailabilityRow[]> {
  if (dayIds.length === 0) {
    return [];
  }

  assertSupabaseEnv();

  const payload = dayIds.map((day_id) => ({
    registration_id: registrationId,
    day_id,
  }));

  const { data, error } = await supabase.from("registration_availability").insert(payload).select();

  if (error) {
    throw new Error(
      formatSupabaseError(
        "Failed to save registration availability",
        error.message,
        error.details ?? undefined
      )
    );
  }

  return (data ?? []) as RegistrationAvailabilityRow[];
}
