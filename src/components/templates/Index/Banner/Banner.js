"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

function Banner() {
  return (
    <Swiper
      rewind={true}
      navigation={true}
      loop={true}
      autoplay={{ delay: 1500 }}
      modules={[Navigation, Autoplay]}
      className="mySwiper home-slider w-full"
    >
      {["/images/slide.jpg", "/images/winter-slie.jpg", "/images/fall.jpg"].map((src, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-[200px] md:h-[400px] lg:h-[600px]"> 
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority={index === 0} // Load first image eagerly
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Banner;
