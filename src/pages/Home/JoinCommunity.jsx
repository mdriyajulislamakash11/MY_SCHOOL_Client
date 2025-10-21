import React from "react";
import Lottie from "lottie-react";
import communityAnimation from "/public/contact.json"; // তোমার Lottie JSON path
import { useNavigate } from "react-router-dom";

const JoinCommunity = () => {
    const navigate = useNavigate();

    const handleAllSession = () => {
        navigate('/allSessions');
    }

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        {/* Left: Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Join Our Thriving Community
          </h2>

          <p className="text-gray-600 mb-4">
            Become a part of our active learning community — connect with learners and tutors, share knowledge, and grow together.
          </p>

          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li> <b>10,000+</b> active students</li>
            <li> <b>500+</b> expert educators</li>
            <li> <b>100+</b> successful career transitions</li>
          </ul>

          <div className="flex items-center gap-4">
            <button onClick={handleAllSession} className="bg-green-700 text-white px-6 py-2 rounded-md transition">
              Join Now
            </button>
            <button className="bg-white border border-indigo-200 text-indigo-700 px-5 py-2 rounded-md hover:shadow-sm transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right: Lottie */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Lottie
            animationData={communityAnimation}
            loop={true}
            className="w-full md:w-3/4"
          />
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;
