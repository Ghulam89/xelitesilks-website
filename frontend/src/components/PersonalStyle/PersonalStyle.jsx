import { useState } from 'react';
import personal from '../../assets/videos/video.mp4'
import Button from '../common/Button';
export default function PersonalStyle() {
  const [activeTab, setActiveTab] = useState('craftsmanship');

  return (
    <div className="">
    


      {/* Craftsmanship Section */}
      <section className="py-12  px-3 mt-16 bg-[#f7f3ef]">
        <div className="  max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h2 className="text-3xl font-serif mb-6">Xelite Silks: Over Story</h2>
            <p className="mb-4">
              Since Roman times, the creation of beautiful textiles and fashion has always been an integral part of Italy. This expertise is still alive today and we are delighted to bring this quality to you while supporting local artisan workshops.
            </p>
            <p>
              Our accessories are made exclusively in Italy, where Elizabetha and her daughter Francesca have lived for many years.
            </p>

     <Button
  rIcons={
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="13" r="12.5" fill="currentColor" stroke="black"/>
      <path d="M10.6367 15.3636L14.7731 11.2273M14.7731 11.2273L15.364 13.5909M14.7731 11.2273L12.4094 10.6364" stroke="white" strokeWidth="1.5"/>
    </svg>
  }
  label="Read More"
  className="mt-5 border-2 border-[#C5A980] bg-[#C5A980] text-black hover:bg-white hover:text-black hover:border-[#C5A980]"
/>

          </div>
          <div className="md:w-1/2  flex items-center justify-center">
            <div className=' sm:w-10/12 w-12/12'>
                  <video
                               controls
                               autoPlay
                               className="w-full h-full object-cover rounded-xl"
                               playsInline
                             >
                               <source src={personal} type="video/mp4" />
                               Your browser does not support the video tag.
                             </video>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 bg-stone-50">
        <div className="   max-w-7xl mx-auto px-4">
          <div>
                     <h2 className="text-3xl font-semibold text-center   mb-2 text-gray-800">
our personal style</h2>
            <p className=' text-center text-lg font-medium'>is saying who you are without having to speak</p>
          </div>
          

          <div className=' grid sm:grid-cols-3 grid-cols-1 gap-5 mt-10'>
            <div className=" bg-[#F7F3EF] px-5 py-8 rounded-lg">
          <h2 className="text-2xl font-serif mb-5">Italian craftsmanship</h2>
          <p className="mb-4">
            Your happiness is our priority and we are committed to providing you with the best customer service and quality products.
          </p>
         
        </div>
            <div className="  bg-[#F7F3EF] px-5 py-8 rounded-lg">
          <h2 className="text-2xl font-serif mb-5">Love it or your money back</h2>
          <p className="mb-4">
            Your happiness is our priority and we are committed to providing you with the best customer service and quality products.
          </p>
         
        </div>
            <div className=" bg-[#F7F3EF] px-5 py-8 rounded-lg">
          <h2 className="text-2xl font-serif mb-5">It's all in the family</h2>
          <p className="mb-4">
            Your happiness is our priority and we are committed to providing you with the best customer service and quality products.
          </p>
         
        </div>
          </div>
         
        </div>
      </section>

      
    
    </div>
  );
}