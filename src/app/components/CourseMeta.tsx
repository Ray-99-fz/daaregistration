import type { Course } from "../data/departments";

type CourseMetaProps = {
  course: Course;
  className?: string;
};

/** Instructor, level, and duration — stacks on small screens, flows inline on larger breakpoints. */
export function CourseMeta({ course, className = "" }: CourseMetaProps) {
  return (
    <div
      className={`text-sm text-slate-400 space-y-1 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-1 ${className}`}
    >
      <p>
        <span className="text-slate-500">Instructor:</span> {course.instructor}
      </p>
      <p>
        <span className="text-slate-500">Level:</span> {course.level}
      </p>
      <p>
        <span className="text-slate-500">Duration:</span> {course.duration}
      </p>
    </div>
  );
}
