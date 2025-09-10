import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Mousewheel, Keyboard } from 'swiper/modules';
import box1 from '../../assets/images/boxes/box.webp';
import box2 from '../../assets/images/boxes/box2.webp';
import box3 from '../../assets/images/boxes/box3.webp';

function TemplateSlider() {
  return (
    <div>
       <Swiper
        cssMode={true}
        navigation={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        <SwiperSlide><img src={box1} alt="" className='rounded-[8px] w-full'/></SwiperSlide>
        <SwiperSlide><img src={box2} alt="" className='rounded-[8px] w-full'/></SwiperSlide>
        <SwiperSlide><img src={box3} alt=""className='rounded-[8px] w-full' /></SwiperSlide>
       
      </Swiper>
    </div>
  )
}

export default TemplateSlider
