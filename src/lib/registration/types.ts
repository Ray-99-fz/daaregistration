/** Insert payload for `registrations` (snake_case, matches DB). */
export type RegistrationInsert = {
  course_id: string;
  first_name: string;
  last_name: string;
  age_range: "11-17" | "18-24" | "25-34" | "35+";
  sex: "male" | "female";
  city: string;
  email: string;
  phone: string;
  current_status: "student" | "employed" | "self-employed" | "unemployed";
  familiarity_3d: "yes" | "no" | "learning";
  photoshop_skill: "yes" | "no" | "learning";
  has_tablet: boolean;
  device: "desktop" | "laptop" | "tablet";
  reliable_internet: boolean;
  referral_source:
    | "social_media"
    | "friend_referral"
    | "online_search"
    | "poster_flyer"
    | "radio_tv"
    | "other";
};

export type RegistrationSoftwareInsert = {
  registration_id: string;
  software_id: string;
};

export type RegistrationAvailabilityInsert = {
  registration_id: string;
  day_id: string;
};

export type SoftwareSelectionInput = string[];
export type AvailabilitySelectionInput = string[];

/** Row returned after insert into `registrations` (extends with generated fields). */
export type RegistrationRow = RegistrationInsert & {
  id: string;
  created_at?: string;
};

export type RegistrationSoftwareRow = RegistrationSoftwareInsert & {
  id?: string;
};

export type RegistrationAvailabilityRow = RegistrationAvailabilityInsert & {
  id?: string;
};

/** Reference rows from `software_options` (adjust field names to match your DB). */
export type SoftwareOptionRow = {
  id: string;
  name?: string | null;
  label?: string | null;
};

/** Reference rows from `availability_days` (adjust field names to match your DB). */
export type AvailabilityDayRow = {
  id: string;
  name?: string | null;
  label?: string | null;
  day_name?: string | null;
};
