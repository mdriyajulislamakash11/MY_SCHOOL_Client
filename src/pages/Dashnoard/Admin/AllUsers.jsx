import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import SectionTitle from "../../../Components/SectionTitle";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // যখন users load হবে, filteredUsers-এ set করে দাও
  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await axiosSecure.patch(`/users/${userId}`, { role: newRole });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Role Updated!",
          text: `User role has been updated to "${newRole}".`,
          timer: 1500,
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong!",
      });
    }
  };

  const handleSearch = async () => {
    if (!searchText.trim()) {
      setFilteredUsers(users); 
      return;
    }

    try {
      const res = await axiosSecure.get(`/users/search?query=${searchText}`);
      setFilteredUsers(res.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Search Failed",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="my-10">
      <SectionTitle
        title="All Users"
        description="Manage all users efficiently from this panel."
        subtitle="User Management Dashboard"
      />

      {/* 🔍 Search bar */}
      <div className="flex justify-end mb-6 px-4">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by name or email..."
          className="border rounded-lg px-4 py-2 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Search
        </button>
      </div>

      {/* 🧾 User Table */}
      <div className="overflow-x-auto bg-white shadow-xl rounded-2xl mt-8 border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white uppercase text-sm tracking-wider">
            <tr>
              <th className="py-3 px-6 rounded-tl-2xl">#</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6 rounded-tr-2xl">Role</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user._id}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-indigo-50 transition`}
              >
                <td className="py-3 px-6 font-semibold">{index + 1}</td>
                <td className="py-3 px-6 font-medium">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className={`px-3 py-1 rounded-lg border font-semibold cursor-pointer transition-all duration-200 ${
                      user.role === "admin"
                        ? "bg-green-100 text-green-700 border-green-300"
                        : user.role === "tutor"
                        ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                        : "bg-blue-100 text-blue-700 border-blue-300"
                    }`}
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
