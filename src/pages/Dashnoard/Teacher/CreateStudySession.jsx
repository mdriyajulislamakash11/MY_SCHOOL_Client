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
      fee: 0, // default (only admin can change later)
      status: "pending", // default
    };

    axiosSecure.post("/create-sessions", newSession)
      .then((response) => {
        console.log("Session created successfully:", response.data);
        setLoading(false);
        form.reset();
        // Show success message or redirect
        Swal.fire("Success", "Session created successfully!", "success");
      })
      .catch((error) => {
        console.error("Error creating session:", error);
        setLoading(false);
        // Show error message
        Swal.fire("Error", "Failed to create session.", "error");
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Study Session</h2>
      <form onSubmit={handleCreateSession} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium">Session Title</label>
          <input
            type="text"
            name="title"
            required
            placeholder="Enter session title"
            className="input input-bordered w-full"
          />
        </div>

        {/* Tutor Name */}
        <div>
          <label className="block font-medium">Tutor Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Tutor Email */}
        <div>
          <label className="block font-medium">Tutor Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            required
            placeholder="Write a short description"
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Registration Start Date</label>
            <input type="date" name="regStartDate" required className="input input-bordered w-full" />
          </div>
          <div>
            <label className="block font-medium">Registration End Date</label>
            <input type="date" name="regEndDate" required className="input input-bordered w-full" />
          </div>
          <div>
            <label className="block font-medium">Class Start Date</label>
            <input type="date" name="classStartDate" required className="input input-bordered w-full" />
          </div>
          <div>
            <label className="block font-medium">Class End Date</label>
            <input type="date" name="classEndDate" required className="input input-bordered w-full" />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block font-medium">Session Duration</label>
          <input
            type="text"
            name="duration"
            placeholder="e.g. 2 hours"
            className="input input-bordered w-full"
          />
        </div>

        {/* Registration Fee (Read-only) */}
        <div>
          <label className="block font-medium">Registration Fee</label>
          <input
            type="number"
            value={0}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Default Status */}
        <div>
          <label className="block font-medium">Status</label>
          <input
            type="text"
            value="pending"
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Submitting..." : "Create Session"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStudySession;
