import React from "react";
const SpecialCard = ({images}) => {
  return (
    <div className="bg-white rounded-md p-4">
      <div className=" grid sm:grid-cols-3 grid-cols-1 gap-4 items-center">
        {images.map((image) => (
          <div className="col-span-1  hover:-translate-y-3 transform transition duration-300 ease-in-out">
            <div className="">
              <img src={image} alt="" className=" rounded-lg w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialCard;
