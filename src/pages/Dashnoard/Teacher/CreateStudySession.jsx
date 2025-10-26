import React, { useState } from "react";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Swal from "sweetalert2";

const CreateStudySession = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleCreateSession = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const newSession = {
      title: form.title.value,
      tutorName: user?.displayName,
      tutorEmail: user?.email,
      description: form.description.value,
      regStartDate: form.regStartDate.value,
      regEndDate: form.regEndDate.value,
      classStartDate: form.classStartDate.value,
      classEndDate: form.classEndDate.value,
      duration: form.duration.value,
      fee: 0,
      status: "pending",
      image: form.image.value,
    };

    console.log(newSession);

    axiosSecure
      .post("/create-sessions", newSession)
      .then((response) => {
        console.log("Session created successfully:", response.data);
        setLoading(false);
        form.reset();
        Swal.fire("Success", "Session created successfully!", "success");
      })
      .catch((error) => {
        console.error("Error creating session:", error);
        setLoading(false);
        Swal.fire("Error", "Failed to create session.", "error");
      });
  };

  return (
    <div className="md:max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Create Study Session
      </h2>
      <form onSubmit={handleCreateSession} className="space-y-6">
        {/* Session Title */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Session Title
          </label>
          <input
            type="text"
            name="title"
            required
            placeholder="Enter session title"
            className="input input-bordered w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Tutor Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Tutor Name
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100 rounded-lg border-gray-300"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Tutor Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100 rounded-lg border-gray-300"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            required
            placeholder="Write a short description"
            className="textarea textarea-bordered w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Registration Start Date
            </label>
            <input
              type="date"
              name="regStartDate"
              required
              className="input input-bordered w-full rounded-lg border-gray-300"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Registration End Date
            </label>
            <input
              type="date"
              name="regEndDate"
              required
              className="input input-bordered w-full rounded-lg border-gray-300"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Class Start Date
            </label>
            <input
              type="date"
              name="classStartDate"
              required
              className="input input-bordered w-full rounded-lg border-gray-300"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Class End Date
            </label>
            <input
              type="date"
              name="classEndDate"
              required
              className="input input-bordered w-full rounded-lg border-gray-300"
            />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Session Duration
          </label>
          <input
            type="text"
            name="duration"
            placeholder="e.g. 2 hours"
            className="input input-bordered w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            placeholder="Enter image URL"
            required
            className="input input-bordered w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Fee and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Registration Fee
            </label>
            <input
              type="number"
              value={0}
              readOnly
              className="input input-bordered w-full bg-gray-100 rounded-lg border-gray-300"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Status
            </label>
            <input
              type="text"
              value="pending"
              readOnly
              className="input input-bordered w-full bg-gray-100 rounded-lg border-gray-300"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full py-3 text-lg font-semibold"
          >
            {loading ? "Submitting..." : "Create Session"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStudySession;
