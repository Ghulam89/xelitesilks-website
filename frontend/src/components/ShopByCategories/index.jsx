import React from "react";

const ShopByCategories = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0 py-12">
      <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">
        Shop By Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Left - Women */}
        <div className="relative rounded-xl overflow-hidden shadow-sm">
          <img
            src="https://elizabetta.net/cdn/shop/files/luxury-silk-shawls_400x.svg?v=1746461148"
            alt="Women"
            className="w-full h-full  object-cover"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <h4 className="bg-white text-gray-800  font-medium py-2 px-5 rounded-full shadow-md">
              Women 
            </h4>
          </div>
        </div>

        {/* Middle - 2 stacked (Promotion + Accessories) */}
        <div className="grid grid-rows-2 gap-6">
          <div className="relative rounded-xl overflow-hidden shadow-sm">
            <img
              src="https://modavereact.vercel.app/images/collections/grid-cls/promotion-cls.jpg"
              alt="Promotion"
              className="w-full  object-cover"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <span className="bg-white text-gray-800 text-sm font-medium py-2 px-5 rounded-full shadow-md">
                Promotion
              </span>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-sm">
            <img
              src="https://modavereact.vercel.app/images/collections/grid-cls/accessories-cls.jpg"
              alt="Accessories"
              className="w-full object-cover"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <span className="bg-white text-gray-800 text-sm font-medium py-2 px-5 rounded-full shadow-md">
                Accessories
              </span>
            </div>
          </div>
        </div>

        {/* Right - Men */}
        <div className="relative rounded-xl overflow-hidden shadow-sm">
          <img
            src="https://modavereact.vercel.app/images/collections/grid-cls/men-cls.jpg"
            alt="Men"
            className="w-full  object-cover"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <span className="bg-white text-gray-800 text-sm font-medium py-2 px-5 rounded-full shadow-md">
              Men
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopByCategories;
