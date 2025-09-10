import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import icon1 from '../../assets/images/icon/no-die-&-plate-charge.png';
import icon2 from '../../assets/images/icon/No-minimum-order-qnty.png';
import icon3 from '../../assets/images/icon/Free-design.png';
import icon4 from '../../assets/images/icon/Quick-turnaround.png';
import icon5 from '../../assets/images/icon/cheapest-price.png';
import icon6 from '../../assets/images/icon/Free-delivery.png';
const CustomPackagingApart = () => {

    const data  = [
        {
            id:1,
            icon:icon1,
            title:'No Die & Plate Charges',
            description:'Enjoy the benefit of no additional costs for die and plate setups on your custom orders.'

        },
         {
            id:2,
            icon:icon2,
            title:'No Minimum Order Qty',
            description:'Order as few or as many items as you need without any minimum quantity restrictions.'

        },
        {
            id:3,
            icon:icon3,
            title:'Free Design',
            description:'Avail professional design services without any added fees, ensuring your vision comes to life.	'

        },
         {
            id:4,
            icon:icon4,
            title:'Quickest Turnaround',
            description:'Get your orders processed and delivered promptly, ensuring the fastest turnaround time possible.'

        },
        {
            id:5,
            icon:icon5,
            title:'Cheapest Prices',
            description:'Benefit from our regular discounted rates and get the best custom packaging at the lowest prices.'

        },
        {
            id:5,
            icon:icon6,
            title:'Free Shipping',
            description:'Enjoy the added perk of free shipping on your orders, making it even more cost-effective for you.'

        },
       

       


    ]
  return (
    <>
     <div className="sm:max-w-6xl  my-6  max-w-[95%] mx-auto">
     <div className="text-center pb-3">
          <h2 className="sm:text-[35px] text-[25px]  pb-3    font-sans   font-[600] text-[#333333] ">
     Your Packaging Partner: What Sets Umbrella Custom Packaging Apart


        </h2>
        <div className='rounded-lg p-3  h-64 flex justify-center items-center bg-[#eff4fe]'>
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        speed={2000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        loop={true}
        // pagination={{
        //   clickable: true,
        // }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {data?.map((item) => (
            <SwiperSlide key={item.id}>
                <div className="text-center">
                <img src={item.icon} alt=""  width={80} className=' mx-auto' />
                <strong className="  font-[600] text-[#111111]">{item.title}</strong>
                <p className=" m-0 text-[16px]">
                    {item.description}
                </p>
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

export default CustomPackagingApart;