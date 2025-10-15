import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const ViewMyMaterials = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const imgHostingKey = import.meta.env.VITE_IMGBB_KEY;
  const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;

  // Fetch materials for this tutor
  const {
    data: materials = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myMaterials", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/materials/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <p className="text-center mt-10 text-lg font-medium">
        Loading materials...
      </p>
    );

  if (!materials.length)
    return (
      <p className="text-center mt-10 text-lg font-medium">
        No materials found.
      </p>
    );

  // Handle delete
  const handleDelete = async (materialId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/materials/${materialId}`);
        Swal.fire("Deleted!", "Material has been deleted.", "success");
        refetch();
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete material.", "error");
      }
    }
  };

  // Handle edit
  const handleEdit = (material) => {
    setEditingMaterial(material);
    setTitle(material.title);
    setLink(material.link);
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = editingMaterial.image;

      // যদি নতুন image select করা হয়, তাহলে ImgBB তে আপলোড করবো
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const uploadRes = await fetch(imgHostingApi, {
          method: "POST",
          body: formData,
        });
        const imgData = await uploadRes.json();
        if (imgData.success) {
          imageUrl = imgData.data.display_url;
        }
      }

      const updatedMaterial = { title, link, image: imageUrl };

      await axiosSecure.patch(
        `/materials/${editingMaterial._id}`,
        updatedMaterial
      );
      Swal.fire(
        "Updated!",
        "Material has been updated successfully.",
        "success"
      );
      setEditingMaterial(null);
      setTitle("");
      setLink("");
      setImageFile(null);
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update material.", "error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      <h2 className="text-4xl font-bold text-indigo-600 text-center mb-12">
        My Uploaded Materials
      </h2>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {materials.map((material) => (
          <div
            key={material._id}
            className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 hover:scale-105 flex flex-col"
          >
            {material.image && (
              <img
                src={material.image}
                alt={material.title}
                className="w-full h-48 object-cover rounded-2xl mb-4 border"
              />
            )}
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {material.title}
            </h3>
            <p className="text-gray-500 text-sm mb-2">
              📚 Session: {material.sessionTitle || "N/A"}
            </p>
            <p className="text-gray-500 text-sm mb-2">
              👨‍🏫 Tutor: {material.tutorName || material.tutorEmail || "Unknown"}
            </p>
            <p className="text-gray-500 text-sm mb-2">
              🗓 Uploaded:{" "}
              {material.uploadDate
                ? new Date(material.uploadDate).toLocaleDateString()
                : "-"}
            </p>
            {material.link && (
              <a
                href={material.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-center font-semibold transition mb-2"
              >
                View Resource
              </a>
            )}

            {/* Edit & Delete Buttons */}
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => handleEdit(material)}
                className="flex-1 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(material._id)}
                className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-start pt-24 z-50">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl relative border border-indigo-200">
            <button
              onClick={() => setEditingMaterial(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
              ✏️ Edit Material
            </h3>

            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  Material Title:
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter material title"
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  Upload New Image (optional):
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {editingMaterial.image && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-500 mb-1">Current Image:</p>
                    <img
                      src={editingMaterial.image}
                      alt="Current"
                      className="w-full h-40 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  Google Drive / Resource Link:
                </label>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Enter resource link"
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl shadow-md transition transform hover:scale-105"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditingMaterial(null)}
                  className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl shadow-md transition transform hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewMyMaterials;
