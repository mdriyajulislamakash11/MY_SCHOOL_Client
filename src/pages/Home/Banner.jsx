import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Swiper Modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Banner Images
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import banner4 from "../../assets/banner3.jpg";
import banner5 from "../../assets/banner5.jpg";

const Banner = () => {
  // Study Platform Banner Data
  const bannerData = [
    {
      img: banner1,
      title: "Welcome to Your Smart Study Platform",
      desc: "Learn anytime, anywhere — with structured lessons, interactive tools, and real academic guidance.",
      extra:
        "A complete digital environment to improve your skills and achieve academic excellence.",
      btn: "Start Learning",
     link: "/all-classes",
    },
    {
      img: banner2,
      title: "Explore High-Quality Courses",
      desc: "Concept-wise, chapter-wise, and topic-wise lessons designed for smarter study.",
      extra:
        "Built by qualified instructors to boost understanding, confidence, and grades.",
      btn: "Browse Courses",
     link: "/all-classes",
    },
    {
      img: banner3,
      title: "Daily Learning, Daily Progress",
      desc: "Stay consistent with daily tasks, quizzes, and progress tracking.",
      extra:
        "Small, consistent efforts each day lead to big academic success.",
      btn: "Continue Study",
      link: "/all-classes",
    },
    {
      img: banner4,
      title: "Sharpen Your Knowledge",
      desc: "Detailed notes, solved examples, reviews, practice sets & more.",
      extra:
        "Perfect for school, college, university and madrasha students.",
      btn: "View Study Materials",
      link: "/all-classes",
    },
    {
      img: banner5,
      title: "Achieve Your Academic Goals",
      desc: "Stay motivated with achievements, badges, progress score and instructor feedback.",
      extra:
        "Your success is the mission of our learning community.",
      btn: "Get Started",
      link: "/all-classes",
    },
  ];

  // 

  return (
    <div className="md:h-[700px]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {bannerData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full md:h-[700px]">

              {/* Banner Image */}
              <img
                src={item.img}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Strong Dark Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>

              {/* Banner Study Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-10">

                <h2 className="text-white text-4xl md:text-6xl font-extrabold drop-shadow-lg tracking-wide leading-tight mb-6">
                  {item.title}
                </h2>

                <p className="text-white/95 text-lg md:text-2xl max-w-3xl leading-relaxed drop-shadow-md mb-6">
                  {item.desc}
                </p>

                <p className="text-white/80 text-base md:text-lg italic max-w-2xl mb-10">
                  {item.extra}
                </p>

                <a
                  href={item.link}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white text-lg rounded-xl shadow-xl hover:opacity-90 hover:scale-105 duration-300"
                >
                  {item.btn}
                </a>

              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
