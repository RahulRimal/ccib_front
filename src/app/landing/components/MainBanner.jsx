import React from "react";
import styled, { useTheme } from "styled-components";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Button from "../../components/Button";
import { hexWithOpacity } from "../../../helpers";

const Wrapper = styled.div`
  height: 500px;
  width: 100%;
  .swiper-button-next,
  .swiper-button-prev {
    color: #fff;
  }
  .swiper-pagination-bullet-active {
    background: #fff;
  }
`;

const CarouselWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) =>
    hexWithOpacity(theme.palette.primary.dark, 30)};
  & > div {
    max-width: ${({ theme }) => theme.sizing.s500};
    height: 100%;
    display: flex;
    color: ${({ theme }) => theme.palette.text.white};
    flex-direction: column;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.s20};
    padding: ${({ theme }) => theme.spacing.s20};
    padding-left: ${({ theme }) => theme.spacing.s48};

    p {
      font-size: ${({ theme }) => theme.typography.fontSize.f18};
      line-height: ${({ theme }) => theme.spacing.s24};
    }
    h2 {
      font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
      font-size: ${({ theme }) => theme.typography.fontSize.f30};
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    button {
      padding: ${({ theme }) => `${theme.spacing.s8} ${theme.spacing.s16}`};
      font-size: ${({ theme }) => theme.typography.fontSize.f16};
    }
  }
`;

export const CarouselContent = () => {
  const theme = useTheme();
  return (
    <>
      <CarouselWrapper>
        <div>
          <h2>Nationl Finance</h2>
          <p>
            Ham followed now ecstatic use speaking exercise may repeated.
            Himself he evident oh greatly my on inhabit general concern greatly
            my on inhabit general.
          </p>

          <div
            style={{
              display: "flex",
              gap: theme.spacing.s16,
              marginTop: theme.spacing.s20,
            }}
          >
            <Button text={"Apply Now"} />
            <Button text={"Learn More"} />
          </div>
        </div>
      </CarouselWrapper>
    </>
  );
};

function MainBanner() {
  const theme = useTheme();
  return (
    <div style={{}}>
      <Wrapper>
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
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          style={{ height: "100%" }}
        >
          <SwiperSlide
            style={{
              backgroundImage:
                "url(https://source.unsplash.com/random?wallpapers)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
              padding: `${theme.spacing.s0} 4%`,
              backgroundColor: "red",
            }}
          >
            <CarouselContent />
          </SwiperSlide>

          <SwiperSlide
            style={{
              backgroundImage:
                "url(https://source.unsplash.com/random?wallpapers)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
              backgroundColor: "red",
              padding: `${theme.spacing.s0} 4%`,
            }}
          >
            <CarouselContent />
          </SwiperSlide>
          <SwiperSlide
            style={{
              backgroundImage:
                "url(https://source.unsplash.com/random?wallpapers)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
              backgroundColor: "red",
              padding: `${theme.spacing.s0} 4%`,
            }}
          >
            <CarouselContent />
          </SwiperSlide>
        </Swiper>
      </Wrapper>
    </div>
  );
}

export default MainBanner;
