import type { RegistrationFormData } from "./registration-form.types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Basic phone: digits and common separators, minimum/maximum digit count */
function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

const AGE_RANGES = new Set(["11-17", "18-24", "25-34", "35+"]);
const SEX = new Set(["Male", "Female"]);
const STATUSES = new Set(["Student", "Employed", "Self-Employed", "Unemployed"]);
const DEVICES = new Set(["Desktop", "Laptop", "Tablet"]);
const YNL = new Set(["Yes", "No", "Learning"]);
const YES_NO = new Set(["Yes", "No"]);
const REFERRALS = new Set([
  "Social Media",
  "Friend Referral",
  "Online Search",
  "Poster/Flyer",
  "Radio/TV",
  "Other",
]);

/**
 * Collects human-readable validation errors for `RegistrationFormData`.
 * Empty array means the payload passes all client-side checks before INSERT.
 */
export function getValidationErrors(data: RegistrationFormData): string[] {
  const errors: string[] = [];

  if (!data.firstName?.trim()) errors.push("First name is required.");
  if (!data.lastName?.trim()) errors.push("Last name is required.");
  if (!data.city?.trim()) errors.push("City is required.");
  if (!data.email?.trim()) errors.push("Email is required.");
  else if (!EMAIL_RE.test(data.email.trim())) errors.push("Enter a valid email address.");
  if (!data.phone?.trim()) errors.push("Phone is required.");
  else if (!isValidPhone(data.phone)) errors.push("Enter a valid phone number (8–15 digits).");

  if (!data.ageRange?.trim() || !AGE_RANGES.has(data.ageRange.trim())) {
    errors.push("Select a valid age range.");
  }
  if (!data.sex?.trim() || !SEX.has(data.sex.trim())) {
    errors.push("Select Male or Female.");
  }
  if (!data.status?.trim() || !STATUSES.has(data.status.trim())) {
    errors.push("Select your current status.");
  }
  if (data.status?.trim() === "Student" && !data.educationLevel?.trim()) {
    errors.push("Education level is required when you are a student.");
  }
  if (!data.deviceUsed?.trim() || !DEVICES.has(data.deviceUsed.trim())) {
    errors.push("Select the device you will use.");
  }
  if (!data.familiarWith3D?.trim() || !YNL.has(data.familiarWith3D.trim())) {
    errors.push("Answer whether you are familiar with 3D software.");
  }
  if (!data.familiarWithPhotoshop?.trim() || !YNL.has(data.familiarWithPhotoshop.trim())) {
    errors.push("Answer whether you are familiar with Photoshop.");
  }
  if (!data.hasGraphicsTablet?.trim() || !YES_NO.has(data.hasGraphicsTablet.trim())) {
    errors.push("Indicate if you have a graphics tablet (Yes or No).");
  }
  if (!data.hasInternet?.trim() || !YES_NO.has(data.hasInternet.trim())) {
    errors.push("Indicate if you have reliable internet (Yes or No).");
  }
  if (!data.howHeardAbout?.trim() || !REFERRALS.has(data.howHeardAbout.trim())) {
    errors.push("Select how you heard about us.");
  }

  if (!Array.isArray(data.availableDays) || data.availableDays.length === 0) {
    errors.push("Select at least one day you are available.");
  }

  return errors;
}

/**
 * @returns `true` if the form is valid, `false` otherwise.
 * Use {@link getValidationErrors} to present specific messages to the user.
 */
export function validateForm(data: RegistrationFormData): boolean {
  return getValidationErrors(data).length === 0;
}
