import { supabase } from "@/supabase-client";
import type { AvailabilityDayRow, SoftwareOptionRow } from "./types";

function assertSupabaseEnv(): void {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url?.trim() || !key?.trim()) {
    throw new Error(
      "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
    );
  }
}

function displayLabel(row: SoftwareOptionRow | AvailabilityDayRow): string {
  const v =
    ("day_name" in row && row.day_name) || row.name || row.label || "";
  return String(v).trim();
}

/**
 * Load rows from `software_options` for mapping UI labels to `software_id`.
 * Expects columns compatible with `SoftwareOptionRow`; extend the select if your schema differs.
 */
export async function fetchSoftwareOptions(): Promise<SoftwareOptionRow[]> {
  assertSupabaseEnv();
  const { data, error } = await supabase.from("software_options").select("id, name, label");

  if (error) {
    throw new Error(`Failed to load software_options: ${error.message}`);
  }

  return (data ?? []) as SoftwareOptionRow[];
}

/**
 * Load rows from `availability_days` for mapping UI day names to `day_id`.
 */
export async function fetchAvailabilityDays(): Promise<AvailabilityDayRow[]> {
  assertSupabaseEnv();
  const { data, error } = await supabase
    .from("availability_days")
    .select("id, name, label, day_name");

  if (error) {
    throw new Error(`Failed to load availability_days: ${error.message}`);
  }

  return (data ?? []) as AvailabilityDayRow[];
}

/**
 * Map human-readable software labels from the form to database IDs.
 */
export function softwareLabelsToIds(rows: SoftwareOptionRow[], labels: string[]): string[] {
  const skipped = new Set(["", "None"]);
  const wanted = labels.map((l) => l.trim()).filter((l) => !skipped.has(l));
  if (wanted.length === 0) return [];

  return wanted.map((label) => {
    const match = rows.find(
      (r) => displayLabel(r).toLowerCase() === label.toLowerCase()
    );
    if (!match) {
      throw new Error(
        `No software_options row matches "${label}". Check names in the database vs. the registration form.`
      );
    }
    return match.id;
  });
}

/**
 * Map human-readable day names from the form to database IDs.
 */
export function availabilityDayNamesToIds(rows: AvailabilityDayRow[], dayNames: string[]): string[] {
  const wanted = dayNames.map((d) => d.trim()).filter(Boolean);
  if (wanted.length === 0) return [];

  return wanted.map((day) => {
    const match = rows.find(
      (r) => displayLabel(r).toLowerCase() === day.toLowerCase()
    );
    if (!match) {
      throw new Error(
        `No availability_days row matches "${day}". Check names in the database vs. the registration form.`
      );
    }
    return match.id;
  });
}
