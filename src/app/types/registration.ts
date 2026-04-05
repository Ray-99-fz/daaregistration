import type { RegistrationFormData } from "@/lib/registration/registration-form.types";

export type { RegistrationFormData };

/** Full wizard state (same fields as the payload validated and mapped for Supabase). */
export type RegistrationData = RegistrationFormData;

export const initialRegistrationData: RegistrationData = {
  firstName: "",
  lastName: "",
  ageRange: "",
  sex: "",
  city: "",
  email: "",
  phone: "",
  status: "",
  educationLevel: "",
  familiarWith3D: "",
  softwareUsed: [],
  familiarWithPhotoshop: "",
  hasGraphicsTablet: "",
  tabletBrand: "",
  deviceUsed: "",
  availableDays: [],
  hasInternet: "",
  howHeardAbout: "",
  optInForUpdates: false,
  departmentId: "",
  courseId: "",
};
