import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { XCircle, RefreshCcw } from "lucide-react";
import { BrandLogo } from "../components/BrandLogo";

export default function RegistrationFailed() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#1a080c] to-slate-950 relative overflow-hidden flex items-center justify-center">

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl bg-red-500/20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl bg-orange-500/20"
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
          <XCircle className="w-20 h-20 text-red-400" />
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Registration Failed
        </h1>

        <p className="text-slate-300 mb-6 leading-relaxed">
          Something went wrong while submitting your registration.
          This could be due to a network issue or temporary system problem.
        </p>

        <p className="text-slate-400 text-sm mb-8">
          Please try again. If the issue persists, contact support.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={() => navigate(-1)}
            className="min-h-12 px-6 py-3 rounded-xl bg-gradient-to-r from-[#E31E24] to-red-700 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-xl"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <RefreshCcw className="w-5 h-5" />
            <span>Try Again</span>
          </motion.button>

          <motion.button
            onClick={() => navigate("/")}
            className="min-h-12 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Back to Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}