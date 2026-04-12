import type { RegistrationData } from "@/app/types/registration";

export type RegistrationStepId =
  | "personal"
  | "status"
  | "experience"
  | "equipment"
  | "connectivity"
  | "marketing"
  | "confirmation";

const BASE_SEQUENCE: RegistrationStepId[] = [
  "personal",
  "status",
  "experience",
  "equipment",
  "marketing",
  "confirmation",
];

export function registrationSkipsExperienceStep(departmentId: string): boolean {
  return ["visual-development", "game-development"].includes(departmentId.trim());
}

export function registrationUsesConnectivityInsteadOfEquipment(courseId: string): boolean {
  return courseId.trim() === "dynamic-sketching";
}

/** Ordered step ids for the wizard — visibility rules live here only. */
export function getActiveRegistrationSteps(data: RegistrationData): RegistrationStepId[] {
  let steps = [...BASE_SEQUENCE];

  if (registrationSkipsExperienceStep(data.departmentId)) {
    steps = steps.filter((s) => s !== "experience");
  }

  if (registrationUsesConnectivityInsteadOfEquipment(data.courseId)) {
    steps = steps.filter((s) => s !== "equipment");
    const marketingIndex = steps.indexOf("marketing");
    if (marketingIndex !== -1) {
      steps.splice(marketingIndex, 0, "connectivity");
    }
  }

  return steps;
}
