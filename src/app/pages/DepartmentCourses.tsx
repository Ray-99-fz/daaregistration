import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router";
import {
  courseFee,
  getDepartmentById,
  registrationFee,
} from "../data/departments";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";

export default function DepartmentCourses() {
  const { departmentId } = useParams<{ departmentId: string }>();
  const navigate = useNavigate();
  const department = getDepartmentById(departmentId || "");

  if (!department) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-white text-xl">Department not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute top-20 right-20 w-96 h-96 bg-gradient-to-br ${department.gradient} opacity-20 rounded-full blur-3xl`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Departments</span>
        </motion.button>

        {/* Department Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{department.icon}</span>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                {department.name}
              </h1>
              <p className="text-xl text-slate-300">{department.tagline}</p>
            </div>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {department.courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="h-full bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all duration-300 shadow-xl hover:shadow-2xl">
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${department.gradient} rounded-t-2xl`} />

                {/* Course Number Badge */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${department.gradient} mb-6 text-white font-bold text-lg`}>
                  {(index + 1).toString().padStart(2, "0")}
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 group-hover:bg-clip-text transition-all">
                  {course.name}
                </h3>

                <p className="text-slate-400 mb-6 leading-relaxed">
                  {course.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-white">
                      MWK {registrationFee.toLocaleString()}
                    </span>
                    <span className="text-slate-500 text-sm">registration fee (due now)</span>
                  </div>
                  <p className="text-slate-500 text-sm mt-1">
                    Course fee:{" "}
                    <span className="text-white font-medium">
                      MWK {courseFee.toLocaleString()}
                    </span>{" "}
                    (due at course start)
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-8">
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <CheckCircle2 className="w-4 h-4" style={{ color: department.theme.primary }} />
                    <span>Hands-on projects</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <CheckCircle2 className="w-4 h-4" style={{ color: department.theme.primary }} />
                    <span>Expert instructors</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <CheckCircle2 className="w-4 h-4" style={{ color: department.theme.primary }} />
                    <span>Certificate on completion</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <motion.button
                    onClick={() => navigate(`/register/${departmentId}/${course.id}`)}
                    className={`w-full py-3 px-6 bg-gradient-to-r ${department.gradient} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Select Course
                  </motion.button>

                  <a
                    href={course.overviewUrl}
                    className="flex items-center justify-center gap-2 w-full py-3 px-6 border border-slate-700 text-slate-300 font-medium rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-300"
                  >
                    <span>View Overview</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-12 p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-slate-300 text-center">
            <span className="font-semibold text-white">Not sure which course to choose?</span> All courses include
            lifetime access to course materials, and ongoing instructor support.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
