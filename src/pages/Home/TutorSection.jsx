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
          title=" Meet Our Tutors"
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
            spaceBetween={25}
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
                <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-4 flex flex-col items-center md:flex-row md:items-center gap-4 h-[180px] transform hover:scale-[1.02] duration-300 overflow-hidden">
                  
                 
                  <div className="absolute top-2 left-2 w-8 h-8 ml-6 text-white text-xl text-center bg-green-800 rounded-full">,,</div>

                  <div className="absolute bottom-2 right-2 w-8 h-8 mr-6 text-white text-xl text-center bg-green-800 rounded-full">,,</div>

                  {/* Tutor Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={
                        tutor.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt={tutor.name}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-blue-400 mx-auto md:mx-0"
                    />
                  </div>

                  {/* Tutor Info */}
                  <div className="text-center md:text-left flex flex-col justify-center">
                    <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                      {tutor.name}
                    </h3>
                    <p className="text-indigo-600 font-medium text-sm mt-1">
                      {tutor.subject || "Introduction to React and Modern JavaScript"}
                    </p>
                    <p className="text-yellow-500 font-semibold text-sm mt-1">
                      ⭐ {tutor.rating || "No rating yet"}
                    </p>
                  </div>
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
