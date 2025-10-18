import React, { useState } from "react";
import useAuth from "../../../hook/useAuth";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const StudyMaterials = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [selectedSession, setSelectedSession] = useState(null);
  const [materials, setMaterials] = useState([]);

  console.log(materials);

  // ১️⃣ Get all booked sessions by student email
  const { data: bookedSessions = [], isLoading } = useQuery({
    queryKey: ["bookedSessions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/booked-sessions?email=${user?.email}`
      );
      return res.data;
    },
  });

  // ২️⃣ Load materials when a session is clicked
  const handleViewMaterials = async (session) => {
    setSelectedSession(session);
    const res = await axiosPublic.get(
      `/materials/session/${session.sessionId}`
    );
    setMaterials(res.data);
  };

  if (isLoading)
    return <p className="text-center mt-10">Loading sessions...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Your Booked Sessions
      </h2>

      {/* All Booked Sessions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookedSessions.map((session) => (
          <div
            key={session._id}
            className={`p-5 rounded-xl shadow-md cursor-pointer border transition-all duration-300 ${
              selectedSession?._id === session._id
                ? "bg-blue-500 text-white border-blue-600"
                : "bg-white hover:shadow-lg"
            }`}
            onClick={() => handleViewMaterials(session)}
          >
            <img
              src={session.image || "https://via.placeholder.com/300x180"}
              alt={session.sessionTitle}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h3 className="text-xl font-semibold mb-1">
              {session.sessionTitle}
            </h3>
            <p className="text-sm mb-2">
              <strong>Date:</strong>{" "}
              {new Date(session.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* Selected Session Materials */}
      {selectedSession && (
        <div className="mt-10 p-6 border rounded-lg shadow-lg bg-white">
          <h3 className="text-2xl font-semibold mb-3 text-blue-600">
            Materials for: {selectedSession.sessionTitle}
          </h3>

          {materials.length === 0 ? (
            <p className="text-gray-500">
              No materials uploaded for this session.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {materials.map((item) => (
                <div
                  key={item._id}
                  className="p-4 border rounded-lg shadow hover:shadow-lg transition-all"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-40 object-cover rounded-md"
                  />

                  <div className="flex justify-between mt-3">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline"
                    >
                      View on Drive
                    </a>

                    <a
                      href={item.image}
                      download
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudyMaterials;
