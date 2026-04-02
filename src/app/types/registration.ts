export interface RegistrationData {
  // Personal Information
  firstName: string;
  lastName: string;
  ageRange: string;
  sex: string;
  city: string;
  email: string;
  phone: string;

  // Current Status
  status: string;
  educationLevel: string;

  // Digital Art Experience
  familiarWith3D: string;
  softwareUsed: string[];
  familiarWithPhotoshop: string;

  // Equipment
  hasGraphicsTablet: string;
  tabletBrand: string;
  deviceUsed: string;

  // Availability & Internet
  availableDays: string[];
  hasInternet: string;

  // Marketing Info
  howHeardAbout: string;
  optInForUpdates: boolean;

  // Course Info
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
