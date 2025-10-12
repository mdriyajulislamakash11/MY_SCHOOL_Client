import React, { useState } from "react";
import SectionTitle from "../../../Components/SectionTitle";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const AllSessions = () => {
  const axiosSecure = useAxiosSecure();
  const [modalData, setModalData] = useState(null);
  const [updateData, setUpdateData] = useState(null);
  const [amount, setAmount] = useState(0);
  const [isFree, setIsFree] = useState(true);

  // ✅ Fetch all sessions
  const { data: sessions = [], refetch } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/sessions");
      return res.data;
    },
  });

  // ✅ Approve button → open modal
  const handleApprove = (session) => {
    setModalData(session);
    setIsFree(true);
    setAmount(0);
  };

  // ✅ Reject button → delete pending session
  const handleReject = async (sessionId) => {
    try {
      await axiosSecure.delete(`/sessions/${sessionId}`);
      toast.success("Session rejected successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to reject session.");
    }
  };

  // ✅ Confirm approve → update session status
  const handleConfirmApprove = async () => {
    try {
      await axiosSecure.patch(`/sessions/${modalData._id}/status`, {
        status: "approved",
        amount: isFree ? 0 : amount,
        type: isFree ? "Free" : "Paid",
      });

      toast.success("Session approved successfully!");
      setModalData(null);
      refetch();
    } catch (error) {
      toast.error("Failed to approve session.");
    }
  };

  // ✅ Update approved session → open update modal
  const handleUpdate = (session) => {
    setUpdateData(session);
    setIsFree(session.type === "Free");
    setAmount(session.amount);
  };

  // ✅ Confirm Update
  const handleConfirmUpdate = async () => {
    try {
      await axiosSecure.patch(`/sessions/approval/${updateData._id}`, {
        type: isFree ? "Free" : "Paid",
        amount: isFree ? 0 : amount,
      });

      toast.success("Session updated successfully!");
      setUpdateData(null);
      refetch();
    } catch (error) {
      toast.error("Failed to update session.");
    }
  };

  // ✅ Delete approved session
  const handleDelete = async (sessionId) => {
    try {
      await axiosSecure.delete(`/sessions/${sessionId}`);
      toast.success("Session deleted successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to delete session.");
    }
  };

  const pendingSessions = sessions.filter((s) => s.status === "pending");
  const approvedSessions = sessions.filter((s) => s.status === "approved");

  return (
    <div className="p-6">
      <SectionTitle
        title="All Study Sessions"
        description="Manage and review all study sessions created by tutors."
        subtitle="Admin Control Panel"
      />

      {/* ---------------- Pending Sessions ---------------- */}
      <h2 className="text-2xl font-bold mt-6 mb-3 text-blue-700">
        Pending Sessions
      </h2>
      <div>
        {pendingSessions.length === 0 && (
          <p className="text-gray-500">No pending sessions found.</p>
        )}

        {pendingSessions.map((session) => (
          <div
            key={session._id}
            className="bg-white border rounded-lg p-4 mb-3 flex justify-between items-center shadow-sm"
          >
            <div>
              <p className="font-semibold text-lg">{session.title}</p>
              <p className="text-sm text-gray-600">{session.tutorName}</p>
            </div>
            <div>
              <button
                className="btn btn-success btn-sm mr-2"
                onClick={() => handleApprove(session)}
              >
                Approve
              </button>
              <button
                className="btn btn-error btn-sm"
                onClick={() => handleReject(session._id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- Approved Sessions ---------------- */}
      <h2 className="text-2xl font-bold mt-10 mb-3 text-green-700">
        Approved Sessions
      </h2>
      <div>
        {approvedSessions.length === 0 && (
          <p className="text-gray-500">No approved sessions found.</p>
        )}

        {approvedSessions.map((session) => (
          <div
            key={session._id}
            className="bg-green-50 border rounded-lg p-4 mb-3 flex justify-between items-center shadow-sm"
          >
            <div>
              <p className="font-semibold text-lg">{session.title}</p>
              <p className="text-sm text-gray-600">{session.tutorName}</p>
              <p className="text-sm text-gray-800 mt-1">
                Type: <span className="font-semibold">{session.type}</span> —
                Amount: <span className="font-semibold">{session.amount}৳</span>
              </p>
            </div>
            <div>
              <button
                className="btn btn-primary btn-sm mr-2"
                onClick={() => handleUpdate(session)}
              >
                Update
              </button>
              <button
                className="btn btn-error text-white btn-sm"
                onClick={() => handleDelete(session._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- Approve Modal ---------------- */}
      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Approve Session</h3>
            <p className="mb-3 text-gray-700">
              <strong>{modalData.title}</strong> by {modalData.tutorName}
            </p>

            <div className="mb-4 flex items-center">
              <label className="mr-4">
                <input
                  type="radio"
                  name="type"
                  checked={isFree}
                  onChange={() => setIsFree(true)}
                />{" "}
                Free
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  checked={!isFree}
                  onChange={() => setIsFree(false)}
                />{" "}
                Paid
              </label>
            </div>

            {!isFree && (
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                placeholder="Enter amount (৳)"
                className="border p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}

            <div className="flex justify-end">
              <button
                className="btn btn-secondary btn-sm mr-2"
                onClick={() => setModalData(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-success btn-sm"
                onClick={handleConfirmApprove}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Update Modal ---------------- */}
      {updateData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Update Session</h3>
            <p className="mb-3 text-gray-700">
              <strong>{updateData.title}</strong> by {updateData.tutorName}
            </p>

            <div className="mb-4 flex items-center">
              <label className="mr-4">
                <input
                  type="radio"
                  name="updateType"
                  checked={isFree}
                  onChange={() => setIsFree(true)}
                />{" "}
                Free
              </label>
              <label>
                <input
                  type="radio"
                  name="updateType"
                  checked={!isFree}
                  onChange={() => setIsFree(false)}
                />{" "}
                Paid
              </label>
            </div>

            {!isFree && (
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                placeholder="Enter new amount (৳)"
                className="border p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}

            <div className="flex justify-end">
              <button
                className="btn btn-secondary btn-sm mr-2"
                onClick={() => setUpdateData(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-success btn-sm"
                onClick={handleConfirmUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllSessions;
