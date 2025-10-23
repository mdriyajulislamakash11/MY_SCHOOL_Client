import React from "react";
import Lottie from "lottie-react";
import teacherAnimation from "/public/joinTeacher.json"; // ✅ তোমার Lottie ফাইলের path ঠিক করে নিও
import { useNavigate } from "react-router-dom";

const JoinAsTeacher = () => {
const navigate = useNavigate();

  const handleJoinAsTutor = () => {
    navigate("/join-tutor");
  }

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row  items-center justify-between gap-10">
        
        {/* ✅ Left Side Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Become an Educator on Study-Buddy
          </h2>
          <p className="text-gray-600 mb-4">
            Share your knowledge, inspire learners worldwide, and earn while doing what you love. Join a thriving community of passionate teachers committed to making a difference.
          </p>

          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>Connect with a global audience of students.</li>
            <li>Access intuitive tools to design engaging courses.</li>
            <li>Earn competitive compensation for your efforts.</li>
          </ul>

          <button onClick={handleJoinAsTutor} className="bg-green-700 text-white font-medium px-6 py-2 rounded-md  transition-all w-fit">
            Join as a Teacher
          </button>
        </div>

        {/* ✅ Right Side Lottie Animation */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Lottie
            animationData={teacherAnimation}
            loop={true}
            className="w-full md:w-3/4"
          />
        </div>

      </div>
    </section>
  );
};

export default JoinAsTeacher;
