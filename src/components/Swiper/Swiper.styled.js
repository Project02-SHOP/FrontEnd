import { styled } from "styled-components";

export const MainSwiperContainer = styled.div`
  .swiper {
    width: 100%;
    overflow: hidden;
    /* height: 83vh; */
  }

  .swiper-wrapper {
    width: inherit;
  }

  .swiper-slide {
    width: 100%;
  }

  .swiper-slide img {
    width: 100%;
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: var(--color-coconut);
    scale: 0.7;
  }
`;

export const SubSwiperContainer = styled.div`
  width: 100%;
  height: 110vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor || "inherit"};

  .swiper {
    width: 1320px;
  }

  .swiper-wrapper {
    width: inherit;
  }

  .swiper-slide {
    width: 100%;
  }

  .swiper-slide img {
    width: 100%;
    object-fit: cover;
  }

  .swiper-button-prev,
  .swiper-button-next {
    scale: 0.7;
    color: var(--color-coconut);
  }

  & span {
    border-top: 1px solid var(--color-main-text);
    margin-top: 10px;
    width: 100%;
    display: block;
    padding-top: 5px;
  }
  & p {
    margin: 10px 0;
  }
`;

export const SlideImg = styled.div`
  overflow: hidden;
  width: 100%;
  aspect-ratio: 1/1;
`;

export const CategoryTitle = styled.h2`
  font-size: 40px;
  text-align: center;
  margin-bottom: 70px;
`;
