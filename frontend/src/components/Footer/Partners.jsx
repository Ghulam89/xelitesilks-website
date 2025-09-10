import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import partner1 from '../../assets/images/footer/partner1.png';
import partner2 from '../../assets/images/footer/partner2.png';
import partner3 from '../../assets/images/footer/partner3.png';
import partner4 from '../../assets/images/footer/partner4.png';
const Partners = () => {

    const data  = [
        {
            id:1,
            icon:partner1,
            title:'No Minimum Order Qty',
            description:'Order as few as one custom unit to get started, with no minimum order quantity requirements.'

        },
         {
            id:2,
            icon:partner2,
            title:'Free Design',
            description:'Avail professional design services without any added fees, ensuring your vision comes to life.'

        },
        {
            id:3,
            icon:partner3,
            title:'Quickest Turnaround',
            description:'Avail professional design services without any added fees, ensuring your vision comes to life.'

        },
        {
            id:3,
            icon:partner4,
            title:'Cheapest Prices',
            description:'Benefit from our regular discounted rates and get the best custom packaging at the lowest prices.'

        }

    ]
  return (
    <>
     <div className="sm:max-w-8xl   max-w-[95%] mx-auto">
     <div className="">
     <strong className=" pb-3.5 text-2xl">
     Our Shipping Partners


        </strong>
        <div className='rounded-lg p-3   pb-8 flex justify-center items-center'>
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        speed={2000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        loop={true}
        
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {data?.map((item) => (
            <SwiperSlide key={item.id}>
                <div className="text-center flex w-28 justify-center items-center">
                <img src={item.icon} alt=""    className=' mx-auto  w-32' />
               
                </div>
            </SwiperSlide>
        ))}
      </Swiper>
        </div>
     
     </div>
     </div>
      
    </>
  );
};

export default Partners;