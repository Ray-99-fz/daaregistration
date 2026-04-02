import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useParams } from "react-router";
import { getDepartmentById, getCourseById } from "../data/departments";
import { RegistrationData, initialRegistrationData } from "../types/registration";
import {
  PersonalInfoStep,
  CurrentStatusStep,
  ExperienceStep,
  EquipmentStep,
  AvailabilityStep,
  MarketingStep,
  ConfirmationStep,
} from "../components/RegistrationSteps";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

export default function Registration() {
  const { departmentId, courseId } = useParams<{ departmentId: string; courseId: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationData>({
    ...initialRegistrationData,
    departmentId: departmentId || "",
    courseId: courseId || "",
  });

  const department = getDepartmentById(departmentId || "");
  const course = getCourseById(departmentId || "", courseId || "");

  const totalSteps = 7;

  const updateData = (updates: Partial<RegistrationData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to payment page
      navigate("/payment", { state: { formData, course, department } });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    const stepProps = { data: formData, updateData };
    
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep {...stepProps} />;
      case 2:
        return <CurrentStatusStep {...stepProps} />;
      case 3:
        return <ExperienceStep {...stepProps} />;
      case 4:
        return <EquipmentStep {...stepProps} />;
      case 5:
        return <AvailabilityStep {...stepProps} />;
      case 6:
        return <MarketingStep {...stepProps} />;
      case 7:
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

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background */}
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
        {/* Header */}
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

          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">{department.icon}</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{course.name}</h1>
              <p className="text-slate-400">{department.name}</p>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-slate-300">
              Step {currentStep} of {totalSteps}
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

          {/* Step indicators */}
          <div className="flex justify-between mt-4">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all ${
                  step < currentStep
                    ? `bg-gradient-to-br ${department.gradient} text-white`
                    : step === currentStep
                    ? "bg-white text-slate-900"
                    : "bg-slate-800 text-slate-500"
                }`}
              >
                {step < currentStep ? <Check className="w-4 h-4" /> : step}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <motion.div
          className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <motion.button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              currentStep === 1
                ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                : "bg-slate-800 text-white hover:bg-slate-700"
            }`}
            whileHover={currentStep !== 1 ? { scale: 1.02 } : {}}
            whileTap={currentStep !== 1 ? { scale: 0.98 } : {}}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Previous</span>
          </motion.button>

          <motion.button
            onClick={nextStep}
            className={`flex items-center gap-2 px-8 py-3 bg-gradient-to-r ${department.gradient} text-white font-semibold rounded-xl hover:shadow-lg transition-all`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{currentStep === totalSteps ? "Proceed to Payment" : "Next"}</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Help Text */}
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
