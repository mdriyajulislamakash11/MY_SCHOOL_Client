import React, { useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle";


const UploadMaterials = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedSession, setSelectedSession] = useState(null);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch all sessions
  const { data: sessions = [], isLoading, refetch } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/sessions");
      return res.data;
    },
  });

  // Filter approved sessions
  const approvedSessions = sessions.filter(
    (session) => session.status === "approved"
  );

  // Image upload to ImgBB
  const handleImageUpload = async (imgFile) => {
    const formData = new FormData();
    formData.append("image", imgFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data?.data?.url;
  };

  // Handle material form submit
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedSession) {
      Swal.fire("Error", "Please select a session first", "error");
      return;
    }

    try {
      let imgURL = "";
      if (image) {
        imgURL = await handleImageUpload(image);
      }

      const newMaterial = {
        title,
        sessionId: selectedSession._id,
        tutorEmail: selectedSession.tutorEmail,
        image: imgURL,
        link,
      };

      await axiosSecure.post("/materials", newMaterial);

      Swal.fire("Success", "Material uploaded successfully!", "success");

      // Reset form
      setTitle("");
      setLink("");
      setImage(null);
      setShowForm(false);
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to upload material", "error");
    }
  };

  if (isLoading)
    return (
      <p className="text-center mt-10 text-lg font-medium">
        Loading sessions...
      </p>
    );

  return (
    <div className="md:max-w-8xl mx-auto my-12 px-4">
      <SectionTitle
        title="Upload Materials"
        subtitle="Upload your teaching materials for approved sessions"
        description="Use the form below to upload materials for your approved sessions."
      />

      {/* Approved Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {approvedSessions.map((session) => (
          <div
            key={session._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 max-w-sm mx-auto flex flex-col"
          >
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src={
                  session.image ||
                  "https://via.placeholder.com/400x200?text=No+Image"
                }
                alt={session.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div
                className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-semibold shadow
                ${
                  session.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                APPROVED
              </div>
            </div>

            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                  {session.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {session.description}
                </p>
                <div className="mb-4 text-sm">
                  <p className="text-gray-700 font-medium">
                    👨‍🏫 {session.tutorName}
                  </p>
                  <p className="text-gray-500">📧 {session.tutorEmail}</p>
                </div>
              </div>

              <div className="mt-3">
                <button
                  onClick={() => {
                    setSelectedSession(session);
                    setShowForm(true);
                  }}
                  className="w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Upload Material
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {showForm && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-start pt-24 z-50">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl relative border border-indigo-200">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
              Upload Material for "{selectedSession.title}"
            </h3>

            <form onSubmit={handleUpload} className="space-y-5">
              <div>
                <label className="block font-semibold mb-1">Title:</label>
                <input
                  type="text"
                  placeholder="Enter material title"
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  Study Session ID:
                </label>
                <input
                  type="text"
                  readOnly
                  value={selectedSession._id}
                  className="w-full p-3 border rounded-xl bg-gray-100"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  Tutor Email:
                </label>
                <input
                  type="text"
                  readOnly
                  value={selectedSession.tutorEmail}
                  className="w-full p-3 border rounded-xl bg-gray-100"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full border rounded-xl p-2"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  Google Drive Link:
                </label>
                <input
                  type="text"
                  placeholder="Paste your Google Drive link"
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl shadow-md transition transform hover:scale-105"
                >
                  Upload
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
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

export default UploadMaterials;
