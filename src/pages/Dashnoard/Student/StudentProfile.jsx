import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import moment from "moment";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const StudentProfile = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const email = user?.email;

  // Fetch student info
  const { data: student, isLoading: loadingStudent } = useQuery({
    queryKey: ["student", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/role/${email}`);
      return res.data;
    },
  });

  // Fetch all users
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });

  if (loadingStudent || loadingUsers || !email)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  // Dummy data
  const userData = {
    enrolledCourses: 4,
    completedCourses: 2,
    activeSessions: 3,
    totalPayments: 150,
    recentCourses: [
      { title: "React Basics", status: "completed" },
      { title: "JavaScript Advanced", status: "in progress" },
      { title: "Tailwind CSS", status: "completed" },
    ],
    recentSessions: [
      { title: "React Q&A", date: "2025-10-12" },
      { title: "JS Debugging", date: "2025-10-10" },
    ],
    recentPayments: [
      { course: "React Basics", amount: 50, date: "2025-10-12" },
      { course: "Tailwind CSS", amount: 30, date: "2025-10-11" },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-3xl shadow-xl mt-10">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt={student?.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">{student?.name}</h1>
          <p className="text-gray-600 mb-1">📧 {student?.email}</p>
          <p className="text-gray-600 mb-1">🏷 Role: {student?.role || "Student"}</p>
          <p className="text-gray-500 mt-1">Joined: {moment(student?.createdAt).format("LL")}</p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-center">
        <div className="bg-indigo-100 p-4 rounded-xl shadow">
          <h2 className="text-xl font-bold text-indigo-600">{users.length}</h2>
          <p className="text-gray-600 mt-1">Total Users</p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl shadow">
          <h2 className="text-xl font-bold text-green-600">{userData.enrolledCourses}</h2>
          <p className="text-gray-600 mt-1">Enrolled Courses</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl shadow">
          <h2 className="text-xl font-bold text-yellow-600">{userData.completedCourses}</h2>
          <p className="text-gray-600 mt-1">Completed Courses</p>
        </div>
        <div className="bg-red-100 p-4 rounded-xl shadow">
          <h2 className="text-xl font-bold text-red-600">${userData.totalPayments}</h2>
          <p className="text-gray-600 mt-1">Total Payments</p>
        </div>
      </div>

      {/* Extra Info */}
      <div className="mt-8 bg-gray-50 p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">User Activity</h3>
        <ul className="text-gray-700 space-y-1">
          <li>Active Sessions: {userData.activeSessions}</li>
          <li>Courses in Progress: {userData.enrolledCourses - userData.completedCourses}</li>
          <li>Pending Payments: ${userData.totalPayments / 2}</li>
        </ul>
      </div>

      {/* Recent Courses */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Recent Courses</h3>
        <ul className="text-gray-700 space-y-1">
          {userData.recentCourses.map((c, idx) => (
            <li key={idx}>
              {c.title} -{" "}
              <span className={c.status === "completed" ? "text-green-600" : "text-orange-500"}>
                {c.status === "completed" ? "✅ Completed" : "⏳ In Progress"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Sessions */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Recent Sessions</h3>
        <ul className="text-gray-700 space-y-1">
          {userData.recentSessions.map((s, idx) => (
            <li key={idx}>
              {s.title} - {moment(s.date).fromNow()}
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Payments */}
      <div className="mt-6 mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Recent Payments</h3>
        <ul className="text-gray-700 space-y-1">
          {userData.recentPayments.map((p, idx) => (
            <li key={idx}>
              {p.course} - ${p.amount} - {moment(p.date).fromNow()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentProfile;
