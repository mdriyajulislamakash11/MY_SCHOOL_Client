import React from "react";
import useRole from "../../hook/useRole";
import useAuth from "../../hook/useAuth";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [role, isLoading] = useRole();
  const { user } = useAuth();

  console.log("User role:", role);

  // Loading handle
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* -------- Left Sidebar -------- */}
      <div className="w-72 bg-base-200 p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="menu space-y-2">
          {/* Student */}
          {role === "student" && (
            <>
              <li>
                <NavLink to="/dashboard/student">Student Profile</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/booked-sessions">
                  View Booked Sessions
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/create-note">Create Note</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-notes">Manage Notes</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/study-materials">
                  View Study Materials
                </NavLink>
              </li>
            </>
          )}

          {/* Teacher */}
          {role === "teacher" && (
            <>
              <li>
                <NavLink to="/dashboard/teacher">Teacher Dashboard</NavLink>
              </li>
            </>
          )}

          {/* Admin */}
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/admin">Admin Dashboard</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* -------- Right Content -------- */}
      <div className="flex-1 bg-base-100 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
