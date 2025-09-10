import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';

const ProductCard = () => {
  const [activeColor, setActiveColor] = useState('orange');
  const [isHovered, setIsHovered] = useState(false);

  const colorVariants = [
    { name: 'orange', bg: 'bg-orange-500', image: 'https://modavereact.vercel.app/images/products/womens/women-172.jpg' },
    { name: 'dark-pink', bg: 'bg-pink-800', image: 'https://modavereact.vercel.app/images/products/womens/women-171.jpg' }
  ];

  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <div className="card-product transition-all duration-300 ease-in-out animate-fade-in-up group">
      <div 
        className="card-product-wrapper relative rounded-lg overflow-hidden z-20 aspect-[1/1.33]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Images */}
        <a className="product-img flex w-full h-full relative items-stretch" href="/product-detail/6">
          <img
            className={`lazyload img-product object-cover object-center w-full h-full transition-opacity duration-700 ${
              isHovered ? 'opacity-0' : 'opacity-100'
            }`}
            alt="Faux-leather trousers"
            src="https://modavereact.vercel.app/images/products/womens/women-172.jpg"
          />
          <img
            className={`lazyload img-hover object-cover object-center w-full h-full absolute top-0 left-0 transition-opacity duration-700 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            alt="Faux-leather trousers"
            src="https://modavereact.vercel.app/images/products/womens/women-171.jpg"
          />
        </a>


        {/* Action Buttons - Appear from right on hover */}
        <div className={`list-product-btn absolute top-3 right-3 flex flex-col space-y-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}>
          <a className="box-icon wishlist btn-icon-action bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-all relative group/icon">
            <FiHeart />
            <span className="tooltip absolute -left-20 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap">
              Wishlist
            </span>
          </a>
         
          <a className="box-icon quickview tf-btn-loading bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-all relative group/icon">
            <FaEye />

            <span className="tooltip absolute -left-20 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap">
              Quick View
            </span>
          </a>
        </div>

        {/* Add to Cart Button - Appears from bottom on hover */}
        <div className={`list-btn-main absolute bottom-3 left-0 right-0 flex justify-center transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <a className="btn-main-product bg-black text-white py-2 px-6 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer">
            ADD TO CART
          </a>
        </div>
      </div>

      {/* Product Info */}
      <div className="card-product-info mt-3">
        
        <span className="price text-[#404041] font-bold block mt-1">27" x 27" (22 x 180cm)</span>
        <a className="title text-lg  link text-[#404041]  font-medium hover:text-gray-600 transition-colors block" href="/product-detail/6">
          Faux-leather trousers
        </a>
        <span className="price text-lg  text-[#404041] font-bold block mt-1">$79.99</span>
        
        {/* Color Variants */}
        <ul className="list-color-product flex space-x-2 mt-2">
          {colorVariants.map((color) => (
            <li 
              key={color.name}
              className={`list-color-item color-swatch cursor-pointer p-0.5 rounded-full border-2 ${
                activeColor === color.name ? 'border-gray-800' : 'border-transparent'
              }`}
              onClick={() => setActiveColor(color.name)}
            >
              <span className={`swatch-value ${color.bg} block w-5 h-5 rounded-full`}></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductCard;