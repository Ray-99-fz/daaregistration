import { useCallback, useState } from "react";
import {
  createRegistration,
  insertRegistrationAvailability,
  insertRegistrationSoftware,
} from "@/lib/registration/registration-api";
import type {
  AvailabilitySelectionInput,
  RegistrationInsert,
  RegistrationRow,
  SoftwareSelectionInput,
} from "@/lib/registration/types";

export type SubmitRegistrationResult = {
  registration: RegistrationRow;
};

function toUserMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return "Something went wrong while submitting your registration. Please try again.";
}

/**
 * Production-ready submission flow: `registrations` → `registration_software` → `registration_availability`.
 */
export function useRegistrationSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const resetSubmissionState = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  const submitFinalRegistration = useCallback(
    async (
      formData: RegistrationInsert,
      softwareIds: SoftwareSelectionInput,
      dayIds: AvailabilitySelectionInput
    ): Promise<SubmitRegistrationResult> => {
      setIsSubmitting(true);
      setError(null);
      setSuccess(false);

      try {
        const registration = await createRegistration(formData);
        await insertRegistrationSoftware(registration.id, softwareIds);
        await insertRegistrationAvailability(registration.id, dayIds);
        setSuccess(true);
        return { registration };
      } catch (e) {
        console.error("Registration submission failed:", {
          error: e,
          payload: formData,
          softwareIds,
          dayIds,
        });
        const message = toUserMessage(e);
        setError(message);
        throw e;
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  return {
    isSubmitting,
    error,
    success,
    submitFinalRegistration,
    resetSubmissionState,
  };
}
