import { motion } from "motion/react";
import { useNavigate, useSearchParams } from "react-router";
import { CheckCircle, ArrowRight } from "lucide-react";
import { BrandLogo } from "../components/BrandLogo";

export default function RegistrationSuccess() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const ref = params.get("ref");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#1a080c] to-slate-950 relative overflow-hidden flex items-center justify-center">
      
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl bg-green-500/20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl bg-[#E31E24]/20"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-xl w-full mx-auto p-8 text-center"
      >
        <div className="mb-6 flex justify-center">
          <BrandLogo className="h-20" />
        </div>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="flex justify-center mb-6"
        >
          <CheckCircle className="w-20 h-20 text-green-400" />
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Registration Successful 🎉
        </h1>

        <p className="text-slate-300 mb-6 leading-relaxed">
          You’re officially registered with Digital Art Academy.
          We’ve received your details and will contact you soon with
          your class schedule, materials, and next steps.
        </p>

        {ref && (
          <p className="text-sm text-slate-500 mb-6">
            Reference: <span className="text-slate-300">{ref}</span>
          </p>
        )}

        <motion.button
          onClick={() => navigate("/")}
          className="mx-auto min-h-12 px-6 py-3 rounded-xl bg-gradient-to-r from-[#E31E24] to-red-700 text-white font-semibold flex items-center gap-2 justify-center hover:shadow-xl transition-all"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Back to Home</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}