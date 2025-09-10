import React from 'react'
import { FaCircleNotch } from "react-icons/fa";
import IndustryStandard from '../../assets/images/Industry-standard.webp'

function WeFulfil() {
  return (
    <div className='max-w-[1200px] mt-5 mx-auto text-center rounded-[8px] p-4 md:p-5'>
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-6 md:gap-10'>
        <div className='flex items-center justify-center'>
          <img 
            src={IndustryStandard} 
            className=' w-full h-auto max-w-[600px] object-cover' 
            alt='Industry Standard Packaging' 
            loading='lazy'
          />
        </div>

        <div className='flex flex-col items-start justify-center space-y-4 md:space-y-5'>
          <h2 className="sm:text-[35px] text-[25px]   leading-9    text-start  font-sans   font-[600] text-[#333333] ">
            We Fulfil the standards of the Packaging Industry.
          </h2>
          
          <p className='text-[#333333] text-sm md:text-[14px] text-left'>
            Umbrella Custom Packaging follows strict standards, much like a recipe, ensuring each box is the right size, 
            crafted from top-quality materials, and designed to perfection. With attention to detail and quality control, 
            they deliver custom boxes that are both reliable and customized to your preferences.
          </p>
          
          <div className='grid grid-cols-1 sm:grid-cols-2 pt-6 gap-4 w-full'>
            <div className='space-y-1'>
              {[
                "Easy User Interface",
                "Smart Pricing System",
                "Free Template/Die Line",
                "3D Design Studio",
                "Secure Payment Methods",
                "Free Physical Sampling",
                "Free Sample Kit",
                "Free Shipping",
                "Free Lamination"
              ].map((item, index) => (
                <div key={index} className='flex items-center space-x-2 group'>
                  <FaCircleNotch className=' group-hover:scale-125 transition-transform' />
                  <span className='text-sm md:text-[16px]'>{item}</span>
                </div>
              ))}
            </div>
            
            <div className='space-y-1'>
              {[
                "No Plate/Die Charges",
                "Low MOQs",
                "Free Lamination",
                "Fastest Turnaround",
                "Pantone Matching System",
                "Quality Control/Quality Assurance",
                "Trained Support Staff",
                "FSC-Certified Printing Materials",
                "Fast Customer Service"
              ].map((item, index) => (
                <div key={index} className='flex items-center space-x-2 group'>
                  <FaCircleNotch className=' group-hover:scale-125 transition-transform' />
                  <span className='text-sm md:text-[16px]'>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeFulfil