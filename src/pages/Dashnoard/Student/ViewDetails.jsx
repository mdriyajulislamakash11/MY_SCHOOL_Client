import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReviewSection from "./ReviewSection";
import useAxiosPublic from "../../../hook/useAxiosPublic";

const ViewDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const {
    data: session = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["sessionDetails", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/booked-sessions/${id}`);
      return res.data;
    },
  });

  console.log(session);

  if (isLoading)
    return <p className="text-center text-lg mt-10">Loading session details...</p>;

  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">
        Error: {error.message}
      </p>
    );

  return (
    <div className="max-w-8xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">{session.title}</h2>
      <img
        src={session.image}
        alt={session.title}
        className="rounded-xl w-full mb-4"
      />
      <p><strong>Session Title:</strong> {session.sessionTitle}</p>
      <p><strong>Email:</strong> {session.userEmail}</p>
      <p><strong>Duration:</strong> {session.date}</p>
      <p><strong>Fee:</strong> ${session?.amount}</p>
      <p><strong>Description:</strong> {session.description}</p>

      {/* 🔹 Review Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3">Reviews & Ratings</h3>
        <ReviewSection sessionId={session._id} />
      </div>
    </div>
  );
};

export default ViewDetails;
