import React from 'react';
import Button from '../../components/common/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4 text-center text-gray-800 font-sans relative overflow-hidden">
      {/* Subtle floating elements */}
      <div className="absolute top-1/4 left-1/5 opacity-30">
        <svg className="w-12 h-12 animate-float delay-100" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="absolute top-1/3 right-1/4 opacity-30">
        <svg className="w-10 h-10 animate-float delay-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M11.933 13.069s7.059-5.094 6.276-10.924a.465.465 0 00-.112-.268.436.436 0 00-.263-.115C12.137.961 7.16 8.184 7.16 8.184c-4.318-.517-4.004.344-5.974 5.076-.377.902.234 1.213.904.959l2.148-.811 2.59 2.648-.793 2.199c-.248.686.055 1.311.938.926 4.624-2.016 5.466-1.694 4.96-6.112z" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 left-1/3 opacity-30">
        <svg className="w-14 h-14 animate-float delay-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="absolute bottom-1/3 right-1/5 opacity-30">
        <svg className="w-8 h-8 animate-float delay-700" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-2xl space-y-6">
        <div className="inline-block relative">
          <h1 style={{fontSize:'60px'}} className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-2">
            404
          </h1>
          <div className="absolute -right-6 -top-2 text-3xl">👋</div>
        </div>
        
        <h2 className="text-3xl font-semibold text-gray-700">
          Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="pt-4">
        
          <Button  label={'Return to Homepage'}  className=" bg-[#4440E6]  text-white"  />
        </div>
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-grid-gray-300" style={{ backgroundSize: '40px 40px' }}></div>
      </div>
    </div>
  );
};

export default NotFound;