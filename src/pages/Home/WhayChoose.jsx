import React from 'react';

const WhayChoose = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center">
      {/* Section Heading */}
      <h2 className="text-4xl font-bold mb-4 text-gray-800">Why Choose Us</h2>

      {/* Section Description */}
      <p className="text-gray-600 mb-12">
        We’re dedicated to helping learners achieve their goals with expert guidance, flexible learning, and real-world projects.
      </p>

      {/* 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-3 ">Expert Mentors</h3>
          <p className="text-gray-600">
            Learn from industry professionals with years of hands-on experience and personalized mentorship.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-3 ">Flexible Learning</h3>
          <p className="text-gray-600">
            Study at your own pace, anytime and anywhere, with access to all recorded sessions and resources.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-3 ">Practical Projects</h3>
          <p className="text-gray-600">
            Apply your skills by working on real-world projects that strengthen your portfolio and confidence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhayChoose;
