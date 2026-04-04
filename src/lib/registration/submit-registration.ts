import { supabase } from "@/supabase-client";
import { getValidationErrors } from "./registration-validation";
import { mapToDatabaseFormat } from "./registration-mapping";
import type { RegistrationFormData } from "./registration-form.types";

function userFacingMessage(err: { message?: string; details?: string; hint?: string; code?: string }): string {
  if (err.code === "23505") {
    return "This email is already registered. Use a different email or contact support.";
  }
  return err.message || "Could not save your registration. Please try again.";
}

/**
 * Persists a **full** registration row via **INSERT only** (no partial payloads).
 *
 * ## RLS (`registrations`)
 * Anonymous users may **INSERT** only. **SELECT / UPDATE / DELETE** are not available from
 * the frontend — we never call `.select()` after `.insert()` and do not assume a returned row.
 *
 * Flow: validate → map → `insert([mappedRow])` → surface success or failure in the UI.
 */
export async function submitRegistration(
  data: RegistrationFormData
): Promise<{ ok: true } | { ok: false; message: string }> {
  const validationErrors = getValidationErrors(data);
  if (validationErrors.length > 0) {
    console.warn("[submitRegistration] Validation failed:", validationErrors);
    const message = validationErrors.join("\n");
    return { ok: false, message };
  }

  let mapped;
  try {
    mapped = mapToDatabaseFormat(data);
  } catch (e) {
    console.error("[submitRegistration] mapToDatabaseFormat failed:", e);
    const message = e instanceof Error ? e.message : "Invalid registration data.";
    alert(message);
    return { ok: false, message };
  }

  try {
    /** Insert only — no `.select()` (RLS may forbid SELECT after insert). */
    const { error } = await supabase.from("registrations").insert([mapped]);

    if (error) {
      console.error("[submitRegistration] Supabase insert error (full):", error);
      const message = userFacingMessage(error);
      alert(message);
      return { ok: false, message };
    }

    return { ok: true };
  } catch (e) {
    console.error("[submitRegistration] Unexpected error:", e);
    const message = "Something went wrong. Please try again.";
    alert(message);
    return { ok: false, message };
  }
}
