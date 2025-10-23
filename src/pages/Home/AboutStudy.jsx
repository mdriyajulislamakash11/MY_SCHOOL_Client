import React from "react";

const AboutStudy = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">
      {/* 🌟 Section 1: About */}
      <section>
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-indigo-700 mb-3">
          About Study Buddy
        </h2>
        <p className="text-center text-gray-700 mb-10 max-w-3xl mx-auto text-base sm:text-lg">
          Study Buddy is a modern platform connecting learners with skilled
          tutors worldwide. Our mission is to make learning accessible,
          interactive, and enjoyable for everyone.
        </p>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          <div className="bg-gradient-to-tr from-indigo-50 to-indigo-100 shadow-lg rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 text-center">
            <h3 className="text-xl font-semibold mb-2">Expert Tutors</h3>
            <p className="text-gray-700 text-sm">
              Learn from experienced educators with real-world insights and
              personalized guidance.
            </p>
          </div>

          <div className="bg-gradient-to-tr from-indigo-50 to-indigo-100 shadow-lg rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 text-center">
            <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
            <p className="text-gray-700 text-sm">
              Study anytime, anywhere with online sessions and custom schedules.
            </p>
          </div>

          <div className="bg-gradient-to-tr from-indigo-50 to-indigo-100 shadow-lg rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 text-center">
            <h3 className="text-xl font-semibold mb-2">Interactive Classes</h3>
            <p className="text-gray-700 text-sm">
              Engage in live discussions, projects, and quizzes for active
              learning.
            </p>
          </div>
        </div>
      </section>

      {/* 🌈 Section 2: What We Offer */}

      <div className="py-16 px-10 bg-blue-600 rounded-md">
        <h3 className="text-2xl font-semibold text-center text-white mb-10">
          What We Offer
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 text-center">
            <div className="flex justify-center mb-4">
              <span className="text-4xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Personalized Learning
            </h3>
            <p className="text-gray-700 text-sm">
              Tailored study plans and resources to fit individual learning
              styles and goals.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 text-center">
            <div className="flex justify-center mb-4">
              <span className="text-4xl">🤝</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Collaborative Environment
            </h3>
            <p className="text-gray-700 text-sm">
              Engage with peers and tutors in a supportive, interactive online
              community.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 text-center">
            <div className="flex justify-center mb-4">
              <span className="text-4xl">📚</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Comprehensive Resources
            </h3>
            <p className="text-gray-700 text-sm">
              Access a wealth of study materials, including videos, articles,
              and practice exercises.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 text-center">
            <div className="flex justify-center mb-4">
              <span className="text-4xl">💡</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Continuous Support</h3>
            <p className="text-gray-700 text-sm">
              Our team is here to help you every step of the way, ensuring your
              success.
            </p>
          </div>
        </div>
      </div>

      {/* 🌈 Section 3: Why Choose */}
      <section>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3">
          Why Choose Study Buddy
        </h2>
        <p className="text-center text-gray-700 mb-10 max-w-3xl mx-auto text-base sm:text-lg">
          Thousands of learners trust Study Buddy for quality education,
          interactive sessions, and expert guidance.
        </p>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          <div className="bg-white shadow-lg rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 text-center">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              Global Community
            </h3>
            <p className="text-gray-700 text-sm">
              Connect with passionate learners and tutors from all around the
              globe.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 text-center">
            <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
            <p className="text-gray-700 text-sm">
              Build skills, confidence, and professional growth with expert
              guidance.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 text-center">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              Affordable Learning
            </h3>
            <p className="text-gray-700 text-sm">
              High-quality education and mentoring at reasonable prices for
              everyone.
            </p>
          </div>
        </div>
      </section>

      {/* ⭐ Section 3: Testimonials */}
      <section className="bg-indigo-50 py-12 rounded-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3">
          What Our Students Say
        </h2>
        <p className="text-center text-gray-700 mb-10 max-w-3xl mx-auto text-base sm:text-lg">
          Hear from learners who improved their skills and achieved success with
          Study Buddy.
        </p>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          <div className="bg-white shadow-md rounded-2xl p-5 text-center hover:shadow-lg transition-all duration-300">
            <p className="text-gray-700 mb-3 text-sm">
              "The tutors are amazing and the classes are really engaging. I
              learned so much!"
            </p>
            <h4 className="font-semibold text-indigo-600 text-sm">
              — Sarah K.
            </h4>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-5 text-center hover:shadow-lg transition-all duration-300">
            <p className="text-gray-700 mb-3 text-sm">
              "Flexible schedule and interactive lessons made learning so easy
              and fun!"
            </p>
            <h4 className="font-semibold text-indigo-600 text-sm">
              — James L.
            </h4>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-5 text-center hover:shadow-lg transition-all duration-300">
            <p className="text-gray-700 mb-3 text-sm">
              "I improved my skills and gained confidence. Highly recommend
              Study Buddy!"
            </p>
            <h4 className="font-semibold text-indigo-600 text-sm">
              — Priya M.
            </h4>
          </div>
        </div>
      </section>

      {/* 🚀 Section 4: Join as Tutor CTA */}
      <section className="text-center py-12 bg-indigo-700 rounded-3xl text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Become a Tutor</h2>
        <p className="mb-6 max-w-2xl mx-auto text-base sm:text-lg">
          Join Study Buddy and start teaching students from all around the
          world. Share your knowledge and earn!
        </p>
        <a
          href="/join-tutor"
          className="inline-block bg-white text-indigo-700 font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition-all duration-300 text-sm sm:text-base"
        >
          Join Now
        </a>
      </section>
    </div>
  );
};

export default AboutStudy;
