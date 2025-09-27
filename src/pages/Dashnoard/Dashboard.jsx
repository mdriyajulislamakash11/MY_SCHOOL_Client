import React from "react";
import useRole from "../../hook/useRole";
import useAuth from "../../hook/useAuth";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [role, isLoading] = useRole();
  const { user } = useAuth();

  // Loading handle
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Active link style
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "bg-primary  text-white px-3 py-2 rounded-lg font-semibold"
      : "px-3 py-2 rounded-lg hover:bg-base-300";

  return (
    <div className="flex min-h-screen">
      {/* -------- Left Sidebar -------- */}
      <aside className="w-72 bg-gray-200 p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="menu space-y-2 w-full">
          {/* Student */}
          {role === "student" && (
            <>
              <li>
                <NavLink to="/dashboard/student" className={navLinkClass}>
                  Student Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/booked-sessions"
                  className={navLinkClass}
                >
                  View Booked Sessions
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/create-note" className={navLinkClass}>
                  Create Note
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-notes" className={navLinkClass}>
                  Manage Notes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/study-materials"
                  className={navLinkClass}
                >
                  View Study Materials
                </NavLink>
              </li>
            </>
          )}

          {/* Teacher */}
          {role === "teacher" && (
            <>
              <li>
                <NavLink to="/dashboard/teacher" className={navLinkClass}>
                  Tutor Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/create-session"
                  className={navLinkClass}
                >
                  Create Study Session
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-sessions" className={navLinkClass}>
                  View All Study Sessions
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/upload-materials"
                  className={navLinkClass}
                >
                  Upload Materials
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-materials" className={navLinkClass}>
                  View All Materials
                </NavLink>
              </li>
            </>
          )}

          {/* Admin */}
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/admin" className={navLinkClass}>
                  Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-users" className={navLinkClass}>
                  View All Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/all-sessions"
                  className={navLinkClass}
                >
                  View All Study Sessions
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/all-materials"
                  className={navLinkClass}
                >
                  View All Materials
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <div className="divider"></div>

        <ul>
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* -------- Right Content -------- */}
      <main className="flex-1 bg-base-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
