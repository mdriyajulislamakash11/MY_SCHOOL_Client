import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaDollarSign, FaUserGraduate } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Swal from "sweetalert2";
import useAxiosSecure from "../hook/useAxiosSecure";
import useAuth from "../hook/useAuth";

const SessionDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [session, setSession] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [role, setRole] = useState(null);
  const [isRegistrationClosed, setIsRegistrationClosed] = useState(false);

  console.log(reviews);

  // ✅ Fetch data
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axiosSecure.get(`/sessions/${id}`);
        setSession(res.data);
        const now = new Date();
        const regEnd = new Date(res.data.regEndDate);
        if (now > regEnd) setIsRegistrationClosed(true);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axiosSecure.get(`/reviews`);
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchUserRole = async () => {
      try {
        if (user?.email) {
          const res = await axiosSecure.get(`/users/role/${user.email}`);
          setRole(res.data.role);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchSession();
    fetchReviews();
    fetchUserRole();
  }, [id, axiosSecure, user]);

  // redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!session)
    return <p className="text-center mt-10 text-lg font-medium">Loading session details...</p>;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <AiFillStar key={i} className="text-yellow-400 inline" />
      ) : (
        <AiOutlineStar key={i} className="text-gray-300 inline" />
      )
    );
  };

  // ✅ Handle Free Booking
  const handleBookFree = async () => {
    try {
      const res = await axiosSecure.post("/booked-sessions", {
        sessionId: session._id,
        sessionTitle: session.title,
        userEmail: user.email,
        amount: session.amount,
        date: new Date(),
      });
      if (res.data.insertedId) {
        Swal.fire("Success!", "Session booked successfully!", "success");
        navigate("/dashboard/booked-sessions");
      }
    } catch (err) {
      Swal.fire("Error!", "Booking failed!", "error");
    }
  };

  // ✅ Button disable condition ঠিক করা
  const isButtonDisabled =
    !user || role === "admin" || role === "teacher" || isRegistrationClosed;

  return (
    <div className="max-w-6xl mx-auto my-12 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl shadow-2xl">
      {/* Title */}
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

      {/* Dates */}
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
           {reviews.map((r, index) => (
              <div key={index} className="bg-white p-4 rounded-2xl shadow-md flex gap-4">
                {/* Student Photo */}
                {r.studentPhoto && (
                  <img
                    src={r.studentPhoto}
                    alt={r.studentName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}

                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <p className="font-semibold">{r.studentName}</p>
                      <p className="text-sm text-gray-500">{r.studentEmail}</p>
                    </div>
                    <div>{renderStars(r.rating)}</div>
                  </div>
                  <p className="text-gray-700">{r.review}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(r.date).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>

      {/* ✅ Book / Payment Button */}
      <div className="flex justify-center">
        <button
          onClick={() => {
            if (isButtonDisabled) return;
            if (session.amount > 0) {
              navigate(`/payment/${session._id}`);
            } else {
              handleBookFree();
            }
          }}
          disabled={isButtonDisabled}
          className={`px-10 py-4 font-bold text-white rounded-2xl shadow-xl transition-transform transform hover:scale-105 ${
            isButtonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500"
          }`}
        >
          {isRegistrationClosed
            ? "Registration Closed"
            : role === "admin" || role === "teacher"
            ? "Only Students Can Book"
            : session.amount > 0
            ? `Pay $${session.amount} & Book`
            : "Book Now"}
        </button>
      </div>
    </div>
  );
};

export default SessionDetails;
