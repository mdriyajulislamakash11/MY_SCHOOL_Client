import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const AllMaterials = () => {
  const axiosSecure = useAxiosSecure();

  // ✅ React Query দিয়ে data fetch
  const {
    data: materials = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allMaterials"],
    queryFn: async () => {
      const res = await axiosSecure.get("/materials");
      return res.data;
    },
  });

  // ✅ Delete handler
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/materials/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "The material has been removed.", "success");
        refetch(); // ✅ ডিলিটের পর নতুন ডেটা ফেচ
      }
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        Loading materials...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">
        All Uploaded Materials
      </h2>

      {materials.length === 0 ? (
        <p className="text-center text-gray-500">No materials found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th>#</th>
                <th>Title</th>
                <th>Tutor Email</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((mat, index) => (
                <tr key={mat._id} className="hover:bg-gray-50">
                  <td>{index + 1}</td>
                  <td>{mat?.title}</td>
                  <td>{mat?.tutorEmail}</td>
                  <td>{new Date(mat?.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(mat._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllMaterials;
