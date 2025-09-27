import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../../hook/useRole";
import useAuth from "../../hook/useAuth";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [role, isLoading] = useRole();
  const { user, logout } = useAuth();

  // Handle logout
  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out!",
          text: "You have successfully logged out.",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  // Loading spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // NavLink style
  const navLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition-colors duration-200 ${
      isActive
        ? "bg-primary text-white font-bold"
        : "hover:bg-base-300 text-gray-700 font-medium"
    }`;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* -------- Left Sidebar -------- */}
      <aside className="w-full lg:w-72 bg-gray-100 shadow-md p-6 flex-shrink-0">
        {/* Profile */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="User Avatar"
            className="w-16 h-16 rounded-full border"
          />
          <h2 className="mt-2 text-lg font-semibold">{user?.displayName}</h2>
          <span className="text-sm text-gray-600 bg-lime-400 px-2 py-1 rounded-full mt-1">
            {role}
          </span>
        </div>

        {/* Role-based Menu */}
        <ul className="menu space-y-2 w-full">
          {role === "student" && (
            <>
              <li><NavLink to="/dashboard/student" className={navLinkClass}>Student Profile</NavLink></li>
              <li><NavLink to="/dashboard/booked-sessions" className={navLinkClass}>Booked Sessions</NavLink></li>
              <li><NavLink to="/dashboard/create-note" className={navLinkClass}>Create Note</NavLink></li>
              <li><NavLink to="/dashboard/manage-notes" className={navLinkClass}>Manage Notes</NavLink></li>
              <li><NavLink to="/dashboard/study-materials" className={navLinkClass}>Study Materials</NavLink></li>
            </>
          )}

          {role === "teacher" && (
            <>
              <li><NavLink to="/dashboard/teacher" className={navLinkClass}>Tutor Profile</NavLink></li>
              <li><NavLink to="/dashboard/create-session" className={navLinkClass}>Create Session</NavLink></li>
              <li><NavLink to="/dashboard/my-sessions" className={navLinkClass}>All Sessions</NavLink></li>
              <li><NavLink to="/dashboard/upload-materials" className={navLinkClass}>Upload Materials</NavLink></li>
              <li><NavLink to="/dashboard/my-materials" className={navLinkClass}>My Materials</NavLink></li>
            </>
          )}

          {role === "admin" && (
            <>
              <li><NavLink to="/dashboard/admin" className={navLinkClass}>Admin Profile</NavLink></li>
              <li><NavLink to="/dashboard/all-users" className={navLinkClass}>All Users</NavLink></li>
              <li><NavLink to="/dashboard/all-sessions" className={navLinkClass}>All Sessions</NavLink></li>
              <li><NavLink to="/dashboard/all-materials" className={navLinkClass}>All Materials</NavLink></li>
            </>
          )}
        </ul>

        {/* Divider */}
        <div className="divider my-4"></div>

        {/* Common Links */}
        <ul className="space-y-2">
          <li><NavLink to="/" className={navLinkClass}>🏠 Home</NavLink></li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
            >
              🚪 Logout
            </button>
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
