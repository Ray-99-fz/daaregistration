import { Instagram, Twitter, Globe } from "lucide-react";
import type { Course } from "../data/departments";

type CourseMetaProps = {
  course: Course;
  className?: string;
};

/** Instructor, level, duration, and optional social links. */
export function CourseMeta({ course, className = "" }: CourseMetaProps) {
  const socials = course.instructorSocials;

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
      {socials && (socials.instagram || socials.twitter || socials.portfolio) ? (
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto pt-1 sm:pt-0">
          <span className="text-slate-500 shrink-0">Links:</span>
          <div className="flex items-center gap-2">
            {socials.instagram ? (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 transition-colors"
                aria-label="Instructor on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            ) : null}
            {socials.twitter ? (
              <a
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 transition-colors"
                aria-label="Instructor on X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </a>
            ) : null}
            {socials.portfolio ? (
              <a
                href={socials.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
                aria-label="Instructor portfolio"
              >
                <Globe className="w-5 h-5" />
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
