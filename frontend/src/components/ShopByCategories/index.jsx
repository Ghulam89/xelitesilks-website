import React from "react";
import cat1 from '../../assets/images/collection/cat1.jpeg';
import cat2 from '../../assets/images/collection/cat2.jpg';
import cat3 from '../../assets/images/collection/cat3.jpeg';
import cat4 from '../../assets/images/collection/cat4.jpeg';
import { Link } from "react-router-dom";

const ShopByCategories = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0 py-12">
      <h2 className="sm:text-3xl text-2xl font-semibold text-center mb-10 text-gray-800">
        Shop By Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Left - Shawls & Wraps */}
        <div className="relative group rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer">
          <img
            src={cat1}
            alt="Shawls & Wraps"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <button
              aria-label="Shop Shawls & Wraps"
              className="bg-white text-gray-800 text-sm font-semibold py-2 px-6 rounded-full shadow transition-all duration-300 group-hover:bg-gray-800 group-hover:text-white"
            >
              Shawls & Wraps
            </button>
          </div>
        </div>

        {/* Middle - Long Scarves & Handmade Ties */}
        <div className="grid grid-rows-2 gap-6">

          {/* Long Scarves */}
          <Link to={'/collections/womens-long-scarves-100-percent-made-in-italy'} className="relative group w-full h-64 rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer">
            <img
              src={cat3}
              alt="Long Scarves"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <button
                aria-label="Shop Long Scarves"
                className="bg-white text-gray-800 text-sm font-semibold py-2 px-6 rounded-full shadow transition-all duration-300 group-hover:bg-gray-800 group-hover:text-white"
              >
                Long Scarves
              </button>
            </div>
          </Link>

          {/* Handmade Ties */}
          <Link to={'/collections/italian-ties-luxury-neckties'} className="relative group w-full h-64 rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer">
            <img
              src={cat4}
              alt="Handmade Ties"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <button
                aria-label="Shop Handmade Ties"
                className="bg-white text-gray-800 text-sm font-semibold py-2 px-6 rounded-full shadow transition-all duration-300 group-hover:bg-gray-800 group-hover:text-white"
              >
                Handmade Ties
              </button>
            </div>
          </Link>
        </div>

        {/* Right - Men's Scarves */}
        <div className="relative group rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer">
          <img
            src={cat2}
            alt="Men's Scarves"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <button
              aria-label="Shop Men's Scarves"
              className="bg-white text-gray-800 text-sm font-semibold py-2 px-6 rounded-full shadow transition-all duration-300 group-hover:bg-gray-800 group-hover:text-white"
            >
              Men's Scarves
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopByCategories;
