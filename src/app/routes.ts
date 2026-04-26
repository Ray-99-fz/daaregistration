import { createBrowserRouter } from "react-router";
import AppLayout from "./components/AppLayout";
import Landing from "./pages/Landing";
import DepartmentCourses from "./pages/DepartmentCourses";
import Registration from "./pages/Registration";
import Payment from "./pages/Payment";
import PaymentStatus from "./pages/PaymentStatus";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: Landing },
      { path: "department/:departmentId", Component: DepartmentCourses },
      { path: "register/:departmentId/:courseId", Component: Registration },
      { path: "payment", Component: Payment },
    ],
  },
  {
    path: "/payment-status",
    Component: PaymentStatus,
  },
]);
