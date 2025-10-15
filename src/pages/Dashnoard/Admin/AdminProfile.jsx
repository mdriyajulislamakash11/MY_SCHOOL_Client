import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import moment from "moment";

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;

  // Fetch admin info
  const { data: admin, isLoading: loadingAdmin } = useQuery({
    queryKey: ["admin", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${email}`);
      return res.data;
    },
  });

  // Fetch all users
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Fetch all sessions
  const { data: sessions = [], isLoading: loadingSessions } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/sessions");
      return res.data;
    },
  });

  // Fetch all materials
  const { data: materials = [], isLoading: loadingMaterials } = useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      const res = await axiosSecure.get("/materials");
      return res.data;
    },
  });

  // Fetch all payments
  const { data: payments = [], isLoading: loadingPayments } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  if (
    !email ||
    loadingAdmin ||
    loadingUsers ||
    loadingSessions ||
    loadingMaterials ||
    loadingPayments
  )
    return <p className="text-center mt-10">Loading...</p>;

  // Calculate extra stats
  const totalRevenue = payments.reduce((acc, p) => acc + (p.amount || 0), 0);
  const studentsCount = users.filter(u => u.role === "student").length;
  const tutorsCount = users.filter(u => u.role === "tutor").length;
  const adminsCount = users.filter(u => u.role === "admin").length;
  const pendingSessions = sessions.filter(s => s.status === "pending").length;
  const approvedSessions = sessions.filter(s => s.status === "approved").length;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-3xl shadow-lg mt-10">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt={admin?.name}
          className="w-36 h-36 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800">{admin?.name}</h1>
          <p className="text-gray-600 mb-2">📧 {admin?.email}</p>
          <p className="text-gray-600 mb-2">
            🏷 Role: {admin?.role || "Admin"}
          </p>
          <p className="text-gray-500 mt-3">
            Joined: {moment(admin?.createdAt).format("LL")}
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mt-10 text-center">
        <div className="bg-indigo-50 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-indigo-600">{users.length}</h2>
          <p className="text-gray-600 mt-1">Total Users</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-blue-600">{studentsCount}</h2>
          <p className="text-gray-600 mt-1">Students</p>
        </div>
        <div className="bg-green-50 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-green-600">{tutorsCount}</h2>
          <p className="text-gray-600 mt-1">Tutors</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-purple-600">{adminsCount}</h2>
          <p className="text-gray-600 mt-1">Admins</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-yellow-600">{sessions.length}</h2>
          <p className="text-gray-600 mt-1">Total Sessions</p>
        </div>
        <div className="bg-pink-50 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-pink-600">{pendingSessions}</h2>
          <p className="text-gray-600 mt-1">Pending Sessions</p>
        </div>
        <div className="bg-red-50 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-red-600">{approvedSessions}</h2>
          <p className="text-gray-600 mt-1">Approved Sessions</p>
        </div>
        <div className="bg-orange-50 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-orange-600">{materials.length}</h2>
          <p className="text-gray-600 mt-1">Materials Uploaded</p>
        </div>
        <div className="bg-teal-50 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-teal-600">{payments.length}</h2>
          <p className="text-gray-600 mt-1">Payments Done</p>
        </div>
        <div className="bg-lime-50 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-lime-600">${totalRevenue}</h2>
          <p className="text-gray-600 mt-1">Total Revenue</p>
        </div>
      </div>

      {/* Latest Sessions */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Latest Sessions</h3>
        {sessions.length === 0 ? (
          <p className="text-gray-500">No sessions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border border-gray-200 rounded-xl">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Tutor</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Created</th>
                </tr>
              </thead>
              <tbody>
                {sessions.slice(-5).reverse().map((s) => (
                  <tr key={s._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{s.title}</td>
                    <td className="px-4 py-2 border">{s.tutorName}</td>
                    <td className="px-4 py-2 border capitalize">{s.status}</td>
                    <td className="px-4 py-2 border">{moment(s.createdAt).fromNow()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Latest Materials */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Latest Materials</h3>
        {materials.length === 0 ? (
          <p className="text-gray-500">No materials found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border border-gray-200 rounded-xl">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Tutor</th>
                  <th className="px-4 py-2 border">Type</th>
                  <th className="px-4 py-2 border">Created</th>
                </tr>
              </thead>
              <tbody>
                {materials.slice(-5).reverse().map((m) => (
                  <tr key={m._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{m.title}</td>
                    <td className="px-4 py-2 border">{m.tutorName || m.tutorEmail}</td>
                    <td className="px-4 py-2 border">{m.type || "Free"}</td>
                    <td className="px-4 py-2 border">{moment(m.createdAt).fromNow()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Payments */}
      <div className="mt-10 mb-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Recent Payments</h3>
        {payments.length === 0 ? (
          <p className="text-gray-500">No payments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border border-gray-200 rounded-xl">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">User</th>
                  <th className="px-4 py-2 border">Amount</th>
                  <th className="px-4 py-2 border">Transaction ID</th>
                  <th className="px-4 py-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.slice(-5).reverse().map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{p.userEmail}</td>
                    <td className="px-4 py-2 border">${p.amount}</td>
                    <td className="px-4 py-2 border">{p.transactionId}</td>
                    <td className="px-4 py-2 border">{moment(p.date).fromNow()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
