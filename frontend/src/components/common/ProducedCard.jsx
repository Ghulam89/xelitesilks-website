import React from "react";

const ProducedCard = ({ data }) => {
  return (
    <div className="bg-white rounded-md p-4">
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 items-center">
        {data.map((item) => (
          <div
            key={item.title}
            className="col-span-1 border rounded-lg p-4 border-[#333333] min-h-[200px] hover:-translate-y-3 transform transition duration-300 ease-in-out"
          >
            <div className="pt-2 text-center">
              <strong className="font-semibold text-[#333]">{item?.title}</strong>
              <p className="text-[16px] text-[#333]">{item?.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProducedCard;
