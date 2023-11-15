import { MainSwiperContainer } from "./Swiper.styled";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const MainSwiper = () => {
  SwiperCore.use([Autoplay]);
  return (
    <MainSwiperContainer>
      <Swiper
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        slidesPerGroup={1}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        speed={3000}
        grabCursor={true}
        allowTouchMove={true}
        cssMode={false}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="swiper"
      >
        <SwiperSlide className="swiper-slide">
          <img src="/assets/main_slide01.png" alt="dress1" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src="/assets/main_slide02.png" alt="dress2" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src="/assets/main_slide03.png" alt="dress3" />
        </SwiperSlide>
      </Swiper>
    </MainSwiperContainer>
  );
};

export default MainSwiper;
