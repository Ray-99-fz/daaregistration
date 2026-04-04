import type { RegistrationFormData } from "@/lib/registration/registration-form.types";

export type { RegistrationFormData };

/** Full wizard state: form fields + route context (not sent to `registrations` in mapToDatabaseFormat). */
export interface RegistrationData extends RegistrationFormData {
  departmentId: string;
  courseId: string;
}

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
