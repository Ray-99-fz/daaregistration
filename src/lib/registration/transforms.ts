import type { RegistrationData } from "@/app/types/registration";
import type { RegistrationInsert } from "./types";

function lower(s: string): string {
  return s.trim().toLowerCase();
}

const STATUS_MAP: Record<string, RegistrationInsert["current_status"]> = {
  student: "student",
  employed: "employed",
  "self-employed": "self-employed",
  unemployed: "unemployed",
};

const YNL_MAP: Record<string, "yes" | "no" | "learning"> = {
  yes: "yes",
  no: "no",
  learning: "learning",
};

const REFERRAL_MAP: Record<string, RegistrationInsert["referral_source"]> = {
  "social media": "social_media",
  "friend referral": "friend_referral",
  "online search": "online_search",
  "poster/flyer": "poster_flyer",
  "radio/tv": "radio_tv",
  other: "other",
};

/**
 * Map the multi-step wizard `RegistrationData` into a `RegistrationInsert` for `registrations`.
 */
export function registrationDataToInsert(data: RegistrationData): RegistrationInsert {
  const age = data.ageRange.trim() as RegistrationInsert["age_range"];
  if (!["11-17", "18-24", "25-34", "35+"].includes(age)) {
    throw new Error(`Invalid age range for submission: "${data.ageRange}"`);
  }

  const sexKey = lower(data.sex);
  const sex: RegistrationInsert["sex"] =
    sexKey === "male" ? "male" : sexKey === "female" ? "female" : (() => {
      throw new Error(`Invalid sex for submission: "${data.sex}"`);
    })();

  const status = STATUS_MAP[lower(data.status)];
  if (!status) {
    throw new Error(`Invalid current status for submission: "${data.status}"`);
  }

  const familiarity_3d = YNL_MAP[lower(data.familiarWith3D)];
  if (!familiarity_3d) {
    throw new Error(`Invalid 3D familiarity for submission: "${data.familiarWith3D}"`);
  }

  const photoshop_skill = YNL_MAP[lower(data.familiarWithPhotoshop)];
  if (!photoshop_skill) {
    throw new Error(`Invalid Photoshop familiarity for submission: "${data.familiarWithPhotoshop}"`);
  }

  const hasTabletYes = lower(data.hasGraphicsTablet) === "yes";
  const hasTabletNo = lower(data.hasGraphicsTablet) === "no";
  if (!hasTabletYes && !hasTabletNo) {
    throw new Error(`Tablet answer required: "${data.hasGraphicsTablet}"`);
  }
  const has_tablet = hasTabletYes;

  const deviceKey = lower(data.deviceUsed);
  const device: RegistrationInsert["device"] =
    deviceKey === "desktop"
      ? "desktop"
      : deviceKey === "laptop"
        ? "laptop"
        : deviceKey === "tablet"
          ? "tablet"
          : (() => {
              throw new Error(`Invalid device for submission: "${data.deviceUsed}"`);
            })();

  const internetYes = lower(data.hasInternet) === "yes";
  const internetNo = lower(data.hasInternet) === "no";
  if (!internetYes && !internetNo) {
    throw new Error(`Internet answer required: "${data.hasInternet}"`);
  }
  const reliable_internet = internetYes;

  const referral_source = REFERRAL_MAP[lower(data.howHeardAbout)];
  if (!referral_source) {
    throw new Error(`Invalid referral source for submission: "${data.howHeardAbout}"`);
  }

  const course_id = data.courseId.trim();
  if (!course_id) {
    throw new Error("Course is required for submission.");
  }

  return {
    course_id,
    first_name: data.firstName.trim(),
    last_name: data.lastName.trim(),
    age_range: age,
    sex,
    city: data.city.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    current_status: status,
    familiarity_3d,
    photoshop_skill,
    has_tablet,
    device,
    reliable_internet,
    referral_source,
  };
}
