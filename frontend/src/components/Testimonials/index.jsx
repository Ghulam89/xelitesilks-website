import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sybil Sharp",
      verified: true,
      rating: 5,
      text: "Fantastic shop! Great selection, fair prices, and friendly staff. Highly recommended. The quality of the products is exceptional, and the prices are very reasonable!",
      mainImage: "https://i.ibb.co/0FqNhPp/fashion-woman.jpg",
      product: {
        name: "Contrasting sheepskin sweatshirt",
        price: "$60.00",
        image: "https://modavereact.vercel.app/images/avatar/user-4.jpg",
      },
    },
    {
      id: 2,
      name: "Mark G.",
      verified: true,
      rating: 5,
      text: "I absolutely love this shop! The products are high-quality and the customer service is excellent. I always leave with exactly what I need and a smile on my face.",
      mainImage: "https://i.ibb.co/rmDpCgz/fashion-man.jpg",
      product: {
        name: "Contrasting sheepskin sweatshirt",
        price: "$60.00",
        image: "	https://modavereact.vercel.app/images/avatar/user-5.jpg",
      },
    },
      {
      id: 2,
      name: "Mark G.",
      verified: true,
      rating: 5,
      text: "I absolutely love this shop! The products are high-quality and the customer service is excellent. I always leave with exactly what I need and a smile on my face.",
      mainImage: "https://i.ibb.co/rmDpCgz/fashion-man.jpg",
      product: {
        name: "Contrasting sheepskin sweatshirt",
        price: "$60.00",
        image: "https://modavereact.vercel.app/images/avatar/user-4.jpg",
      },
    }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 text-center">
          Our Happy Customers
        </h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            1024: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }}
          modules={[Autoplay, Pagination]}
          className="testimonialSwiper"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="flex flex-col sm:flex-row bg-white border border-[#e9e9e9] rounded-lg overflow-hidden  transition-all">
               
                {/* Right content */}
                <div className=" p-6 flex flex-col justify-between">
                  {/* Rating */}
                  <div className="text-yellow-500 text-lg mb-3">
                    {"★".repeat(t.rating)}{" "}
                    {"☆".repeat(5 - t.rating)}
                  </div>

                  {/* Review text */}
                  <p className="text-gray-800 text-base mb-4">{t.text}</p>

                  {/* Reviewer */}
                  <div className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    {t.name}
                    {t.verified && (
                     <svg class="icon" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M6.875 11.6255L8.75 13.5005L13.125 9.12549" stroke="#3DAB25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 18.5005C14.1421 18.5005 17.5 15.1426 17.5 11.0005C17.5 6.85835 14.1421 3.50049 10 3.50049C5.85786 3.50049 2.5 6.85835 2.5 11.0005C2.5 15.1426 5.85786 18.5005 10 18.5005Z" stroke="#3DAB25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></g><defs><clipPath id="clip0"><rect width="20" height="20" fill="white" transform="translate(0 0.684082)"></rect></clipPath></defs></svg>
                    )}
                  </div>

                  <hr className="my-3 border-[#e9e9e9]" />

                  {/* Product info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={t.product.image}
                      alt={t.product.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-gray-900 font-medium">
                        {t.product.name}
                      </p>
                      <p className=" font-medium">
                        {t.product.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
