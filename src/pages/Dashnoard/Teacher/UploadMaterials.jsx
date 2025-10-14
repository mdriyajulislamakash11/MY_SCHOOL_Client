import React, { useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const materialTypes = ["PDF", "Video", "Slide", "Other"];

const UploadMaterials = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedSession, setSelectedSession] = useState(null);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("PDF");
  const [showForm, setShowForm] = useState(false);

  const { data: sessions = [], isLoading, refetch } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/sessions");
      return res.data;
    },
  });

  const approvedSessions = sessions.filter(
    (session) => session.status === "approved"
  );

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedSession) {
      Swal.fire("Error", "Please select a session first", "error");
      return;
    }
    try {
      const newMaterial = {
        title,
        sessionId: selectedSession._id,
        tutorEmail: selectedSession.tutorEmail,
        image,
        link,
        description,
        type,
        uploadDate: new Date().toISOString(),
      };
      await axiosSecure.post("/materials", newMaterial);
      Swal.fire("Success", "Material uploaded successfully", "success");
      setTitle("");
      setImage("");
      setLink("");
      setDescription("");
      setType("PDF");
      setShowForm(false);
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to upload material", "error");
    }
  };

  if (isLoading)
    return <p className="text-center mt-10 text-lg font-medium">Loading sessions...</p>;

  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      <h2 className="text-4xl font-bold text-indigo-600 text-center mb-12">
        Upload Materials
      </h2>

      {/* Approved Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {approvedSessions.map((session) => (
          <div
            key={session._id}
            className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 hover:scale-105 flex flex-col"
          >
            {session.image && (
              <img
                src={session.image}
                alt={session.title}
                className="w-full h-56 object-cover rounded-2xl mb-4 border"
              />
            )}
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{session.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-4">{session.description}</p>
            <button
              onClick={() => {
                setSelectedSession(session);
                setShowForm(true);
              }}
              className="mt-auto px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl shadow-md transition transform hover:scale-105"
            >
              Upload Material
            </button>
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
                <label className="block font-semibold mb-1">Material Title:</label>
                <input
                  type="text"
                  placeholder="Enter material title"
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Image URL:</label>
                <input
                  type="text"
                  placeholder="Enter image URL (optional)"
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                {image && (
                  <img
                    src={image}
                    alt="Preview"
                    className="mt-3 w-full h-40 object-cover rounded-xl border"
                  />
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Resource Link:</label>
                <input
                  type="text"
                  placeholder="Enter resource link (Google Drive, PDF, Video, etc.)"
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Description:</label>
                <textarea
                  placeholder="Enter short description (optional)"
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Material Type:</label>
                <select
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {materialTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
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
