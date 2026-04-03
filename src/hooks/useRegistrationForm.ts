import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import {
  type DefaultValues,
  type UseFormProps,
  useForm,
} from "react-hook-form";
import {
  registrationFormDefaultValues,
  registrationFormSchema,
  registrationFormValuesToInsert,
  type RegistrationFormValues,
} from "@/lib/registration/form-schema";
import type { RegistrationInsert } from "@/lib/registration/types";

export type UseRegistrationFormOptions = Omit<
  UseFormProps<RegistrationFormValues>,
  "resolver" | "defaultValues"
> & {
  defaultValues?: DefaultValues<RegistrationFormValues>;
};

/**
 * React Hook Form setup with Zod validation and helpers to build `RegistrationInsert`.
 */
export function useRegistrationForm(options?: UseRegistrationFormOptions) {
  const { defaultValues: defaultValuesOverride, ...rest } = options ?? {};

  const methods = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      ...registrationFormDefaultValues,
      ...defaultValuesOverride,
    },
    mode: "onBlur",
    ...rest,
  });

  const prepareRegistrationInsert = useCallback((values: RegistrationFormValues): RegistrationInsert => {
    return registrationFormValuesToInsert(values);
  }, []);

  return {
    ...methods,
    /** Merged defaults for spreads / reset() */
    registrationFormDefaultValues,
    registrationFormSchema,
    prepareRegistrationInsert,
  };
}

export type { RegistrationFormValues };
