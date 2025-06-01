"use client";
import styles from "./articles.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import Article from "./Article";

const Articles = () => {
  return (
    <div className={styles.container}>
      <p className={`!text-xl sm:!text-2xl lg:!text-3xl ${styles.title}`}>مقالات ما</p>
      <span className={styles.description}>دانستنی های جذاب دنیای قهوه</span>
      <main>
        <Swiper
          centeredSlides={true}
          spaceBetween={30}
          dir="rtl"
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          loop={true}
          navigation={true}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10 },       // Mobile
            640: { slidesPerView: 2, spaceBetween: 20 },     // Tablet
            1024: { slidesPerView: 3, spaceBetween: 30 },    // Desktop and up
          }}
          modules={[Navigation, Autoplay]}
          className="mySwiper articles_slider"
        >

          <SwiperSlide>
            <Article />
          </SwiperSlide>
          <SwiperSlide>
            <Article />
          </SwiperSlide>
          <SwiperSlide>
            <Article />
          </SwiperSlide>
          <SwiperSlide>
            <Article />
          </SwiperSlide>
          <SwiperSlide>
            <Article />
          </SwiperSlide>
          <SwiperSlide>
            <Article />
          </SwiperSlide>
          <SwiperSlide>
            <Article />
          </SwiperSlide>
          <SwiperSlide>
            <Article />
          </SwiperSlide>
          <SwiperSlide>
            <Article />
          </SwiperSlide>
        </Swiper>
      </main>
    </div>
  );
};

export default Articles;
