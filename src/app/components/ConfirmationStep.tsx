import { useState } from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { courseFee, getCourseById } from "../data/departments";
import { CourseMeta } from "./CourseMeta";
import type { RegistrationData } from "../types/registration";
import type { RegistrationFormData } from "@/lib/registration/registration-form.types";
import { getValidationErrors, validateForm } from "@/lib/registration/registration-validation";
import { mapToDatabaseFormat } from "@/lib/registration/registration-mapping";

type ConfirmationStepProps = {
  data: RegistrationData;
};

function toFormData(data: RegistrationData): RegistrationFormData {
  return data;
}

const apiBase =
  import.meta.env.VITE_PAYMENT_API_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export function ConfirmationStep({ data }: ConfirmationStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const course = getCourseById(data.departmentId, data.courseId);

  // const handleSubmit = async () => {
  //   if (isSubmitting) return;

  //   setError(null);

  //   const form = toFormData(data);

  //   if (!validateForm(form)) {
  //     setError(getValidationErrors(form).join("\n"));
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     let payload;
  //     try {
  //       payload = mapToDatabaseFormat(form);
  //     } catch (e) {
  //       const message =
  //         e instanceof Error ? e.message : "Invalid registration data.";
  //       setError(message);
  //       return;
  //     }

  //     const res = await fetch(`${apiBase}/create-registration`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     const result = (await res.json()) as {
  //       redirectUrl?: string;
  //       error?: string;
  //     };

  //     // ✅ Always redirect if backend provides a URL
  //     if (result.redirectUrl) {
  //       window.location.href = result.redirectUrl;
  //       return;
  //     }

  //     // fallback (should rarely happen)
  //     throw new Error(result.error || "Registration failed");

  //   } catch (err) {
  //     console.error(err);

  //     // ✅ Fallback redirect if backend fails completely
  //     // window.location.href = "/registration-failed?reason=network";
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async () => {
  if (isSubmitting) return;

  setError(null);

  const form = toFormData(data);

  if (!validateForm(form)) {
    setError(getValidationErrors(form).join("\n"));
    return;
  }

  setIsSubmitting(true);

  try {
    let payload;
    try {
      payload = mapToDatabaseFormat(form);
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Invalid registration data.";
      setError(message);
      return;
    }

    const res = await fetch(`${apiBase}/create-registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    console.log("SERVER RESPONSE:", result);

    // ✅ Always redirect (success OR fail handled by backend)
    if (result.redirectUrl) {
      window.location.href = result.redirectUrl;
      return;
    }

    throw new Error(result.error || "Registration failed");

  } catch (err) {
    console.error(err);

    // fallback safety
    window.location.href = "/registration-failed?reason=network";
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Confirm Your Registration
        </h2>
        <p className="text-slate-400">
          Review your details before submitting
        </p>
      </div>

      <div className="space-y-4">
        {/* Course Info */}
        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start mb-4">
            <div className="min-w-0">
              <h3 className="text-xl font-bold text-white mb-1">
                Selected Course
              </h3>
              {course ? (
                <>
                  <p className="text-slate-200 font-medium mb-2">
                    {course.name}
                  </p>
                  <CourseMeta course={course} />
                </>
              ) : null}
              <p className="text-slate-300 mt-3">
                No registration fee required
              </p>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <div className="text-2xl font-bold text-green-400">FREE REGISTRATION</div>
            </div>
          </div>
          <p className="text-sm text-slate-400">
            Course fee: MWK {courseFee.toLocaleString()} per month (payable when classes begin).
          </p>
        </div>

        {/* User Info */}
        <div className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl space-y-4">
          <div>
            <h4 className="text-sm font-medium text-slate-400 mb-1">Name</h4>
            <p className="text-white">
              {data.firstName} {data.lastName}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-400 mb-1">Email</h4>
            <p className="text-white">{data.email}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-400 mb-1">Phone</h4>
            <p className="text-white">{data.phone}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-400 mb-1">City</h4>
            <p className="text-white">{data.city}</p>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl space-y-3">
          <p className="text-sm text-blue-200">
            By submitting, you agree to our terms and conditions. Your
            registration will be saved securely.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            After your registration is complete, we will contact you by email at{" "}
            <span className="font-medium text-white">{data.email}</span> with
            further details about your course (schedule, materials, and next
            steps).
          </p>
        </div>

        {/* Error (rare fallback only now) */}
        {error && (
          <div className="rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-100 whitespace-pre-line">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <motion.button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full sm:w-auto min-h-12 px-4 py-3 text-lg font-bold rounded-xl flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Submitting…</span>
            </>
          ) : (
            <span>Complete Registration</span>
          )}
        </motion.button>
      </div>
    </div>
  );
}





















// import { useState } from "react";
// import { motion } from "motion/react";
// import { CreditCard, Loader2 } from "lucide-react";
// import { courseFee, getCourseById, registrationFee } from "../data/departments";
// import { CourseMeta } from "./CourseMeta";
// import type { RegistrationData } from "../types/registration";
// import type { RegistrationFormData } from "@/lib/registration/registration-form.types";
// import { getValidationErrors, validateForm } from "@/lib/registration/registration-validation";
// import { mapToDatabaseFormat } from "@/lib/registration/registration-mapping";

// type ConfirmationStepProps = {
//   data: RegistrationData;
// };

// function toFormData(data: RegistrationData): RegistrationFormData {
//   return data;
// }

// const paymentApiBase = import.meta.env.VITE_PAYMENT_API_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

// export function ConfirmationStep({ data }: ConfirmationStepProps) {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const course = getCourseById(data.departmentId, data.courseId);

//   const handlePay = async () => {
//     if (isSubmitting) return;

//     setError(null);

//     const form = toFormData(data);
//     if (!validateForm(form)) {
//       setError(getValidationErrors(form).join("\n"));
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       let payload;
//       try {
//         payload = mapToDatabaseFormat(form);
//       } catch (e) {
//         const message = e instanceof Error ? e.message : "Invalid registration data.";
//         setError(message);
//         return;
//       }

//       const res = await fetch(`${paymentApiBase}/create-payment`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const result = (await res.json()) as { paymentUrl?: string; error?: string };

//       if (!res.ok) {
//         throw new Error(result.error || "Payment init failed");
//       }

//       if (!result.paymentUrl) {
//         throw new Error("Payment init failed");
//       }

//       window.location.href = result.paymentUrl;
//     } catch (err) {
//       const message = err instanceof Error ? err.message : "Failed to initiate payment.";
//       setError(message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-3xl font-bold text-white mb-2">Confirm Your Registration</h2>
//         <p className="text-slate-400">Review your details before completing payment</p>
//       </div>

//       <div className="space-y-4">
//         <div className="p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl">
//           <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start mb-4">
//             <div className="min-w-0">
//               <h3 className="text-xl font-bold text-white mb-1">Selected Course</h3>
//               {course ? (
//                 <>
//                   <p className="text-slate-200 font-medium mb-2">{course.name}</p>
//                   <CourseMeta course={course} />
//                 </>
//               ) : null}
//               <p className="text-slate-300 mt-3">Registration fee (due upon registration)</p>
//             </div>
//             <div className="text-left sm:text-right shrink-0">
//               <div className="text-3xl font-bold text-white">MWK {registrationFee.toLocaleString()}</div>
//             </div>
//           </div>
//           <p className="text-sm text-slate-400">
//             Course fee: MWK {courseFee.toLocaleString()} per month (payable when classes begin).
//           </p>
//         </div>

//         <div className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl space-y-4">
//           <div>
//             <h4 className="text-sm font-medium text-slate-400 mb-1">Name</h4>
//             <p className="text-white">
//               {data.firstName} {data.lastName}
//             </p>
//           </div>
//           <div>
//             <h4 className="text-sm font-medium text-slate-400 mb-1">Email</h4>
//             <p className="text-white">{data.email}</p>
//           </div>
//           <div>
//             <h4 className="text-sm font-medium text-slate-400 mb-1">Phone</h4>
//             <p className="text-white">{data.phone}</p>
//           </div>
//           <div>
//             <h4 className="text-sm font-medium text-slate-400 mb-1">City</h4>
//             <p className="text-white">{data.city}</p>
//           </div>
//         </div>

//         <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl space-y-3">
//           <p className="text-sm text-blue-200">
//             By paying, you agree to our terms and conditions. Your registration will be saved securely.
//           </p>
//           <p className="text-sm text-slate-300 leading-relaxed">
//             After your registration is complete, we will contact you by email at{" "}
//             <span className="font-medium text-white">{data.email}</span> with any further details about your course
//             (schedule, materials, and next steps).
//           </p>
//           {/* <p className="text-sm text-slate-300 lg:flex gap-1 items-center">
              
//               <span className="font-bold flex items-center">
//                 <TriangleAlert className="w-6 h-6 shrink-0" aria-hidden />
//                 Very Important Note:
//               </span> 
//               Make sure to fill in the Name and Email Input Fields on the Pay Changu Interface.
//           </p> */}
//         </div>

//         {error && (
//           <div
//             className="rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-100 whitespace-pre-line"
//             role="alert"
//           >
//             {error}
//           </div>
//         )}

//         <motion.button
//           type="button"
//           onClick={handlePay}
//           disabled={isSubmitting}
//           aria-busy={isSubmitting}
//           className="w-full sm:w-auto whitespace-nowrap min-h-12 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base md:text-lg font-bold rounded-xl transition-all flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-2xl active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
//           whileHover={isSubmitting ? {} : { scale: 1.02 }}
//           whileTap={isSubmitting ? {} : { scale: 0.98 }}
//         >
//           {isSubmitting ? (
//             <>
//               <Loader2 className="w-6 h-6 animate-spin shrink-0" aria-hidden />
//               <span>Processing…</span>
//             </>
//           ) : (
//             <>
//               <CreditCard className="w-6 h-6 shrink-0" aria-hidden />
//               <span>Pay with Pay Changu</span>
//             </>
//           )}
//         </motion.button>
//       </div>
//     </div>
//   );
// }
