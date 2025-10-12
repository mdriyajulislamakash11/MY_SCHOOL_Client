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
    <div className="my-10">
      <SectionTitle
        subtitle="Session Subtitle"
        title="Study Session"
        description="Session Description"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {updatedSessions.slice(0, 6).map((session) => (
          <div
            key={session._id}
            className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition"
          >
            <h2 className="text-xl font-bold mb-2">{session.title}</h2>
            <p className="text-gray-600 mb-4">{session.description}</p>

            <div className="flex justify-between items-center">
              <button
                className={`px-4 py-2 rounded font-medium ${
                  session.state === "Ongoing"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {session.state}
              </button>

              <button className="bg-blue-500 text-white px-4 py-2 rounded">
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
