"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import styles from "./Gallery.module.css"
import Image from "next/image";
const Gallery = ({ img }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <section className={styles.gallery_container}>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 gallery-slider"
      >
        <SwiperSlide key={img}>
          <div className={styles.slide_wrapper}>
            <Image
              src={img}
              alt="Product image"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

          </div>
        </SwiperSlide>
      </Swiper>

    </section>
  );
};

export default Gallery;
