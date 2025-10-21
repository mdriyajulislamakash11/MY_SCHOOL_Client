import React from "react";

const LearnersInfo = () => {
  return (
    <div className="max-w-6xl mx-auto my-16 px-4">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-green-600 mb-3">
          Empowering Learners, Transforming Futures
        </h2>
        <p className="text-gray-600 w-3/4 mx-auto">
            At <span className="font-semibold text-blue-600">Study-Buddy</span>, we believe in the power of education to change lives. Our platform is designed to provide high-quality learning experiences, equipping individuals with the skills they need to excel in their careers and personal growth.
          </p>
      </div>

      {/* Cards Container */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-500">
          <h3 className="text-2xl font-semibold text-blue-500 mb-3">
            Expert-Led Courses
          </h3>
          <p className="text-gray-600">
            Learn from industry professionals with real-world experience and gain skills that truly matter.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 border-t-4 border-green-500">
          <h3 className="text-2xl font-semibold text-green-500 mb-3">
            Innovative Learning
          </h3>
            <p className="text-gray-600">
            Interactive lessons, hands-on projects, and AI-driven recommendations for a personalized experience.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 border-t-4 border-purple-500">
          <h3 className="text-2xl font-semibold text-purple-500 mb-3">
            Global Community
          </h3>
          <p className="text-gray-600">
            Connect with like-minded learners, collaborate on projects, and grow together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LearnersInfo;
