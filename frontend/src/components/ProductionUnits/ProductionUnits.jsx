import React from 'react';
import UnitBG from '../../assets/images/bg-unit.webp';

function ProductionUnits() {
  return (
    <div className='bg-[#f4ecfb] mb-5 pb-1'>
      <div className='sm:max-w-6xl mb-3.5 max-w-[95%] mx-auto'>
        {/* Hero Section with Background Image */}
        <div 
          className='h-[300px] bg-contain flex justify-center items-center bg-no-repeat bg-center relative' 
          style={{ backgroundImage: `url(${UnitBG})` }}
          aria-label="Production units background"
        >
          <svg 
            width={80} 
            className="text-red-500" 
            aria-hidden="true" 
            viewBox="0 0 576 512" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
              fill="currentColor"
            />
          </svg>        
        </div>

        {/* Title */}
                  <h2 className="sm:text-[35px] text-[25px]   leading-10  text-center mb-4  font-sans   font-[600] text-[#333333] ">

          Umbrella Custom Packaging has Production Units <br className=' hidden md:block' /> Across the Globe
        </h2>

        {/* Features Grid */}
        <div className='grid md:grid-cols-3 grid-cols-1 gap-4 pb-4'>
          <div className='flex flex-col h-44 justify-center items-center bg-white rounded-lg md:p-6 p-5  hover:shadow-lg transition-shadow'>
            <strong className='text-[21px] font-[500]  text-center'>In-house Production</strong>
            <p className=' text-[#2E2D2D] font-normal text-center'>
             Umbrella Custom Packaging tend to rely on its in-house production units most of the time in order to expedite the orders for the customers.
            </p>
          </div>
          
          <div className='flex flex-col h-44 justify-center items-center bg-white rounded-lg md:p-6 p-5  hover:shadow-lg transition-shadow'>
            <strong className='text-[21px] font-[500]  text-center'>Offshore Printing Facilities</strong>
              <p className=' text-[#2E2D2D] font-normal text-center'>
Umbrella Custom Packaging have its various printing facilities outside USA where the orders are being produced at the lowest possible cost with same turnaround time.            </p>
          </div>
          
          <div className='flex flex-col justify-center items-center bg-white rounded-lg p-5  hover:shadow-lg transition-shadow'>
            <strong className='text-[21px] font-[500]  text-center'>Free Shipping</strong>
              <p className=' text-[#2E2D2D] font-normal text-center'>
Umbrella Custom Packaging make your order even more cost effective by providing you the free ground and air freight and delivers the orders on time.

            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductionUnits;