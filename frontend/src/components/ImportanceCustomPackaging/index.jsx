import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../../utils/BaseUrl';

const ImportanceCustomPackaging = () => {
  const [banner, setBannner] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const closeImageViewer = () => {
    setIsViewerOpen(false);
    document.body.style.overflow = 'auto';
  };

  const openImageViewer = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setIsViewerOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const fetchBanner = async () => {
    try {
      const respose = await axios.get(`${BaseUrl}/banner/getAll`);
      console.log(respose);
      const data = respose?.data?.data?.[0] || {};
      setBannner(data);
    } catch (error) {
      console.error(error);
    }
  };


  const getEmbedUrl = (url) => {
    if (!url) return '';
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return url;
  };

  useEffect(() => {
    fetchBanner();
  }, []);
  return (
    <div className="py-8 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className=' text-center sm:pb-6 pb-3'>
                  

                      <h2 className="sm:text-[40px] sm:pb-10 pb-0 sm:pt-4 pt-0 text-[25px]  flex md:flex-row flex-col justify-center sm:gap-1 gap-0  leading-9    font-sans   font-[600] text-[#333333] ">
What Is Custom Packaging? <h2 style={{color:'#4440E6'}} className=' m-0 '>A Complete Guide  </h2></h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 blog_content banner_content items-center">
          {/* Text Content */}
          <div dangerouslySetInnerHTML={{ __html: banner?.description}} className="w-full lg:w-1/2 bg-gray-50 h-[430px] p-4 overflow-y-auto">
             
          </div>
          
          {/* Image */}
         {/* Fixed version */}
<div className="w-full relative lg:w-1/2">
  <img 
    src={`${BaseUrl}/${banner?.image}`} 
    alt="Custom packaging example" 
    className="w-full h-auto rounded-xl shadow-md object-cover"
    loading="lazy"
  />

  <div onClick={()=>openImageViewer(banner?.Link)} className='absolute border-[#FF931E] text-[#FF931E] p-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 rounded-full cursor-pointer'>
    <svg width={50}  className='fill-current' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M371.7 238l-176-107c-15.8-8.8-35.7 2.5-35.7 21v208c0 18.4 19.8 29.8 35.7 21l176-101c16.4-9.1 16.4-32.8 0-42zM504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256z"></path>
    </svg>
  </div>
</div>
        </div>
      </div>

      {isViewerOpen && banner?.videoLink && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className='absolute top-4 right-4'>
            <button
              onClick={closeImageViewer}
              className="text-white text-3xl   cursor-pointer hover:text-gray-300"
            >
              &times;
            </button>
          </div>

          <div className="w-full max-w-8xl aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={banner?.videoLink}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}

    </div>
  );
};

export default ImportanceCustomPackaging;