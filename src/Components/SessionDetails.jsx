import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hook/useAxiosSecure";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaUserGraduate,
} from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const SessionDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [reviews, setReviews] = useState([]);

  console.log(session);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axiosSecure.get(`/sessions/${id}`);
        setSession(res.data);
      } catch (error) {
        console.error("Failed to fetch session details:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axiosSecure.get(`/reviews?sessionId=${id}`);
        setReviews(res.data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchSession();
    fetchReviews();
  }, [id, axiosSecure]);

  if (!session)
    return (
      <p className="text-center mt-10 text-lg font-medium">
        Loading session details...
      </p>
    );

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <AiFillStar key={i} className="text-yellow-400 inline" />
        ) : (
          <AiOutlineStar key={i} className="text-gray-300 inline" />
        )
      );
    }
    return stars;
  };

  return (
    <div className="max-w-6xl mx-auto my-12 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl shadow-2xl">
      {/* image */}
      {/* <div className="mb-10">
        <img
          src={
            session.image || "https://via.placeholder.com/800x400?text=No+Image"
          }
          alt={session.title}
          className="w-full h-auto rounded-2xl shadow-lg"
        />
      </div> */}

      {/* Session Hero */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-3">
          {session.title}
        </h1>
        <p className="text-gray-600 text-lg">{session.description}</p>
      </div>

      {/* Tutor Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
        {session.tutorImage && (
          <img
            src={session.tutorImage}
            alt={session.tutorName}
            className="w-40 h-40 rounded-full border-4 border-indigo-400 shadow-lg object-cover"
          />
        )}
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg">
          <p className="text-xl font-semibold mb-2">
            <FaUserGraduate className="inline mr-2 text-indigo-500" /> Tutor:{" "}
            {session.tutorName}
          </p>
          <p className="text-gray-700 mb-2">Email: {session.tutorEmail}</p>
          <p className="text-gray-700">Duration: {session.duration}</p>
          <p className="text-gray-700">
            Fee: {session.amount === 0 ? "Free" : `$${session.amount}`}
          </p>
          <p
            className={`mt-2 font-bold ${
              session.status === "approved"
                ? "text-green-600"
                : session.status === "pending"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            Status: {session.status.toUpperCase()}
          </p>
        </div>
      </div>

      {/* Session Dates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-5 rounded-2xl shadow-md flex items-center gap-3">
          <FaCalendarAlt className="text-indigo-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Registration</p>
            <p className="font-semibold">
              {new Date(session.regStartDate).toLocaleDateString()} -{" "}
              {new Date(session.regEndDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-md flex items-center gap-3">
          <FaClock className="text-indigo-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Class Time</p>
            <p className="font-semibold">
              {new Date(session.classStartDate).toLocaleDateString()} -{" "}
              {new Date(session.classEndDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-md flex items-center gap-3">
          <FaDollarSign className="text-indigo-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Fee</p>
            <p className="font-semibold">
              {session.amount === 0 ? "Free" : `$${session.amount}`}
            </p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mb-10">
        <h3 className="text-3xl font-semibold text-indigo-700 mb-5">
          Student Reviews
        </h3>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((rev, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold">{rev.studentName}</p>
                  <div>{renderStars(rev.rating)}</div>
                </div>
                <p className="text-gray-600">{rev.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>

      {/* Book / Payment Button */}
      {session.status === "approved" && session.amount !== undefined && (
        <div className="flex justify-center">
          <button
            onClick={() => {
              if (session.amount > 0) {
                navigate(`/payment/${session._id}`);
              } else {
                navigate(`/book-session/${session._id}`);
              }
            }}
            className={`px-10 py-4 font-bold text-white rounded-2xl shadow-xl transition-transform transform hover:scale-105 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500`}
          >
            {session.fee > 0 ? `Pay $${session.fee} & Book` : "Book Now"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SessionDetails;
