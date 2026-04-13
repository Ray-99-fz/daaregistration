import { Instagram, Globe } from "lucide-react";
import type { Course } from "../data/departments";

type CourseMetaProps = {
  course: Course;
  className?: string;
};

/** Instructor, level, duration, and optional instructor social link. */
export function CourseMeta({ course, className = "" }: CourseMetaProps) {
  return (
    <div className={`text-sm text-slate-400 space-y-2 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-1 ${className}`}>
      <p>
        <span className="text-slate-500">Instructor:</span> {course.instructor}
      </p>
      <p>
        <span className="text-slate-500">Level:</span> {course.level}
      </p>
      <p>
        <span className="text-slate-500">Duration:</span> {course.duration}
      </p>
      <p>
        <span className="text-slate-500">Delivery:</span> {course.delivery}
      </p>
      {course.instructorSocial ? (
        <div className="w-full sm:w-auto pt-1 sm:pt-0">
          <a
            href={course.instructorSocial.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300"
            aria-label={
              course.instructorSocial.type === "instagram"
                ? "Instructor on Instagram"
                : "Instructor portfolio"
            }
          >
            {course.instructorSocial.type === "instagram" ? (
              <Instagram className="w-4 h-4 shrink-0" aria-hidden />
            ) : (
              <Globe className="w-4 h-4 shrink-0" aria-hidden />
            )}
            <span>Instructor</span>
          </a>
        </div>
      ) : null}
    </div>
  );
}
