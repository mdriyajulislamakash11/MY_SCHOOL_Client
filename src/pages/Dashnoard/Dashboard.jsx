import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import useRole from "../../hook/useRole";
import useAuth from "../../hook/useAuth";
import Swal from "sweetalert2";

const Dashboard = ({ recentSessions = [], recentMaterials = [], notifications = [] }) => {
  const [role, isLoading] = useRole();
  const { user, logout } = useAuth();
  const location = useLocation();
  const isDashboardHome = location.pathname === "/dashboard";

 

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
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const navLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition-colors duration-200 ${
      isActive ? "bg-primary text-white font-bold" : "hover:bg-base-300 text-gray-700 font-medium"
    }`;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* -------- Left Sidebar -------- */}
      <aside className="w-full lg:w-72 bg-gray-100 shadow-md p-6 flex-shrink-0">
        <div className="flex flex-col items-center mb-6">
          <img
            src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="User Avatar"
            className="w-16 h-16 rounded-full border"
          />
          <h2 className="mt-2 text-lg font-semibold">{user?.displayName}</h2>
          <div className="flex items-center mt-1">
            <span className="font-bold">You Are: </span>
            <span className="font-bold text-blue-500 px-2 py-1 rounded-full mt-1">{role}</span>
          </div>
        </div>

        <ul className="menu space-y-2 w-full">
          {role === "student" && (
            <>
              <li>
                <NavLink to="/dashboard/student" className={navLinkClass}>
                  Student Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/booked-sessions" className={navLinkClass}>
                  Booked Sessions
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
                <NavLink to="/dashboard/study-materials" className={navLinkClass}>
                  Study Materials
                </NavLink>
              </li>
            </>
          )}

          {role === "teacher" && (
            <>
              <li>
                <NavLink to="/dashboard/teacher" className={navLinkClass}>
                  Tutor Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/create-session" className={navLinkClass}>
                  Create Session
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-sessions" className={navLinkClass}>
                  All Sessions
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/upload-materials" className={navLinkClass}>
                  Upload Materials
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-materials" className={navLinkClass}>
                  My Materials
                </NavLink>
              </li>
            </>
          )}

          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/admin" className={navLinkClass}>
                  Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-users" className={navLinkClass}>
                  All Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-sessions" className={navLinkClass}>
                  All Sessions
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-materials" className={navLinkClass}>
                  All Materials
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <div className="divider my-4"></div>

        <ul className="space-y-2">
          <li>
            <NavLink to="/" className={navLinkClass}>
              🏠 Home
            </NavLink>
          </li>
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
      <main className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* Dashboard Home Content */}
        {isDashboardHome && (
          <div>
            {/* Welcome Section */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 mb-8 text-center">
              <h1 className="text-4xl font-bold text-blue-700">
                Welcome, {user?.displayName?.split(" ")[0] || "Learner"} 👋
              </h1>
              <p className="text-gray-600 mt-3 text-lg">
                You are logged in as{" "}
                <span className="font-semibold text-indigo-600 capitalize">{role}</span>.
                <br />
                Manage your sessions, materials, and account easily from here.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-3xl shadow-md transform hover:scale-[1.03] transition">
                <h3 className="text-lg font-semibold mb-1">Your Role</h3>
                <p className="text-2xl font-bold capitalize">{role}</p>
              </div>
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white p-6 rounded-3xl shadow-md transform hover:scale-[1.03] transition">
                <h3 className="text-lg font-semibold mb-1">Email</h3>
                <p className="text-xl break-all">{user?.email}</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-3xl shadow-md transform hover:scale-[1.03] transition">
                <h3 className="text-lg font-semibold mb-1">Status</h3>
                <p className="text-2xl font-bold">Active ✅</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-200 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Quick Links</h2>
              <div className="flex flex-wrap gap-4">
                <button className="px-5 py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition">
                  Profile
                </button>
                <button className="px-5 py-3 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition">
                  Booked Sessions
                </button>
                <button className="px-5 py-3 bg-purple-500 text-white rounded-2xl hover:bg-purple-600 transition">
                  Study Materials
                </button>
                <button className="px-5 py-3 bg-pink-500 text-white rounded-2xl hover:bg-pink-600 transition">
                  Notes
                </button>
              </div>
            </div>

            {/* Recent Booked Sessions (Student) */}
            {role === "student" && recentSessions.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Recent Sessions</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentSessions.map((session) => (
                    <div key={session._id} className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition">
                      <img
                        src={session.image || "https://via.placeholder.com/300x180"}
                        alt={session.sessionTitle}
                        className="w-full h-36 object-cover rounded-xl mb-3"
                      />
                      <h3 className="font-semibold text-lg">{session.sessionTitle}</h3>
                      <p className="text-gray-500 text-sm">{new Date(session.date).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Materials (Teacher/Admin) */}
            {(role === "teacher" || role === "admin") && recentMaterials.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Recent Materials</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentMaterials.map((material) => (
                    <div key={material._id} className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition">
                      <img
                        src={material.image || "https://via.placeholder.com/300x180"}
                        alt={material.title}
                        className="w-full h-36 object-cover rounded-xl mb-3"
                      />
                      <h3 className="font-semibold text-lg">{material.title}</h3>
                      <a
                        href={material.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Open Drive Link
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notifications */}
            <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-200 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Notifications</h2>
              <ul className="list-disc pl-5 text-gray-600">
                {notifications.length > 0
                  ? notifications.map((note, i) => <li key={i}>{note}</li>)
                  : <li>No new notifications</li>}
              </ul>
            </div>

          </div>
        )}

        

        {/* Outlet for nested routes */}
        <div className="mt-8 bg-white p-8 rounded-3xl shadow-md border border-gray-200">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
