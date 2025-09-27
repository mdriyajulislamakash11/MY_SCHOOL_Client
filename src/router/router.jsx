import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashnoard/Dashboard";
import Register from "../auth/Register";
import Login from "../auth/Login";
import StudentProfile from "../pages/Dashnoard/Student/StudentProfile";
import BookedSession from "../pages/Dashnoard/Student/BookedSession";
import CreateNote from "../pages/Dashnoard/Student/CreateNote";
import ManageNotes from "../pages/Dashnoard/Student/ManageNotes";
import StudyMaterials from "../pages/Dashnoard/Student/StudyMaterials";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },

  // Dashboard route
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      // Student, 
      {
        path: "student",
        element: <StudentProfile />
      },
      {
        path: "booked-sessions",
        element: <BookedSession />,
      },
      {
        path: "create-note",
        element: <CreateNote />,
      },
      {
        path: "manage-notes",
        element: <ManageNotes />,
      },
      {
        path: "study-materials",
        element: <StudyMaterials />,
      },

      // Teacher,
      {
        path: "/dashboard/tutor",
        element: <div>Tutor Dashboard</div>,
      },

      // Admin
      {
        path: "/dashboard/admin",
        element: <div>Admin Dashboard</div>,
      },
    ],
  },
]);

export default router;
