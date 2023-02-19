import React from 'react';

export const LargeSpinner = () => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    </div>
  );
};

export const SmallSpinner = () => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#FEE715FF] shadow-md"></div>
      </div>
    </div>
  );
};
