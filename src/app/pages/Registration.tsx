import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useParams } from "react-router";
import { getDepartmentById, getCourseById } from "../data/departments";
import { RegistrationData, initialRegistrationData } from "../types/registration";
import {
  PersonalInfoStep,
  CurrentStatusStep,
  ExperienceStep,
  EquipmentStep,
  ConnectivityStep,
  MarketingStep,
} from "../components/RegistrationSteps";
import { ConfirmationStep } from "../components/ConfirmationStep";
import { CourseMeta } from "../components/CourseMeta";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAutosaveForm } from "@/hooks/useAutosaveForm";
import {
  getActiveRegistrationSteps,
  type RegistrationStepId,
} from "@/lib/registration/registration-wizard-steps";

export default function Registration() {
  const { departmentId, courseId } = useParams<{ departmentId: string; courseId: string }>();
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [paymentReturnNotice, setPaymentReturnNotice] = useState<
    { tone: "success" | "error"; text: string } | null
  >(null);

  const formMethods = useForm<RegistrationData>({
    defaultValues: {
      ...initialRegistrationData,
      departmentId: departmentId || "",
      courseId: courseId || "",
    },
  });
  const { watch, setValue } = formMethods;
  useAutosaveForm(formMethods);
  const formData = watch();

  const activeSteps = useMemo(
    () => getActiveRegistrationSteps(formData),
    [formData.departmentId, formData.courseId],
  );

  useEffect(() => {
    if (departmentId) {
      setValue("departmentId", departmentId, { shouldDirty: true });
    }
    if (courseId) {
      setValue("courseId", courseId, { shouldDirty: true });
    }
  }, [courseId, departmentId, setValue]);

  useEffect(() => {
    setStepIndex((i) => Math.min(i, Math.max(0, activeSteps.length - 1)));
  }, [activeSteps.length]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    if (status === "success") {
      setPaymentReturnNotice({
        tone: "success",
        text: "Payment successful! Your registration fee is confirmed.",
      });
    } else if (status === "failed") {
      setPaymentReturnNotice({
        tone: "error",
        text: "Payment was not completed. You can try again using Pay Changu below.",
      });
    } else {
      return;
    }
    params.delete("status");
    const qs = params.toString();
    const path = window.location.pathname;
    window.history.replaceState({}, "", qs ? `${path}?${qs}` : path);
  }, []);

  const department = getDepartmentById(departmentId || "");
  const course = getCourseById(departmentId || "", courseId || "");

  const totalSteps = activeSteps.length;
  const currentStepId: RegistrationStepId | undefined = activeSteps[stepIndex];

  const updateData = useCallback(
    (updates: Partial<RegistrationData>) => {
      for (const [key, value] of Object.entries(updates) as [
        keyof RegistrationData,
        RegistrationData[keyof RegistrationData],
      ][]) {
        setValue(key, value, { shouldDirty: true, shouldTouch: true });
      }
    },
    [setValue],
  );

  const nextStep = () => {
    if (stepIndex < totalSteps - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const handlePrimaryAction = () => {
    if (stepIndex < totalSteps - 1) {
      nextStep();
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  const renderStep = () => {
    const stepProps = { data: formData, updateData };
    switch (currentStepId) {
      case "personal":
        return <PersonalInfoStep {...stepProps} />;
      case "status":
        return <CurrentStatusStep {...stepProps} />;
      case "experience":
        return <ExperienceStep {...stepProps} />;
      case "equipment":
        return <EquipmentStep {...stepProps} />;
      case "connectivity":
        return <ConnectivityStep {...stepProps} />;
      case "marketing":
        return <MarketingStep {...stepProps} />;
      case "confirmation":
        return <ConfirmationStep {...stepProps} />;
      default:
        return <PersonalInfoStep {...stepProps} />;
    }
  };

  if (!department || !course) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-white text-xl">Course not found</p>
      </div>
    );
  }

  const displayStepNumber = stepIndex + 1;
  const progress = totalSteps > 0 ? (displayStepNumber / totalSteps) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute top-40 right-40 w-96 h-96 bg-gradient-to-br ${department.gradient} opacity-10 rounded-full blur-3xl`}
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
        {paymentReturnNotice ? (
          <div
            className={`mb-6 rounded-xl border px-4 py-3 text-sm ${
              paymentReturnNotice.tone === "success"
                ? "border-emerald-500/40 bg-emerald-950/40 text-emerald-100"
                : "border-red-500/40 bg-red-950/40 text-red-100"
            }`}
            role="status"
          >
            {paymentReturnNotice.text}
          </div>
        ) : null}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>

          <div className="flex items-start gap-3 mb-6">
            <span className="text-4xl shrink-0">{department.icon}</span>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{course.name}</h1>
              <p className="text-slate-400 mb-3">{department.name}</p>
              <CourseMeta course={course} />
            </div>
          </div>
        </motion.div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-slate-300">
              Step {displayStepNumber} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-slate-300">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${department.gradient}`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex justify-between mt-4 gap-1">
            {activeSteps.map((_, i) => (
              <div
                key={`step-dot-${i}`}
                className={`flex items-center justify-center min-w-8 h-8 rounded-full text-xs font-bold transition-all ${
                  i < stepIndex
                    ? `bg-gradient-to-br ${department.gradient} text-white`
                    : i === stepIndex
                      ? "bg-white text-slate-900"
                      : "bg-slate-800 text-slate-500"
                }`}
              >
                {i < stepIndex ? <Check className="w-4 h-4" /> : i + 1}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentStepId}-${stepIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <motion.button
            onClick={prevStep}
            disabled={stepIndex === 0}
            className={`w-full sm:w-auto whitespace-nowrap min-h-11 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base md:text-lg rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.99] ${
              stepIndex === 0
                ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                : "bg-slate-800 text-white hover:bg-slate-700 hover:shadow-lg"
            }`}
            whileHover={stepIndex !== 0 ? { scale: 1.02 } : {}}
            whileTap={stepIndex !== 0 ? { scale: 0.98 } : {}}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Previous</span>
          </motion.button>

          {stepIndex < totalSteps - 1 ? (
            <motion.button
              type="button"
              onClick={handlePrimaryAction}
              className={`w-full sm:w-auto whitespace-nowrap min-h-11 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base md:text-lg bg-gradient-to-r ${department.gradient} text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 hover:shadow-lg active:scale-[0.99]`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Next</span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </motion.button>
          ) : null}
        </div>

        <motion.p
          className="text-center text-slate-500 text-sm mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Need help? Contact us at{" "}
          <a
            href="mailto:digitalartacademy@gmail.com"
            className="text-slate-300 hover:text-white underline underline-offset-2"
          >
            digitalartacademy@gmail.com
          </a>
        </motion.p>
      </div>
    </div>
  );
}
