

import React, { useState } from 'react'
import banner from '../../assets/images/banner.jpg'
import { IoPlayCircleOutline } from "react-icons/io5";
import map from '../../assets/images/map-01.png'
import Icon1 from '../../assets/images/icon/free quote.svg';
import Icon3 from '../../assets/images/icon/Free Design support.svg';
import Icon2 from '../../assets/images/icon/Free Lamination.svg';
import aboutVideo from '../../assets/videos/about.mp4'
import Icon4 from '../../assets/images/icon/free shipping.svg';
import Icon5 from '../../assets/images/icon/FSC Certified.svg';
import Icon6 from '../../assets/images/icon/Quickest Turnaround.svg';
import CustomPackagingApart from '../../components/CustomPackagingApart/CustomPackagingApart';
import { BaseUrl } from '../../utils/BaseUrl';
import PageMetadata from '../../components/common/PageMetadata';

export const About = () => {

  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideoPlayer = () => {
    setIsVideoOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeVideoPlayer = () => {
    setIsVideoOpen(false);
    document.body.style.overflow = 'auto';
  };
  const metadata = {
    title: "About us - Umbrella Custom Packaging",
    description: "Umbrella Custom Packaging Umbrella Custom Packaging offers customized printing and packaging solutions for all your business needs. We have technologically advanced digital and offset presses. It ensures that every packaging box we print has supreme quality. Our accomplished designers provide amazing artwork choices for all kinds of boxes. We don’t charge our valued customers for [&hellip;]",
    keywords: "custom packaging, wholesale boxes, packaging solutions, affordable packaging, custom boxes, packaging design, eco-friendly packaging",
    author: "Umbrella Custom Packaging",
    ogUrl: `${BaseUrl}/about-us`,
    ogTitle: "About us - Umbrella Custom Packaging",
    ogDescription: "Umbrella Custom Packaging Umbrella Custom Packaging offers customized printing and packaging solutions for all your business needs. We have technologically advanced digital and offset presses. It ensures that every packaging box we print has supreme quality. Our accomplished designers provide amazing artwork choices for all kinds of boxes. We don’t charge our valued customers for [&hellip;]",
    modifiedTime: "2025-06-13T15:18:43+00:00",
    twitterTitle: "About us - Umbrella Custom Packaging",
    twitterDescription: "Umbrella Custom Packaging Umbrella Custom Packaging offers customized printing and packaging solutions for all your business needs. We have technologically advanced digital and offset presses. It ensures that every packaging box we print has supreme quality. Our accomplished designers provide amazing artwork choices for all kinds of boxes. We don’t charge our valued customers for [&hellip;]",
    robots: "noindex, nofollow"
  };
  return (
    <>
      <PageMetadata {...metadata} />
      <main>
        <div className='max-w-[1200px] mt-5 mx-auto text-center  rounded-[8px] p-5'>
          <div className='grid md:grid-cols-2 grid-cols-1 gap-10'>
            <div className='flex items-center justify-center h-[300px] bg-cover bg-no-repeat rounded-[8px] relative' style={{ backgroundImage: `url(${banner})` }}>
              <button
                onClick={openVideoPlayer}
                className='p-2 rounded-full bg-[#5a56e9] hover:bg-[#4a46d9] transition-colors'
              >
                <IoPlayCircleOutline size={50} color='#fff' />
              </button>
            </div>

            <div className='flex flex-col items-start justify-center space-y-2'>
              <hr className='text-gray-400 md:w-120 w-80 border-0.5' />
              <h2 className='md:text-[36px] text-[25px]  font-[600]  opacity-70 font-sans text-start'>Umbrella Custom Packaging</h2>
              <p className='text-[#333333] md:text-[16px] leading-6 text-[14px] text-left'>
                Umbrella Custom Packaging offers customized printing and packaging solutions for all your business needs.
                We have technologically advanced digital and offset presses. It ensures that every packaging box we print
                has supreme quality. Our accomplished designers provide amazing artwork choices for all kinds of boxes.
                We don't charge our valued customers for design preparation
              </p>
            </div>
          </div>
          <div className=" bg-[#B8B6FA99]  grid sm:grid-cols-6  grid-cols-2 my-3.5 mt-3 p-4 rounded-md w-full">
            <div className=" flex gap-1 items-center">
              <img src={Icon1} width={30} alt="" />
              <h5>Free Quote</h5>
            </div>
            <div className=" flex gap-1 items-center">
              <img src={Icon2} width={30} alt="" />
              <h5>Free Design support</h5>
            </div>
            <div className=" flex gap-1 items-center">
              <img src={Icon3} width={30} alt="" />
              <h5>Free Lamination</h5>
            </div>
            <div className=" flex gap-1 items-center">
              <img src={Icon4} width={30} alt="" />
              <h5>Free Shipping</h5>
            </div>
            <div className=" flex gap-1 items-center">
              <img src={Icon5} width={30} alt="" />
              <h5>FSC Certified</h5>
            </div>
            <div className=" flex gap-1 items-center">
              <img src={Icon6} width={30} alt="" />
              <h5>Quickest Turnaround</h5>
            </div>
          </div>
          <div className='mt-5'>
            <p className='text-left text-[16px] tracking-wide leading-6 '>The production team is very efficient which helps us in completing every task in minimum time span. Timely printing and shipment are the core values of our company. Umbrella Custom Packaging takes pride in delivering the best solution at reasonable price. Cardboard boxes, Kraft boxes, corrugated boxes, window boxes, die cut boxes and wedding boxes come under our range of expertise. From these box types, we accept the responsibility to manufacture spectacular packaging for electronics, food items, toys, cosmetics, etc. You name it and we have it. Umbrella Custom Packaging is a specialist in producing catchy customizations. Die cut, embossing, perforations, laminations, UV, glossy, matte and several other options are available for the designing of your customized packaging boxes. We use environment and consumer friendly stocks for manufacturing the boxes without compromising on excellence. Our competent work force enables us presenting impeccable printed designs and styles.<br /><br />

              Umbrella Custom Packaging has been catering the packaging needs of thousands of businesses across the globe. We have achieved a magnanimous success in short period of time due to our premium printing services, fastest turnaround, free shipping and unique customized designing. Umbrella Custom Packaging is helping many macro and mini businesses in their packaging needs. For specific events, we offer exciting favor and gift boxes with special discounts. Customer satisfaction is our top priority. To facilitate the customers by cutting down their expenses, we not only print at our in-house press in USA but also utilize the offshore printing facilities in Asia and Africa. We look forward to hear from your business in the near future. Our customer care services are available around the clock. For custom quote or inquiry, feel free to contact our representatives from Monday-Friday.</p>
          </div>

          <CustomPackagingApart />
          <div className='bg-[#F4ECFB] rounded-[8px] mt-8 p-3'>
            <div className='grid md:grid-cols-2 grid-cols-1 space-y-2 '>
              <div className='' >
                <img src={map} alt="" className='w-full' />


              </div>
              <div className=' flex flex-col sm:w-md w-full ml-auto justify-center items-center  gap-3'>
                <div className='flex sm:flex-row flex-col text-white gap-5 '>
                  <div className='bg-[#5a56e9]  min-h-36 rounded-[8px] flex flex-col items-start p-2.5 space-y-5'>
                    <h2 className='text-[32px] font-semibold text-white'>5+</h2>
                    <h3 className='text-[14px] text-left text-white'>Head Quarter on Global Family</h3>
                  </div>
                  <div className='bg-[#5a56e9]  min-h-36  rounded-[8px] flex flex-col items-start p-2.5 space-y-5'>
                    <h2 className='text-[32px] font-semibold text-white'>1000+</h2>
                    <h3 className='text-[14px] text-left text-white'>Satisfied Customers All Over the Globe </h3>
                  </div>
                  <div></div>

                </div>
              </div>


            </div>

            <div className='grid md:grid-cols-3 grid-cols-1 '>
              <div className='  flex flex-col justify-center items-start p-2.5 space-y-5 md:border-r-1 border-0'>
                <h1 className='text-[32px] font-bold'>USA</h1>
                <p className='text-[14px] text-start'>9854 National Blvd #1042, Los Angeles, CA 90034, United States</p>
              </div>
              <div className='  flex flex-col items-start p-2.5 space-y-5 md:border-r-1 border-0'>
                <h1 className='text-[32px] font-bold'>Uk</h1>
                <p className='text-[14px] text-start'>275 New North Road Islington Suite 1946 London, N1 7AA United Kingdom</p>
              </div>
              <div className='  flex flex-col items-start p-2.5 space-y-5'>
                <h1 className='text-[32px] font-bold' >Canada</h1>
                <p className='text-[14px] text-start'>7398 Yonge St #6d, Thornhill, ON L4J 8J2, Canada </p>
              </div>

            </div>
          </div>

          {isVideoOpen && (
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.9)] z-50 flex items-center justify-center p-4 ">
              <div className="relative w-full max-w-6xl flex flex-col h-[90vh]">

                <div className="flex justify-end mb-2">
                  <button
                    onClick={closeVideoPlayer}
                    className=" rounded-full  cursor-pointer w-10 h-10 flex items-center justify-center"
                    aria-label="Close video"
                  >
                    <h5 className="text-2xl text-white leading-none">&times;</h5>
                  </button>
                </div>

                {/* Video Container */}
                <div className="flex-1 relative rounded-xl overflow-hidden bg-black">
                  <video
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                    playsInline
                  >
                    <source src={aboutVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>
    </>

  )
}
