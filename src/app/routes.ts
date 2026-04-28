import { createBrowserRouter } from "react-router";
import AppLayout from "./components/AppLayout";
import Landing from "./pages/Landing";
import DepartmentCourses from "./pages/DepartmentCourses";
import Registration from "./pages/Registration";

// ✅ New pages
import RegistrationSuccessful from "./pages/RegistrationSuccessful";
import RegistrationFailed from "./pages/RegistrationFailed";

// ❌ Old payment flow (kept for future reference)
// import Payment from "./pages/Payment";
// import PaymentStatus from "./pages/PaymentStatus";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: Landing },
      { path: "department/:departmentId", Component: DepartmentCourses },
      { path: "register/:departmentId/:courseId", Component: Registration },

      // ❌ Old payment route
      // { path: "payment", Component: Payment },
    ],
  },

  // ✅ Success / Failure routes (outside layout for full-screen UX)
  {
    path: "/registration-success",
    Component: RegistrationSuccessful,
  },
  {
    path: "/registration-failed",
    Component: RegistrationFailed,
  },

  // ❌ Old payment status route
  // {
  //   path: "/payment-status",
  //   Component: PaymentStatus,
  // },
]);