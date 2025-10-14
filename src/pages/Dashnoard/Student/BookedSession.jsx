import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import useAxiosPublic from "../../../hook/useAxiosPublic";

const BookedSession = () => {
  const axiosPublic = useAxiosPublic();
  const { user, loading } = useAuth();

  const {
    data: bookedSessions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookedSessions", user?.email],
    enabled: !!user?.email, 
    queryFn: async () => {
      const res = await axiosPublic.get(`/booked-sessions?email=${user?.email}`);
      return res.data;
    },
  });

  console.log(bookedSessions);

  if (isLoading) return loading; 
  if (isError)
    return (
      <div className="text-center text-red-500 mt-10">
        Error loading sessions: {error.message}
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-5 text-center">
        Your Booked Sessions ({bookedSessions.length})
      </h2>

      {bookedSessions.length === 0 ? (
        <p className="text-center text-gray-500">No booked sessions found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookedSessions.map((session) => (
            <div
              key={session._id}
              className="bg-white shadow-lg rounded-xl p-5 border border-gray-200 hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="font-bold text-lg mb-2">{session.sessionTitle}</h3>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Amount:</span> ${session.amount}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Transaction ID:</span>{" "}
                {session.transactionId}
              </p>
              <p className="text-gray-600 mb-3">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(session.date).toLocaleDateString()}
              </p>

              <button
                onClick={() =>
                  console.log("View details for:", session.sessionId)
                }
                className="btn btn-outline btn-sm w-full"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedSession;
