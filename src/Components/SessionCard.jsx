import React from "react";
import SectionTitle from "./SectionTitle";
import useAxiosPublic from "../hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const SessionCard = () => {
  const axiosPublic = useAxiosPublic();

  const { data: sessions = [] } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await axiosPublic.get("/sessions");
      return res.data;
    },
  });

  const currentDate = new Date();

  const approvedSessions = sessions.filter(
    (session) => session.status === "approved"
  );

  const updatedSessions = approvedSessions.map((session) => {
    const regStart = new Date(session.regStartDate);
    const regEnd = new Date(session.regEndDate);
    const isOngoing = currentDate >= regStart && currentDate <= regEnd;

    return {
      ...session,
      state: isOngoing ? "Ongoing" : "Closed",
    };
  });

  return (
    <div className="my-12 px-4 md:px-8">
      <SectionTitle
        subtitle="Session Subtitle"
        title="Study Sessions"
        description="Browse all approved study sessions and join ongoing ones."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {updatedSessions.slice(0, 6).map((session) => (
          <div
            key={session._id}
            className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                {session.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {session.description}
              </p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span
                className={`px-4 py-2 rounded-full font-medium text-sm ${
                  session.state === "Ongoing"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {session.state}
              </span>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium transition">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionCard;
