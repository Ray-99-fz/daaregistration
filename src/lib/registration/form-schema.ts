import { z } from "zod";
import type { RegistrationInsert } from "./types";

const ageRangeEnum = z.enum(["11-17", "18-24", "25-34", "35+"]);
const sexEnum = z.enum(["male", "female"]);
const statusEnum = z.enum(["student", "employed", "self-employed", "unemployed"]);
const ynlEnum = z.enum(["yes", "no", "learning"]);
const deviceEnum = z.enum(["desktop", "laptop", "tablet"]);
const referralEnum = z.enum([
  "social_media",
  "friend_referral",
  "online_search",
  "poster_flyer",
  "radio_tv",
  "other",
]);

/**
 * Zod schema aligned with `RegistrationInsert` / `registrations` columns.
 */
export const registrationFormSchema = z.object({
  course_id: z.string().min(1, "Course is required"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  age_range: ageRangeEnum,
  sex: sexEnum,
  city: z.string().min(1, "City is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  phone: z.string().min(1, "Phone is required"),
  current_status: statusEnum,
  familiarity_3d: ynlEnum,
  photoshop_skill: ynlEnum,
  has_tablet: z.boolean(),
  device: deviceEnum,
  reliable_internet: z.boolean(),
  referral_source: referralEnum,
});

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

export const registrationFormDefaultValues: RegistrationFormValues = {
  course_id: "",
  first_name: "",
  last_name: "",
  age_range: "18-24",
  sex: "male",
  city: "",
  email: "",
  phone: "",
  current_status: "student",
  familiarity_3d: "no",
  photoshop_skill: "no",
  has_tablet: false,
  device: "laptop",
  reliable_internet: true,
  referral_source: "online_search",
};

/**
 * Normalize trimmed strings and return a `RegistrationInsert` for API calls.
 */
export function registrationFormValuesToInsert(values: RegistrationFormValues): RegistrationInsert {
  return {
    course_id: values.course_id.trim(),
    first_name: values.first_name.trim(),
    last_name: values.last_name.trim(),
    age_range: values.age_range,
    sex: values.sex,
    city: values.city.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    current_status: values.current_status,
    familiarity_3d: values.familiarity_3d,
    photoshop_skill: values.photoshop_skill,
    has_tablet: values.has_tablet,
    device: values.device,
    reliable_internet: values.reliable_internet,
    referral_source: values.referral_source,
  };
}
