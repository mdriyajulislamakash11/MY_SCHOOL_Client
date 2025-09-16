import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Banner component images
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import banner4 from "../../assets/banner4.avif";
import banner5 from "../../assets/banner5.jpg";
import banner6 from "../../assets/banner6.jpg";
import banner7 from "../../assets/banner7.jpg";
import banner8 from "../../assets/banner8.jpg";
import banner9 from "../../assets/banner9.jpg";

const Banner = () => {
  return (
    <div className="md:h-[700px]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {[banner1, banner2, banner3, banner4, banner5, banner6, banner7, banner8, banner9].map(
          (img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full md:h-[700px]">
                {/* Banner Image */}
                <img className="object-cover w-full h-full" src={img} alt={`Banner ${index + 1}`} />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              </div>
            </SwiperSlide>
            
          )
        )}
      </Swiper>
    </div>
  );
};

export default Banner;
