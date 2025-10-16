import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import useAuth from "../../../hook/useAuth";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle";

const CreateNote = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ✅ Fetch notes
  const { data: notes = [], isLoading } = useQuery({
    queryKey: ["notes", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/notes?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email, // run only if email exists
  });

  // ✅ Mutation to create a new note
  const createNoteMutation = useMutation({
    mutationFn: async (noteData) => {
      const res = await axiosPublic.post("/notes", noteData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Created!",
        text: "Your note has been saved successfully.",
        confirmButtonColor: "#4f46e5",
      });
      setTitle("");
      setDescription("");
      queryClient.invalidateQueries(["notes", user?.email]); // refetch notes
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to create note. Please try again.",
        confirmButtonColor: "#e11d48",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please fill in all fields!",
        confirmButtonColor: "#4f46e5",
      });
      return;
    }

    // student info + note data
    const noteData = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png",
      title,
      description,
      date: new Date(),
    };

    createNoteMutation.mutate(noteData);
  };

  if (isLoading) return <p className="text-center mt-10">Loading notes...</p>;

  return (
    <div className="max-w-8xl mx-auto my-12 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl shadow-2xl">
      <SectionTitle
        title="Create a New Note"
        subtitle="Write your thoughts and ideas here."
        description="Keep track of your important notes and access them anytime."
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full p-3 border rounded-xl bg-gray-100 text-gray-800"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your note here..."
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            rows={5}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow hover:bg-indigo-700 transition-colors"
        >
          Create Note
        </button>
      </form>

      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4 text-indigo-700">My Notes</h3>
        {notes.length === 0 ? (
          <p className="text-gray-500">No notes yet.</p>
        ) : (
          <div className="space-y-4">
            {notes.map((note, idx) => (
              <div
                key={idx}
                className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-3">
                  <img
                    src={note.photo || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt={note.name}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-indigo-600">
                      {note.name}
                    </h4>
                    <p className="text-sm text-gray-500">{note.email}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <h5 className="text-md font-semibold text-indigo-600">
                    {note.title}
                  </h5>
                  <span className="text-sm text-gray-400">
                    {new Date(note.date).toLocaleString()}
                  </span>
                </div>

                <p className="text-gray-700">{note.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateNote;
