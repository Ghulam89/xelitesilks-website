import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

import { useState } from 'react';

function FaqComp({ title, answer }) {
  const [accordion, setAccordion] = useState(false);

  const toggleAccordion = () => setAccordion(prev => !prev);
  return (
    <>
      <div>
        <button className={`w-full flex justify-between items-center text-start border-l-0 border-r-0 border-t-0  border-2 border-b-[#D9D9D987] p-3 text-lg font-semibold text-[#1f212f]'  ${accordion ? 'text-[#c5a980] border border-black' : 'text-[#000]'}`} onClick={toggleAccordion}>
          <span>{title}</span>
          <span>{accordion ? <IoIosArrowDown size={30} className='bg-[#000] text-[#fff] rounded-full p-1' /> : <IoIosArrowBack size={30} className='bg-[#c5a980] text-[#fff] rounded-full p-1' />}</span>
        </button>
        <div className={`grid overflow-hidden transition-all duration-400 ease-in-out text-slate-700 text-sm ${accordion ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>

          <div className='overflow-hidden text-start p-3  text-lg my-1'>
            {answer}

          </div>

        </div>

      </div>
    </>
  )
}

export default FaqComp
