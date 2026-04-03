import { useEffect } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

const STORAGE_KEY = "registration_form_data";
const AUTOSAVE_DELAY_MS = 400;

export function useAutosaveForm<TFieldValues extends FieldValues>(
  formMethods: Pick<UseFormReturn<TFieldValues>, "watch" | "reset">
) {
  const { watch, reset } = formMethods;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved) as TFieldValues;
      reset(parsed);
    } catch (error) {
      console.error("Failed to restore saved registration form data:", error);
    }
  }, [reset]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const subscription = watch((value) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
        } catch (error) {
          console.error("Failed to autosave registration form data:", error);
        }
      }, AUTOSAVE_DELAY_MS);
    });

    return () => {
      if (timer) clearTimeout(timer);
      subscription.unsubscribe();
    };
  }, [watch]);
}

export { STORAGE_KEY as REGISTRATION_FORM_DATA_KEY };
