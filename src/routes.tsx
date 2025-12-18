import { Navigate } from "react-router";
import ErrorPage from "./components/errors/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AddService from "./pages/AddService";
import BookAppointment from "./pages/BookAppointment";
import Calendar from "./pages/Calendar";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./pages/Dashboard/_components/DashboardLayout";
import DashboardDuelist from "./pages/Duelist";
import EditService from "./pages/EditService";
import Home from "./pages/home";
import HomeLayout from "./pages/home/_components/Layout";
import MyBookings from "./pages/MyBookings";
import MyProfile from "./pages/MyProfile";
import DueList from "./pages/MyProfile/_components/DueList";
import PasswordSecurity from "./pages/MyProfile/_components/PasswordSecurity";
import ProfileInfo from "./pages/MyProfile/_components/ProfileInfo";
import NotFoundPage from "./pages/NotFoundPage";
import Payment from "./pages/Payment";
import ProviderProfile from "./pages/Provider";
import ReleaseService from "./pages/ReleaseService";
import RescheduleAppointment from "./pages/RescheduleAppoinment";
import Services from "./pages/services";

export default [
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "all-services",
        element: <ProtectedRoute />,
        errorElement: <ErrorPage />,
        children: [{ index: true, element: <Services /> }],
      },
      {
        path: "provider-profile",
        element: <ProtectedRoute />,
        children: [
          {
            path: ":providerId",
            element: <ProviderProfile />,
          },
        ],
      },

      {
        path: "book-appointment",
        element: <ProtectedRoute />,
        children: [
          {
            path: ":serviceId/:providerId",
            element: <BookAppointment />,
          },
        ],
      },

      {
        path: "my-bookings",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <MyBookings />,
          },
        ],
      },

      {
        path: "reschedule",
        element: <ProtectedRoute />,
        children: [
          {
            path: ":serviceId/:providerId/:bookingId",
            element: <RescheduleAppointment />,
          },
        ],
      },

      {
        path: "my-profile",
        element: <MyProfile />,
        children: [
          { index: true, element: <Navigate to="profile-info" replace /> },

          {
            path: "profile-info",
            element: <ProtectedRoute />,
            children: [{ index: true, element: <ProfileInfo /> }],
          },
          {
            path: "password-security",
            element: <ProtectedRoute />,
            children: [{ index: true, element: <PasswordSecurity /> }],
          },
          {
            path: "due-list",
            element: <ProtectedRoute />,
            children: [{ index: true, element: <DueList /> }],
          },
        ],
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "booking",
        element: <Payment />,
      },
      {
        path: "due-list",
        element: <DashboardDuelist />,
      },
      {
        path: "add-service",
        element: <AddService />,
      },
      {
        path: "release-service",
        element: <ReleaseService />,
      },

      {
        path: "edit-service/:serviceId",
        element: <EditService />,
      },
    ],
  },
  // Add catch-all route for 404 pages
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
