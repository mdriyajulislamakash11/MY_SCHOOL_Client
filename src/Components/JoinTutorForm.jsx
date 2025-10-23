import React from 'react';
import useAuth from '../hook/useAuth';

const JoinTutorForm = () => {
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Form submitted:", data);
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-50 shadow-2xl rounded-3xl p-10">
      {/* Heading */}
      <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-3">
        Teach on <span className="text-indigo-500">Study Buddy</span>
      </h2>
      <p className="text-gray-600 text-center mb-10 max-w-xl mx-auto">
        Join our passionate community of tutors and share your expertise with thousands of eager learners.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-gray-800 font-semibold mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            defaultValue={user?.displayName || ""}
            className="w-full border border-gray-300 bg-gray-100 text-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            readOnly
          />
        </div>

        {/* Photo */}
        <div>
          <label className="block text-gray-800 font-semibold mb-2">Profile Photo</label>
          <div className="flex justify-center">
            <img
              className="w-32 h-32 rounded-full border-4 border-indigo-200 shadow-md object-cover"
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt="User Avatar"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-800 font-semibold mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            defaultValue={user?.email || ""}
            className="w-full border border-gray-300 bg-gray-100 text-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            readOnly
          />
        </div>

        {/* Experience Dropdown */}
        <div>
          <label className="block text-gray-800 font-semibold mb-2">Teaching Experience</label>
          <select
            name="experience"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="">Select your experience level</option>
            <option value="1-2 years">Beginner</option>
            <option value="3-5 years">Intermediate</option>
            <option value="5+ years">Expert</option>
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-gray-800 font-semibold mb-2">Professional Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Senior Web Developer, Data Analyst"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-gray-800 font-semibold mb-2">Teaching Category</label>
          <select
            name="category"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="">Choose your teaching category</option>
            <option value="Web Development">Web Development</option>
            <option value="Data Science">Data Science</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Business">Business</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinTutorForm;
