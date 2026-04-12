import { useState } from "react";
import { motion } from "motion/react";
import { useLocation, useNavigate } from "react-router";
import { CheckCircle2, CreditCard, Loader2, Shield, Clock } from "lucide-react";
import { courseFee, registrationFee, type Course, type Department } from "../data/departments";
import { CourseMeta } from "../components/CourseMeta";
import { BrandLogo } from "../components/BrandLogo";
import type { RegistrationData } from "../types/registration";
import { registrationDataToInsert } from "@/lib/registration/transforms";
import {
  availabilityDayNamesToIds,
  fetchAvailabilityDays,
  fetchSoftwareOptions,
  softwareLabelsToIds,
} from "@/lib/registration/reference-data";
import { useRegistrationSubmission } from "@/hooks/useRegistrationSubmission";
import { REGISTRATION_FORM_DATA_KEY } from "@/hooks/useAutosaveForm";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);

  const {
    isSubmitting,
    error: submitError,
    success,
    submitFinalRegistration,
  } = useRegistrationSubmission();

  const { formData, course, department } =
    (location.state as
      | { formData?: RegistrationData; course?: Course; department?: Department }
      | null) || {};

  if (!formData || !course || !department) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Invalid payment session</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    setPaymentMessage(null);

    try {
      const rawStored = localStorage.getItem(REGISTRATION_FORM_DATA_KEY);
      const storedFormData = rawStored ? (JSON.parse(rawStored) as RegistrationData) : null;
      const activeFormData = formData ?? storedFormData;

      if (!activeFormData) {
        throw new Error("Registration details are missing. Please return to the registration form.");
      }

      const payload = registrationDataToInsert(activeFormData);
      const [softwareRows, dayRows] = await Promise.all([fetchSoftwareOptions(), fetchAvailabilityDays()]);
      const softwareIds = softwareLabelsToIds(softwareRows, activeFormData.softwareUsed ?? []);
      const dayIds = availabilityDayNamesToIds(dayRows, activeFormData.availableDays ?? []);

      const { registration } = await submitFinalRegistration(payload, softwareIds, dayIds);
      console.info("Registration submitted successfully:", {
        registrationId: registration.id,
        softwareIds,
        dayIds,
      });
      setPaymentMessage("Registration confirmed. You can now proceed with payment.");
      setPaymentComplete(true);
    } catch (error) {
      console.error("Failed to submit final registration from payment page:", error);
      setPaymentMessage("We couldn't complete your registration. Please try again.");
    }
  };

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-900 flex items-center justify-center px-4">
        <motion.div
          className="max-w-2xl w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 sm:p-12 text-center">
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle2 className="w-12 h-12 text-white" />
            </motion.div>

            <h1 className="text-4xl font-bold text-white mb-4">
              Registration Complete!
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <BrandLogo className="max-h-12 w-auto max-w-[min(100%,280px)] object-contain shrink-0" />
              <p className="text-xl text-slate-300 text-center sm:text-left">
                Welcome, {formData.firstName}!
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 mb-8 text-left">
              <h3 className="text-lg font-semibold text-white mb-4">Course Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Course</span>
                  <span className="text-white font-medium">{course.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Department</span>
                  <span className="text-white font-medium">{department.name}</span>
                </div>
                <div className="pt-2 border-t border-slate-700/80">
                  <CourseMeta course={course} />
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Amount Paid</span>
                  <span className="text-green-400 font-bold">
                    MWK {registrationFee.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 text-left p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Confirmation Email Sent</p>
                  <p className="text-sm text-slate-400">Check your inbox at {formData.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-left p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Course Materials Ready</p>
                  <p className="text-sm text-slate-400">Access your course portal when the course begins</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-left p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Instructor Contact</p>
                  <p className="text-sm text-slate-400">You'll receive instructor details soon</p>
                </div>
              </div>
            </div>

            <motion.button
              onClick={() => navigate("/")}
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Return to Home
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute top-40 left-40 w-96 h-96 bg-gradient-to-br ${department.gradient} opacity-10 rounded-full blur-3xl`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CreditCard className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Complete Your Registration
            </h1>
            <p className="text-xl text-slate-300">
              You're one step away from starting your creative journey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Order Summary */}
            <motion.div
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-3xl shrink-0">{department.icon}</span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white">{course.name}</h3>
                    <p className="text-sm text-slate-400 mb-3">{department.name}</p>
                    <CourseMeta course={course} />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400">Course Fee (due at course start)</span>
                  <span className="text-white">
                    MWK {courseFee.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400">Registration Fee (due now)</span>
                  <span className="text-white">
                    MWK {registrationFee.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-white">Total due today</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    MWK {registrationFee.toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Student Info */}
            <motion.div
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Student Information</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Name</p>
                  <p className="text-white font-medium">{formData.firstName} {formData.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Email</p>
                  <p className="text-white font-medium">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Phone</p>
                  <p className="text-white font-medium">{formData.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">City</p>
                  <p className="text-white font-medium">{formData.city}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Payment Method */}
          <motion.div
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
            
            <div className={`p-6 border-2 rounded-xl cursor-pointer transition-all bg-gradient-to-br ${department.gradient} bg-opacity-10 border-purple-500`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">PayChangu</h3>
                  <p className="text-sm text-slate-300">Secure mobile payment</p>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Shield className="w-5 h-5 text-green-400" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-purple-400" />
                <span>Verified Gateway</span>
              </div>
            </div>
          </motion.div>

          {/* Payment Instructions */}
          <motion.div
            className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="font-semibold text-white mb-3">Payment Instructions</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-slate-300">
              <li>Click the "Pay with PayChangu" button below</li>
              <li>You will be redirected to the secure PayChangu payment gateway</li>
              <li>Complete the payment using your mobile money or card</li>
              <li>You'll receive instant confirmation via email and SMS</li>
            </ol>
          </motion.div>

          {/* Payment Button */}
          {(submitError || paymentMessage) && (
            <div
              className={`mb-4 rounded-xl border px-4 py-3 text-sm ${
                submitError
                  ? "border-red-500/40 bg-red-950/40 text-red-100"
                  : "border-emerald-500/40 bg-emerald-950/40 text-emerald-100"
              }`}
              role="alert"
            >
              {submitError ?? paymentMessage}
            </div>
          )}
          <motion.button
            onClick={handlePayment}
            disabled={isSubmitting || success}
            className={`w-full sm:w-auto whitespace-nowrap min-h-12 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base md:text-lg bg-gradient-to-r ${department.gradient} text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 hover:shadow-2xl active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed`}
            whileHover={isSubmitting || success ? {} : { scale: 1.02 }}
            whileTap={isSubmitting || success ? {} : { scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Submitting registration...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-6 h-6" />
                <span className="sm:hidden">
                  Pay with PayChangu
                </span>
                <span className="hidden sm:inline">
                  Pay with PayChangu - MWK {registrationFee.toLocaleString()} (registration fee)
                </span>
              </>
            )}
          </motion.button>

          {/* Reassurance */}
          <motion.p
            className="text-center text-slate-400 text-sm mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            🔒 Your payment information is secure and encrypted. We never store your payment details.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
