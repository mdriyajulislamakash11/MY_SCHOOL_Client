import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import { FaStar } from "react-icons/fa";
import moment from "moment";

const TeacherProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;

  // Fetch teacher info
  const { data: teacher, isLoading: loadingTeacher } = useQuery({
    queryKey: ["teacher", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${email}`);
      return res.data;
    },
  });

  // Fetch teacher's uploaded materials
  const { data: materials = [], isLoading: loadingMaterials } = useQuery({
    queryKey: ["materials", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/materials/by-email/${email}`);
      return res.data;
    },
  });

  if (!email) return <p className="text-center mt-10">No user logged in</p>;
  if (loadingTeacher || loadingMaterials)
    return <p className="text-center mt-10">Loading...</p>;

  // Generate stars for rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i < rating ? "text-yellow-400" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-3xl shadow-lg mt-10">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt={teacher?.name}
          className="w-36 h-36 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800">{teacher?.name}</h1>
          <p className="text-gray-600 mb-1">📧 {teacher?.email}</p>
          <p className="text-gray-600 mb-1">📞 {teacher?.phone || "N/A"}</p>
          <p className="text-gray-600 mb-1">📚 Subject: {teacher?.subject || "N/A"}</p>
          <p className="text-gray-600 mb-1">
            🏫 Experience: {teacher?.experience || 3} years
          </p>
          <p className="text-gray-600 mb-1">
            👨‍🎓 Total Students: {teacher?.totalStudents || 0}
          </p>
          <p className="text-gray-600 mb-1">
            🗓 Joined: {teacher?.createdAt ? moment(teacher.createdAt).format("LL") : "N/A"}
          </p>
          <p className="text-gray-500 mt-3">{teacher?.bio || "No bio available."}</p>
          <div className="flex items-center mt-2">{renderStars(teacher?.rating || 0)}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10 text-center">
        <div className="bg-indigo-50 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-indigo-600">{materials.length}</h2>
          <p className="text-gray-600 mt-1">Materials Uploaded</p>
        </div>
        <div className="bg-green-50 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-green-600">{teacher?.totalSessions || 26}+</h2>
          <p className="text-gray-600 mt-1">Sessions Created</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-yellow-600">{teacher?.rating || 1180}+</h2>
          <p className="text-gray-600 mt-1">Average Rating</p>
        </div>
        <div className="bg-pink-50 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-pink-600">{teacher?.totalStudents || 720}+</h2>
          <p className="text-gray-600 mt-1">Total Students</p>
        </div>
      </div>

      {/* Materials List */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Uploaded Materials</h3>
        {materials.length === 0 ? (
          <p className="text-gray-500">No materials uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {materials.map((mat) => (
              <div
                key={mat._id}
                className="p-4 bg-gray-50 rounded-xl shadow hover:shadow-md transition flex flex-col justify-between"
              >
                <h4 className="font-semibold text-gray-700 mb-2">📄 {mat.title}</h4>
                <p className="text-gray-500 text-sm">{mat.description || "No description."}</p>
                {mat.link && (
                  <a
                    href={mat.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 text-blue-600 hover:underline"
                  >
                    View Material
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherProfile;
