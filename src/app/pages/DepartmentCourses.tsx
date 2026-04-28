import { useMemo } from "react";
import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router";
import {
  courseFee,
  getDepartmentById,
  // registrationFee,
} from "../data/departments";
import { getDepartmentGallerySlides } from "../data/department-gallery";
import { CourseMeta } from "../components/CourseMeta";
import { downloadFile } from "../../lib/downloadFile";
import { ArrowLeft, Download, CheckCircle2 } from "lucide-react";

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

  /** Carousel: department folder images; falls back to course thumbnails if none configured. */
  const gallerySlides = useMemo(() => {
    const fromDept = getDepartmentGallerySlides(department.id);
    if (fromDept.length > 0) return [...fromDept];
    return department.courses.map((c) => c.thumbnail);
  }, [department.id, department.courses]);

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

        <motion.div
          className="mb-10 -mx-1 px-1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <p className="text-sm text-slate-500 mb-3">Course gallery — scroll sideways</p>
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 scroll-smooth">
            {gallerySlides.map((src, i) => (
              <img
                key={`${src}-${i}`}
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-28 w-44 sm:h-32 sm:w-52 shrink-0 rounded-xl object-cover snap-start border border-slate-800 shadow-md bg-slate-900"
              />
            ))}
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
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${department.gradient} mb-4 text-white font-bold text-lg`}>
                  {(index + 1).toString().padStart(2, "0")}
                </div>

                <img
                  src={course.thumbnail}
                  alt={course.name}
                  className="w-full h-48 rounded-xl object-cover mb-4 border border-slate-800"
                />

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 group-hover:bg-clip-text transition-all">
                  {course.name}
                </h3>

                <p className="text-slate-400 mb-4 leading-relaxed">
                  {course.description}
                </p>

                <CourseMeta course={course} className="mb-6" />

                {/* Price */}
                <div className="mb-6">
                  {/* <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-white">
                      MWK {registrationFee.toLocaleString()}
                    </span>
                    <span className="text-slate-500 text-sm">registration fee (due now)</span>
                  </div> */}
                  <p className="text-slate-500 text-sm mt-1">
                    <span className="text-white font-medium">MWK {courseFee.toLocaleString()} per month</span>
                    <span className="text-slate-500"> course fee (payable when classes begin)</span>
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
                    className={`w-full sm:w-auto whitespace-nowrap min-h-11 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base md:text-lg bg-gradient-to-r ${department.gradient} text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center hover:shadow-lg active:scale-[0.99]`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Select Course
                  </motion.button>

                  <span
                    title={
                      course.overviewUrl
                        ? "Download course overview (PDF)"
                        : "Course overview PDF is not available"
                    }
                    className="w-full sm:w-auto inline-block"
                  >
                    <motion.button
                      type="button"
                      disabled={!course.overviewUrl}
                      onClick={() =>
                        downloadFile(course.overviewUrl, `${course.name}.pdf`)
                      }
                      className="w-full sm:w-auto whitespace-nowrap min-h-11 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base md:text-lg border border-slate-700 text-slate-300 font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:bg-slate-800 hover:text-white hover:shadow-lg active:scale-[0.99] disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-300 disabled:hover:shadow-none"
                      whileHover={
                        course.overviewUrl ? { scale: 1.02 } : undefined
                      }
                      whileTap={
                        course.overviewUrl ? { scale: 0.98 } : undefined
                      }
                    >
                      <Download className="w-4 h-4 shrink-0" aria-hidden />
                      <span className="inline-flex items-center gap-1.5">
                        Course Overview
                        <span className="text-xs text-slate-400 font-normal">
                          (PDF)
                        </span>
                      </span>
                    </motion.button>
                  </span>
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
