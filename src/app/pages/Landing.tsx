import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { courseFee, departments, registrationFee } from "../data/departments";
import { BrandLogo } from "../components/BrandLogo";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#1a080c] to-slate-950 relative overflow-hidden">
      {/* Animated background — tuned to logo red (#E31E24) while keeping a dark cinematic base */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl bg-[#E31E24]/18"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl bg-rose-900/25"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.35, 0.2, 0.35],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950/90 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#E31E24]/12 border border-[#E31E24]/25 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-[#E31E24]" />
            <span className="text-sm text-red-100/90">
              Registrations open for classes starting 2 May
            </span>
          </motion.div>
          
          <div className="flex justify-center mb-6 px-2">
            <BrandLogo className="w-full max-w-[min(100%,32rem)] h-auto max-h-24 sm:max-h-32 md:max-h-36 object-contain mx-auto" />
          </div>
          <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto">
            Transform your creative passion into professional expertise.
            <br />
            Choose your path and start your artistic journey today.
          </p>
        </motion.div>

        {/* Department Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {departments.map((department, index) => (
            <motion.div
              key={department.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-300 shadow-2xl">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${department.backgroundImage})` }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-b ${department.gradient} opacity-80 group-hover:opacity-70 transition-opacity duration-300`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative h-full p-8 flex flex-col justify-between">
                  <div>
                    <motion.div
                      className="text-6xl mb-4"
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      {department.icon}
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white mb-3">
                      {department.name}
                    </h2>
                    <p className="text-slate-200 text-lg">
                      {department.tagline}
                    </p>
                  </div>

                  {/* Glow effect on hover */}
                  <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className={`absolute inset-0 bg-gradient-to-t ${department.gradient} opacity-20 blur-xl`} />
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    onClick={() => navigate(`/department/${department.id}`)}
                    className="relative w-full sm:w-auto whitespace-nowrap min-h-12 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base md:text-lg bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/20 hover:shadow-lg active:scale-[0.99] transition-all duration-300 group/btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Explore Courses</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-slate-400 text-sm">
            Registration is MWK {registrationFee.toLocaleString()} (due upon registration) • Course fee is MWK{" "}
            {courseFee.toLocaleString()} per month (payable when classes begin) • Expert instructors • Hands-on projects
          </p>
        </motion.div>
      </div>
    </div>
  );
}
