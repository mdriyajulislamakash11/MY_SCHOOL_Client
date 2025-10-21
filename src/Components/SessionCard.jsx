import React from "react";
import SectionTitle from "./SectionTitle";
import useAxiosPublic from "../hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hook/useAuth";
import { useNavigate } from "react-router-dom";

// 🌀 Swiper Import
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SessionCard = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: sessions = [] } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await axiosPublic.get("/sessions");
      return res.data;
    },
  });

  const currentDate = new Date();

  const approvedSessions = sessions.filter(
    (session) => session.status === "approved"
  );

  const updatedSessions = approvedSessions.map((session) => {
    const regStart = new Date(session.regStartDate);
    const regEnd = new Date(session.regEndDate);
    const isOngoing = currentDate >= regStart && currentDate <= regEnd;

    return {
      ...session,
      state: isOngoing ? "Ongoing" : "Closed",
    };
  });

  // Handle Read More button click
  const handleReadMore = (sessionId) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/sessions/${sessionId}`);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Session Subtitle"
          title="Study Sessions"
          description="Browse all approved study sessions and join ongoing ones."
        />

        {updatedSessions.length === 0 ? (
          <p className="text-center text-gray-600 text-lg mt-10">
            No sessions available yet 😢
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
              delay: 3000,
              disableOnInteraction: false,
              reverseDirection: false, // 
            }}
            pagination={{ clickable: true }}
            navigation={true}
            className="pb-10 mt-10"
          >
            {updatedSessions.slice(0, 6).map((session) => (
              <SwiperSlide key={session._id}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 text-left flex flex-col h-[450px]">
                  <img
                    src={session.image}
                    alt={session.title}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                    {session.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                    {session.description}
                  </p>

                  <div className="flex justify-between items-center mt-auto">
                    <span
                      className={`px-4 py-2 rounded-full font-medium text-sm ${
                        session.state === "Ongoing"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {session.state}
                    </span>

                    <button
                      onClick={() => handleReadMore(session._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
                    >
                      Read More
                    </button>
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

export default SessionCard;
