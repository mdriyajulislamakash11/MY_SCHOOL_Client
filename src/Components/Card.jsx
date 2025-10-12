import React from "react";
import useAxiosSecure from "../hook/useAxiosSecure"; // axios hook
import Swal from "sweetalert2";

const Card = ({ session, refetch }) => {
  const {
    _id,
    title,
    tutorName,
    image,
    tutorEmail,
    description,
    regStartDate,
    regEndDate,
    classStartDate,
    classEndDate,
    duration,
    fee,
    status,
  } = session;

  const axiosSecure = useAxiosSecure();

  // Resend approval request for rejected sessions
  const handleResendRequest = async () => {
    try {
      const res = await axiosSecure.patch(`/sessions/${_id}/resend`);
      if (res.data.message) {
        Swal.fire("Success", res.data.message, "success");
        refetch(); // refresh data after update
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Failed to resend request", "error");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 max-w-sm mx-auto flex flex-col">
      
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={image || "https://via.placeholder.com/400x200?text=No+Image"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {/* Status Badge */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-semibold shadow
          ${status === "pending" ? "bg-yellow-100 text-yellow-700" 
            : status === "approved" ? "bg-green-100 text-green-700" 
            : "bg-red-100 text-red-700"}`}>
          {status?.toUpperCase() || "PENDING"}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{title || "Untitled Session"}</h2>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description || "No description available."}</p>
          
          {/* Tutor Info */}
          <div className="mb-4 text-sm">
            <p className="text-gray-700 font-medium">👨‍🏫 {tutorName || "Unknown"}</p>
            <p className="text-gray-500">📧 {tutorEmail || "N/A"}</p>
          </div>

          {/* Dates, Duration & Fee */}
          <div className="grid grid-cols-2 gap-2 text-gray-600 text-xs sm:text-sm mb-4">
            <p>📅 Reg: {regStartDate || "-"} → {regEndDate || "-"}</p>
            <p>🎓 Class: {classStartDate || "-"} → {classEndDate || "-"}</p>
            <p>⏳ Duration: {duration || "-"}</p>
            <p>💰 Fee: {fee ?? 0} Tk</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 flex flex-col gap-2">
          {status === "rejected" && (
            <button
              onClick={handleResendRequest}
              className="w-full py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
            >
              Resend Request
            </button>
          )}
          <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
