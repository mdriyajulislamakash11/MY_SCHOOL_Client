import React from 'react';

const LearningPaths = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center">
      {/* Section Heading */}
      <h2 className="text-4xl font-bold mb-4 text-gray-800">Explore Our Learning Paths</h2>

      {/* Section Description */}
      <p className="text-gray-600 mb-12">
        Choose a path that fits your goals. Whether you're a beginner or looking to level up, we have
        the perfect track for you.
      </p>

      {/* 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-3 text-indigo-600">Web Development</h3>
          <p className="text-gray-600">
            Learn HTML, CSS, and JavaScript to build modern, responsive websites and web apps.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-3 text-indigo-600">Data Science</h3>
          <p className="text-gray-600">
            Dive into data analysis, visualization, and machine learning with Python and real-world datasets.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-3 text-indigo-600">Mobile App Development</h3>
          <p className="text-gray-600">
            Build cross-platform mobile apps using React Native and publish them on app stores.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LearningPaths;
