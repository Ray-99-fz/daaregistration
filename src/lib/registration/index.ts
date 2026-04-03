/**
 * Registration + Supabase integration — table-aligned names and types.
 */
export { supabase } from "@/supabase-client";
export {
  createRegistration,
  insertRegistrationAvailability,
  insertRegistrationSoftware,
} from "./registration-api";
export {
  fetchAvailabilityDays,
  fetchSoftwareOptions,
  availabilityDayNamesToIds,
  softwareLabelsToIds,
} from "./reference-data";
export {
  registrationFormDefaultValues,
  registrationFormSchema,
  registrationFormValuesToInsert,
} from "./form-schema";
export type { RegistrationFormValues } from "./form-schema";
export { registrationDataToInsert } from "./transforms";
export type {
  AvailabilityDayRow,
  AvailabilitySelectionInput,
  RegistrationAvailabilityInsert,
  RegistrationAvailabilityRow,
  RegistrationInsert,
  RegistrationRow,
  RegistrationSoftwareInsert,
  RegistrationSoftwareRow,
  SoftwareOptionRow,
  SoftwareSelectionInput,
} from "./types";
export { useRegistrationForm } from "@/hooks/useRegistrationForm";
export { useRegistrationSubmission } from "@/hooks/useRegistrationSubmission";
