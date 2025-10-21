import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hook/useAxiosPublic";

// 🌀 Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SectionTitle from "../../Components/SectionTitle";

const TutorSection = () => {
  const axiosPublic = useAxiosPublic();

  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });

  const tutorEmails = tutors.filter((tutor) => tutor.role === "teacher");

  console.log(tutorEmails);

  if (isLoading) {
    return (
      <p className="text-center text-gray-500 py-10 text-lg">
        Loading tutors...
      </p>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="👨‍🏫 Meet Our Tutors"
          subtitle="Our dedicated tutors are here to help you succeed!"
          description="Explore profiles of our experienced tutors ready to guide you on your learning journey."
         />

        {tutorEmails.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No tutors available yet 😢
          </p>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            className="pb-10"
          >
            {tutorEmails.map((tutor) => (
              <SwiperSlide key={tutor._id}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 text-center transform hover:scale-[1.03] duration-300">
                  <img
                    src={
                      tutor.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt={tutor.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-indigo-300 mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {tutor.name}
                  </h3>
                  <p className="text-indigo-600 font-medium">
                    {tutor.subject || "Subject not specified"}
                  </p>
                  <p className="mt-2 text-yellow-500 font-semibold">
                    ⭐ {tutor.rating || "No rating yet"}
                  </p>
                  <button className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
                    View Profile
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default TutorSection;
