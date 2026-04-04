import type { RegistrationDatabaseInsert, RegistrationFormData } from "./registration-form.types";

/** MWK — must match product rules and DB `registration_fee` / `course_fee` */
export const REGISTRATION_FEE = 5000;
export const COURSE_FEE = 50000;

function yesNoToBoolean(value: string, fieldLabel: string): boolean {
  const v = value.trim().toLowerCase();
  if (v === "yes") return true;
  if (v === "no") return false;
  throw new Error(`Invalid ${fieldLabel}: expected "Yes" or "No".`);
}

function normalizeOptionalText(s: string): string | null {
  const t = s.trim();
  return t.length > 0 ? t : null;
}

/**
 * Maps camelCase UI state → snake_case `registrations` row.
 *
 * - `software_used` / `available_days`: always `string[]` (default `[]`).
 * - `has_graphics_tablet` / `has_internet`: `"Yes"` / `"No"` → boolean.
 * - Fees: constants below; `payment_status` simulates successful checkout at submit time.
 *
 * Throws if a value cannot be normalized to DB enums (run client-side validation first).
 */
export function mapToDatabaseFormat(data: RegistrationFormData): RegistrationDatabaseInsert {
  const age_range = data.ageRange.trim() as RegistrationDatabaseInsert["age_range"];
  if (!["11-17", "18-24", "25-34", "35+"].includes(age_range)) {
    throw new Error(`Invalid age_range: ${data.ageRange}`);
  }

  const sexTrim = data.sex.trim();
  if (sexTrim !== "Male" && sexTrim !== "Female") {
    throw new Error(`Invalid sex: ${data.sex}`);
  }
  const sex: RegistrationDatabaseInsert["sex"] = sexTrim;

  const statusTrim = data.status.trim();
  const statusMap: Record<string, RegistrationDatabaseInsert["status"]> = {
    Student: "Student",
    Employed: "Employed",
    "Self-Employed": "Self-Employed",
    Unemployed: "Unemployed",
  };
  const status = statusMap[statusTrim];
  if (!status) throw new Error(`Invalid status: ${data.status}`);

  const ynl = (v: string, label: string): "Yes" | "No" | "Learning" => {
    const t = v.trim();
    if (t === "Yes" || t === "No" || t === "Learning") return t;
    throw new Error(`Invalid ${label}: ${v}`);
  };

  const deviceTrim = data.deviceUsed.trim();
  const deviceMap: Record<string, RegistrationDatabaseInsert["device_used"]> = {
    Desktop: "Desktop",
    Laptop: "Laptop",
    Tablet: "Tablet",
  };
  const device_used = deviceMap[deviceTrim];
  if (!device_used) throw new Error(`Invalid device_used: ${data.deviceUsed}`);

  const referralTrim = data.howHeardAbout.trim();
  const referralMap: Record<string, RegistrationDatabaseInsert["how_heard_about"]> = {
    "Social Media": "Social Media",
    "Friend Referral": "Friend Referral",
    "Online Search": "Online Search",
    "Poster/Flyer": "Poster/Flyer",
    "Radio/TV": "Radio/TV",
    Other: "Other",
  };
  const how_heard_about = referralMap[referralTrim];
  if (!how_heard_about) throw new Error(`Invalid how_heard_about: ${data.howHeardAbout}`);

  const software_used = Array.isArray(data.softwareUsed) ? [...data.softwareUsed] : [];
  const available_days = Array.isArray(data.availableDays) ? [...data.availableDays] : [];

  let education_level: string | null = normalizeOptionalText(data.educationLevel);
  if (status !== "Student") {
    education_level = null;
  }

  const tablet_brand =
    yesNoToBoolean(data.hasGraphicsTablet, "hasGraphicsTablet") === true
      ? normalizeOptionalText(data.tabletBrand)
      : null;

  return {
    first_name: data.firstName.trim(),
    last_name: data.lastName.trim(),
    age_range,
    sex,
    city: data.city.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    status,
    education_level,
    familiar_with_3d: ynl(data.familiarWith3D, "familiar_with_3d"),
    software_used,
    familiar_with_photoshop: ynl(data.familiarWithPhotoshop, "familiar_with_photoshop"),
    has_graphics_tablet: yesNoToBoolean(data.hasGraphicsTablet, "has_graphics_tablet"),
    tablet_brand,
    device_used,
    available_days,
    has_internet: yesNoToBoolean(data.hasInternet, "has_internet"),
    how_heard_about,
    opt_in_for_updates: Boolean(data.optInForUpdates),
    registration_fee: REGISTRATION_FEE,
    course_fee: COURSE_FEE,
    /** Simulated successful payment at submission time */
    payment_status: "Paid",
  };
}
