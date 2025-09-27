import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashnoard/Dashboard";
import Register from "../auth/Register";
import Login from "../auth/Login";

// Student pages
import StudentProfile from "../pages/Dashnoard/Student/StudentProfile";
import BookedSession from "../pages/Dashnoard/Student/BookedSession";
import CreateNote from "../pages/Dashnoard/Student/CreateNote";
import ManageNotes from "../pages/Dashnoard/Student/ManageNotes";
import StudyMaterials from "../pages/Dashnoard/Student/StudyMaterials";
import PrivateRoute from "./PrivateRoute";
import TeacherProfile from "../pages/Dashnoard/Teacher/TeacherProfile";
import UploadMaterials from "../pages/Dashnoard/Teacher/UploadMaterials";
import ViewAllMaterials from "../pages/Dashnoard/Teacher/ViewAllMaterials";

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
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // Student
      {
        path: "student",
        element: <StudentProfile />,
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

      // Teacher routes
      {
        path: "teacher", // /dashboard/teacher
        element: <TeacherProfile />
      },
      {
        path: "teacher/create-session",
        element: <CreateSession />,
      },
      {
        path: "teacher/my-sessions",
        element: <ViewAllSessions />,
      },
      {
        path: "teacher/upload-materials",
        element: <UploadMaterials />,
      },
      {
        path: "teacher/my-materials",
        element: <ViewAllMaterials />,
      },

      // Admin
      {
        path: "admin", // 🟢 fixed (আগে "/dashboard/admin" ছিল)
        element: <div>Admin Dashboard</div>,
      },
    ],
  },
]);

export default router;
