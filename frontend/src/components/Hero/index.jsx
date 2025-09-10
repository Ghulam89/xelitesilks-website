import React, { useState, useEffect } from "react";
import Hero1 from "../../assets/images/banner1.png";
import Hero2 from "../../assets/images/banner2.png";
import Hero3 from "../../assets/images/banner3.png"; 
import { Link } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

// Import required modules
import { Pagination, Navigation, Autoplay, EffectFade } from 'swiper/modules';

import Button from "../common/Button";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className=" relative">
      {/* Hero Swiper */}
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
          bulletClass: 'custom-bullet',
          bulletActiveClass: 'custom-bullet-active',
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        effect={'fade'}
        fadeEffect={{ crossFade: true }}
        modules={[Pagination, Navigation, Autoplay, EffectFade]}
        className="rounded-md overflow-hidden hero-swiper"
        speed={1000}
      >
            <SwiperSlide>
          <div 
           
            className=" bg-cover  bg-[#f7f3ef] px-3 sm:px-0 bg-center"
          >
            <div className="flex  md:flex-row gap-2 flex-col mx-auto  max-w-7xl items-center  justify-between   min-h-[80vh] ">
              <div className="sm:w-5/12 w-full    pt-3  text-white">
             
              <p 
                className="md:text-6xl text-4xl font-bold mt-2 mb-4 opacity-0 animate-slide-up"
                style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
              >
                Fashion For <strong className=" font-bold text-[#C5A980]">All,</strong> Every Day
              </p>
              <p 
                className="sm:text-lg text-base mt-3 mb-6 opacity-0 animate-fade-in"
                style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
              >
                From timeless staples to trend-setting pieces, we curate collections that inspire confidence and celebrate individuality. Whether you're dressing up or keeping it casual, we’ve got your look.
              </p>
              <div 
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
              >
                <Button
  rIcons={
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="13" r="12.5" fill="currentColor" stroke="black"/>
      <path d="M10.6367 15.3636L14.7731 11.2273M14.7731 11.2273L15.364 13.5909M14.7731 11.2273L12.4094 10.6364" stroke="white" strokeWidth="1.5"/>
    </svg>
  }
  label="Shop Now"
  className="mt-5 border-2 border-[#C5A980] bg-[#C5A980] text-black hover:bg-white hover:text-black hover:border-[#C5A980]"
/>
              </div>
            </div>
            <div className="sm:w-7/12 w-full">
              <img src={Hero1} className=" w-full" alt="" />
            </div>
            </div>
            
          </div>
        </SwiperSlide>
 
        <SwiperSlide>
          <div 
           
            className=" bg-cover  bg-[#f7f3ef] px-3 sm:px-0 bg-center"
          >
            <div className="flex  md:flex-row gap-2 flex-col mx-auto  max-w-7xl items-center  justify-between   min-h-[80vh] ">
              <div className="sm:w-5/12 w-full    pt-3  text-white">
             
              <p 
                className="md:text-6xl text-4xl font-bold mt-2 mb-4 opacity-0 animate-slide-up"
                style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
              >
                Fashion For <strong className=" font-bold text-[#C5A980]">All,</strong> Every Day
              </p>
              <p 
                className="sm:text-lg text-base mt-3 mb-6 opacity-0 animate-fade-in"
                style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
              >
                From timeless staples to trend-setting pieces, we curate collections that inspire confidence and celebrate individuality. Whether you're dressing up or keeping it casual, we’ve got your look.
              </p>
              <div 
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
              >
                <Button
  rIcons={
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="13" r="12.5" fill="currentColor" stroke="black"/>
      <path d="M10.6367 15.3636L14.7731 11.2273M14.7731 11.2273L15.364 13.5909M14.7731 11.2273L12.4094 10.6364" stroke="white" strokeWidth="1.5"/>
    </svg>
  }
  label="Shop Now"
  className="mt-5 border-2 border-[#C5A980] bg-[#C5A980] text-black hover:bg-white hover:text-black hover:border-[#C5A980]"
/>
              </div>
            </div>
            <div className="sm:w-7/12 w-full">
              <img src={Hero2} className=" w-full" alt="" />
            </div>
            </div>
            
          </div>
        </SwiperSlide>

         <SwiperSlide>
          <div 
           
            className=" bg-cover  bg-[#f7f3ef] px-3 sm:px-0 bg-center"
          >
            <div className="flex  md:flex-row gap-2 flex-col mx-auto  max-w-7xl items-center  justify-between   min-h-[80vh] ">
              <div className="sm:w-5/12 w-full    pt-3  text-white">
             
              <p 
                className="md:text-6xl text-4xl font-bold mt-2 mb-4 opacity-0 animate-slide-up"
                style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
              >
                Fashion For <strong className=" font-bold text-[#C5A980]">All,</strong> Every Day
              </p>
              <p 
                className="sm:text-lg text-base mt-3 mb-6 opacity-0 animate-fade-in"
                style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
              >
                From timeless staples to trend-setting pieces, we curate collections that inspire confidence and celebrate individuality. Whether you're dressing up or keeping it casual, we’ve got your look.
              </p>
              <div 
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
              >
                <Button
  rIcons={
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="13" r="12.5" fill="currentColor" stroke="black"/>
      <path d="M10.6367 15.3636L14.7731 11.2273M14.7731 11.2273L15.364 13.5909M14.7731 11.2273L12.4094 10.6364" stroke="white" strokeWidth="1.5"/>
    </svg>
  }
  label="Shop Now"
  className="mt-5 border-2 border-[#C5A980] bg-[#C5A980] text-black hover:bg-white hover:text-black hover:border-[#C5A980]"
/>
              </div>
            </div>
            <div className="sm:w-7/12 w-full">
              <img src={Hero3} className=" w-full" alt="" />
            </div>
            </div>
            
          </div>
        </SwiperSlide>

       
      </Swiper>
      
      {/* Custom pagination */}
      <div className="custom-pagination flex justify-center mt-6 space-x-2"></div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-left {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-slide-left {
          animation: slide-left 0.8s ease-out;
        }
        
        .custom-bullet {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #ccc;
          margin: 0 5px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .custom-bullet-active {
          background-color: #4440E6;
          transform: scale(1.3);
        }
        
        .hero-swiper .swiper-slide-active .animate-fade-in,
        .hero-swiper .swiper-slide-active .animate-slide-up,
        .hero-swiper .swiper-slide-active .animate-slide-left {
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
};

export default Hero;