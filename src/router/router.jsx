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
import CreateStudySession from "../pages/Dashnoard/Teacher/CreateStudySession";
import ViewAllStudySession from "../pages/Dashnoard/Teacher/ViewAllStudySession";
import StudentRoute from "./StudentRoute";
import TeacherRoute from "./TeacherRoute";
import AdminProfile from "../pages/Dashnoard/Admin/AdminProfile";
import AllUsers from "../pages/Dashnoard/Admin/AllUsers";
import AllSessions from "../pages/Dashnoard/Admin/AllSessions";
import AllMaterials from "../pages/Dashnoard/Admin/AllMaterials";
import AdminRoute from "./AdminRoute";

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
        element:<StudentRoute><StudentProfile /></StudentRoute>,
      },
      {
        path: "booked-sessions",
        element: <StudentRoute><BookedSession /></StudentRoute>,
      },
      {
        path: "create-note",
        element: <StudentRoute><CreateNote /></StudentRoute>,
      },
      {
        path: "manage-notes",
        element: <StudentRoute><ManageNotes /></StudentRoute>,
      },
      {
        path: "study-materials",
        element: <StudentRoute><StudyMaterials /></StudentRoute>,
      },

      // Teacher routes
      {
        path: "teacher", // /dashboard/teacher
        element:<TeacherRoute><TeacherProfile /></TeacherRoute>,  
      },
      {
        path: "create-session",
        element: <TeacherRoute><CreateStudySession /></TeacherRoute>,
      },
      {
        path: "my-sessions",
        element: <TeacherRoute><ViewAllStudySession /></TeacherRoute>,
      },
      {
        path: "upload-materials",
        element: <TeacherRoute><UploadMaterials /></TeacherRoute>,
      },
      {
        path: "my-materials",
        element: <TeacherRoute><ViewAllMaterials /></TeacherRoute>,
      },

      // Admin
{
  path: "admin",
  element: <AdminRoute><AdminProfile /></AdminRoute>, // default admin dashboard page
},
{
  path: "all-users",
  element: <AdminRoute><AllUsers /></AdminRoute>, // View all users + role update
},
{
  path: "all-sessions",
  element: <AdminRoute><AllSessions /></AdminRoute>, // Approve/Reject/Update/Delete session
},
{
  path: "all-materials",
  element: <AdminRoute><AllMaterials /></AdminRoute>, // View & remove materials
},


    ],
  },
]);

export default router;
