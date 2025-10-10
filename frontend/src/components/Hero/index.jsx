import React, { useState, useEffect, useCallback } from "react";
import Hero1 from "../../assets/images/banner1.png";
import Hero2 from "../../assets/images/banner2.png";
import Hero3 from "../../assets/images/banner3.png";
import Button from "../common/Button";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    { 
      img: Hero1, 
      index: 0,
      title: "Fashion For All, Every Day",
      description: "From timeless staples to trend-setting pieces, we curate collections that inspire confidence and celebrate individuality. Whether you're dressing up or keeping it casual, we've got your look."
    },
    { 
      img: Hero2, 
      index: 1,
      title: "New Collection 2024",
      description: "Discover our latest arrivals that blend comfort with style. Perfect for every occasion and every season."
    },
    { 
      img: Hero3, 
      index: 2,
      title: "Summer Special",
      description: "Light, breezy and stylish - our summer collection is here to keep you cool and fashionable."
    },
  ];

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating, slides.length]);

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 800);
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative">
      <div className="rounded-md overflow-hidden">
        {/* Slides Container */}
        <div className="relative h-[80vh] overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === activeIndex
                  ? "opacity-100 translate-x-0"
                  : index < activeIndex
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
              }`}
            >
              <div className="bg-cover bg-[#f7f3ef] px-3 sm:px-0 bg-center h-full">
                <div className="flex md:flex-row gap-2 flex-col mx-auto max-w-7xl items-center justify-between h-screen">
                  {/* Text Content */}
                  <div className="sm:w-5/12 w-full pt-3 text-white">
                    <p
                      className={`md:text-6xl text-4xl font-bold mt-2 mb-4 ${
                        activeIndex === index ? 'opacity-0 animate-slide-up' : ''
                      }`}
                      style={
                        activeIndex === index
                          ? { animationDelay: '0.3s', animationFillMode: 'forwards' }
                          : {}
                      }
                    >
                      {slide.title.split('<strong>').map((part, i) => {
                        if (part.includes('</strong>')) {
                          const [bold, rest] = part.split('</strong>');
                          return (
                            <React.Fragment key={i}>
                              <strong className="font-bold text-[#C5A980]">{bold}</strong>
                              {rest}
                            </React.Fragment>
                          );
                        }
                        return part;
                      })}
                    </p>
                    <p
                      className={`sm:text-lg text-base mt-3 mb-6 ${
                        activeIndex === index ? 'opacity-0 animate-fade-in' : ''
                      }`}
                      style={
                        activeIndex === index
                          ? { animationDelay: '0.6s', animationFillMode: 'forwards' }
                          : {}
                      }
                    >
                      {slide.description}
                    </p>
                    <div
                      className={`${
                        activeIndex === index ? 'opacity-0 animate-fade-in' : ''
                      }`}
                      style={
                        activeIndex === index
                          ? { animationDelay: '0.9s', animationFillMode: 'forwards' }
                          : {}
                      }
                    >
                      <Button
                        rIcons={
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="13" cy="13" r="12.5" fill="currentColor" stroke="black" />
                            <path
                              d="M10.6367 15.3636L14.7731 11.2273M14.7731 11.2273L15.364 13.5909M14.7731 11.2273L12.4094 10.6364"
                              stroke="white"
                              strokeWidth="1.5"
                            />
                          </svg>
                        }
                        label="Shop Now"
                        className="mt-5 border-2 border-[#C5A980] bg-[#C5A980] text-black hover:bg-white hover:text-black hover:border-[#C5A980]"
                      />
                    </div>
                  </div>

                  {/* Image Content */}
                  <div className="sm:w-7/12 w-full">
                    <img 
                      src={slide.img} 
                      className={`w-full transition-transform duration-1000 ${
                        activeIndex === index ? 'scale-100' : 'scale-105'
                      }`} 
                      alt={`Slide ${index + 1}`} 
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform  -translate-y-1/2 bg-white/80 hover:bg-[#C5A980] hover:text-white text-gray-800 rounded-md w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-300 z-10"
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-[#C5A980] hover:text-white rounded-md w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-300 z-10"
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Custom Pagination */}
      <div className="flex justify-center   mt-5 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full  transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-[#C5A980] scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Hero;