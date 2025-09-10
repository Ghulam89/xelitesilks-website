import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
function PackagingBanner({
  bgImage,
  title,
  subTitle,
  url
}) {
  return (
    
    <div className=' sm:max-w-6xl max-w-[95%] my-2 mt-5 mx-auto rounded-[8px] h-[300px] p-5 bg-[#00000084] bg-cover bg-no-repeat bg-blend-multiply' style={{backgroundImage:`url(${bgImage})`}}>
     <div className=' md:max-w-4xl max-w-[100%] mx-auto'>
      <div className='flex flex-col justify-center items-center h-[300px]'>
     <strong className='text-center sm:text-[14px] text-[13px] text-[#E97900] font-semibold' >{title}</strong>
      <label className='md:text-[38px] text-[20px] font-semibold leading-9 pt-2 text-center text-[#fff]' >{subTitle}</label>
      <Link to={url}>
       <Button className='bg-[#4440E6] mt-4 text-white' label={"Order Kraft Packaging"}/></Link>
     
      </div>
     </div>
      </div>
   
      
  
  )
}

export default PackagingBanner
