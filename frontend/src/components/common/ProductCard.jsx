import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from './Button';
import AddToCartSideMenu from './AddToCartSideMenu';
import { addToCart } from '../../store/productSlice';
import { BaseUrl } from '../../utils/BaseUrl';
import { useDispatch } from 'react-redux';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { name, slug, images, actualPrice, size, color } = product;

  const primaryImage = images?.[0]?.url || '';
  const hoverImage = images?.[1]?.url || primaryImage;
  const [activeColor, setActiveColor] = useState('orange');


  const [showCartSideMenu,setShowCartSideMenu] = useState(false)


  const dispatch  = useDispatch()
  return (
    <div className="card-product transition-all duration-300 ease-in-out group">
      <div
        className="card-product-wrapper relative rounded-lg overflow-hidden z-20 aspect-[1/1.3] shadow hover:shadow-lg bg-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Images */}
        <Link to={`/${slug}`} className="product-img flex w-full h-full relative items-stretch">
          <img
            className={`object-cover object-center w-full h-full transition-opacity duration-700 ${isHovered ? 'opacity-0' : 'opacity-100'
              }`}
            alt={name}
            src={`${BaseUrl}/${primaryImage}`}
          />
          <img
            className={`object-cover object-center w-full h-full absolute top-0 left-0 transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            alt={name}
            src={`${BaseUrl}/${hoverImage}`}
          />
        </Link>

        {/* Action Buttons */}
        <div className={`absolute top-3 right-3 flex flex-col space-y-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
          <button className="bg-white hover:bg-[#C5A980] hover:text-white rounded-full w-10 h-10 flex items-center justify-center shadow hover:shadow-md">
            <FiHeart />
          </button>
          <button className="bg-white rounded-full hover:bg-[#C5A980] hover:text-white w-10 h-10 flex items-center justify-center shadow hover:shadow-md">
            <FaEye />
          </button>
        </div>

        {/* Add to Cart Button */}
        <div className={`absolute bottom-3 left-0 right-0 flex justify-center transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
          <Button

           onClick={() => {
                            dispatch(
                              addToCart({
                                _id: product._id,
                                image:images?.[0]?.url,
                                title: product.name,
                                price: product.actualPrice,
                                description: product.description,
                                quantity: 1,
                              })
                            )
                            // navigate('/cart')
                            setShowCartSideMenu(true)
                          }}

            rIcons={
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="13" cy="13" r="12.5" fill="currentColor" stroke="black" />
                <path d="M10.6367 15.3636L14.7731 11.2273M14.7731 11.2273L15.364 13.5909M14.7731 11.2273L12.4094 10.6364" stroke="white" strokeWidth="1.5" />
              </svg>
            }
            label="Add To Cart"
            className="mt-5 border-2   sm:text-base text-sm whitespace-nowrap border-[#C5A980] bg-[#C5A980] text-black hover:bg-white hover:text-black hover:border-[#C5A980]"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-3 px-2">
        <span className="price text-gray-500 sm:text-base text-sm  font-semibold block mt-1">{size}</span>
        <Link to={`/${slug}`} className="title sm:text-lg text-sm link text-[#404041] font-medium hover:text-gray-600 transition-colors block">
          {name}
        </Link>
        <span className="price text-lg text-[#404041]  font-semibold block mt-1">$ {actualPrice}</span>
        <ul className="list-color-product flex space-x-1 mt-2">
          {color.map((clr) => (
            <li
              key={clr}
              className={`cursor-pointer p-0.5 rounded-full border-2 ${activeColor === clr ? 'border-gray-800' : 'border-transparent'}`}
              onClick={() => setActiveColor(clr)}
            >
              <span style={{ backgroundColor: `${clr}` }} className={`block w-5 h-5 rounded-full`}></span>
            </li>
          ))}
        </ul>

      </div >

       {showCartSideMenu && (
        <AddToCartSideMenu onClose={() => setShowCartSideMenu(false)} />
      )}

    </div >
  );
};

export default ProductCard;
