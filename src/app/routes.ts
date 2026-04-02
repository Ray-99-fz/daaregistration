import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import DepartmentCourses from "./pages/DepartmentCourses";
import Registration from "./pages/Registration";
import Payment from "./pages/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/department/:departmentId",
    Component: DepartmentCourses,
  },
  {
    path: "/register/:departmentId/:courseId",
    Component: Registration,
  },
  {
    path: "/payment",
    Component: Payment,
  },
]);
