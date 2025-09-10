
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProductCard from "./ProductCard";
const CardSlider = ({ item, index }) => {
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsAutoPlay(scrollPosition <= 100);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="">
      <div className="w-full  mx-auto relative">

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={
            isAutoPlay ? { delay: 3000, disableOnInteraction: false } : false
          }
          loop={true}
          // pagination={{ clickable: true }}
          navigation={{
            nextEl: `.custom-next-${index}`,
            prevEl: `.custom-prev-${index}`,
          }}
          spaceBetween={30}
          slidesPerView="auto"
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {item?.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="   bg-[#f7f7f7] p-2 rounded-xl max-w-6xl mx-auto">

                <ProductCard data={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>


        <div className="flex w-full justify-center sm:mt-0 mt-6 gap-3 items-center">
          <button className={`custom-prev-${index} md:absolute top-[40%] z-40 md:-left-15 w-10 h-10 bg-[#F6F6F6] text-[#4440E6] hover:bg-[#4440E6] hover:text-white rounded-xl flex items-center justify-center`}>
            <IoIosArrowBack size={25} />
          </button>
          <button className={`custom-next-${index} w-10 h-10 md:absolute top-[40%] z-40 md:-right-15 bg-[#F6F6F6] text-[#4440E6] hover:bg-[#4440E6] hover:text-white rounded-xl flex items-center justify-center`}>
            <IoIosArrowForward size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
