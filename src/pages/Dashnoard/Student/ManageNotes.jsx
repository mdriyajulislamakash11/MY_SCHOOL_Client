import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "../../../hook/useAuth";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import Swal from "sweetalert2";

const ManageNotes = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [editingNote, setEditingNote] = useState(null); // যেই note update হবে

  const {
    data: notes = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["notes", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/notes?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(notes);

  if (isLoading) return <p className="text-center mt-10">Loading notes...</p>;

  const handleEdit = (note) => {
    setEditingNote(note);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const updatedNote = {
      name: editingNote.name,
      email: editingNote.email,
      title: form.title.value,
      description: form.description.value,
      date: new Date(),
    };

    axiosPublic
      .put(`/notes/${editingNote._id}`, updatedNote)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success", "Note updated successfully", "success");
          setEditingNote(null);
          refetch();
        } else {
          Swal.fire("Error", "Failed to update note", "error");
        }
      })
      .catch((err) => {
        Swal.fire("Error", "Failed to update note", "error");
        console.error(err);
      });
  };

  const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, keep it"
  }).then((result) => {
    if (result.isConfirmed) {
      axiosPublic.delete(`/notes/${id}`)
        .then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your note has been deleted.",
              icon: "success"
            });
            refetch();
          }
        })
        .catch(() => {
          Swal.fire("Error", "Failed to delete note", "error");
        });
    }
  });
};


  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Your Notes ({notes.length})
      </h2>

      {/* Update / Edit Form */}
      {editingNote && (
        <form onSubmit={handleSubmit} className="mb-6">
          <input
            name="title"
            type="text"
            defaultValue={editingNote.title}
            placeholder="Title"
            className="border p-2 w-full mb-2"
          />
          <textarea
            name="description"
            defaultValue={editingNote.description}
            placeholder="Description"
            className="border p-2 w-full mb-2"
          ></textarea>
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Update Note
          </button>
        </form>
      )}

      {notes.length === 0 ? (
        <p className="text-center text-gray-500">No notes found.</p>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note._id} className="p-4 border rounded bg-white">
              <p>
                <strong>Name:</strong> {note.name}
              </p>
              <p>
                <strong>Email:</strong> {note.email}
              </p>
              <p>
                <strong>Title:</strong> {note.title}
              </p>
              <p>
                <strong>Description:</strong> {note.description}
              </p>
              <p>
                <strong>Date:</strong> {new Date(note.date).toLocaleString()}
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(note)}
                  className="px-2 py-1 bg-yellow-400 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageNotes;
