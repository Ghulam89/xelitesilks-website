import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="relative w-12 h-12">
        {/* Outer circle */}
        <div className="absolute w-full h-full rounded-full border-4 border-gray-300 border-t-transparent animate-spin"></div>
        
        {/* Inner circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-blue-500 border-t-transparent animate-spin animation-delay-150"></div>
      </div>
      
      {/* Optional loading text */}
      <span className="ml-3 text-gray-600">Loading...</span>
    </div>
  );
};

export default LoadingIndicator;