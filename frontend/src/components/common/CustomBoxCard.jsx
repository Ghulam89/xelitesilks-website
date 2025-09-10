import React from "react";
import Button from "./Button";

const CustomBoxCard = ({ title, subTitle, description, image, buttonUrl }) => {
  return (
    <div className="bg-[#F7F7F7] rounded-md p-2">
      <div className="flex  sm:flex-row  flex-col items-center">
        <div className="sm:w-6/12 w-full">
          <div className="sm:p-5 p-3">
                      <h2 className="sm:text-[35px] text-[25px]     font-sans   font-[600] text-[#333333] ">
{title}</h2>
            <h3 className="pt-4 sm:text-2xl text-xl"> <strong>{subTitle}</strong></h3>
            <p className="pt-2.5">{description}</p>
            <Button
              label={"Get Quote"}
              className="bg-[#4440E6] text-white mt-2 opacity-90"
              onClick={() => window.location.href = buttonUrl}
            />
          </div>
        </div>
        <div className="sm:w-6/12 w-full">
          <img
            src={image}
            className="rounded-lg"
            alt={title}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomBoxCard;