import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashnoard/Dashboard";
import Register from "../auth/Register";
import Login from "../auth/Login";

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
        path: '/dashboard',
        element: <Dashboard />  
      },
      {
        path: '/register',
        element: <Register />  
      },
      {
        path: '/login',
        element: <Login />  
      }
    ],
  },
]);

export default router;
