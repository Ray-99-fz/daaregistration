import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center px-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-9xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          404
        </motion.div>

        <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-xl text-slate-300 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto whitespace-nowrap min-h-11 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base md:text-lg bg-slate-800 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-slate-700 hover:shadow-lg active:scale-[0.99]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </motion.button>

          <motion.button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto whitespace-nowrap min-h-11 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base md:text-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 hover:shadow-lg active:scale-[0.99]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-5 h-5" />
            <span>Return Home</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
