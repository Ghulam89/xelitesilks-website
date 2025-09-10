import React from "react";
import Tabs from "../common/Tabs";
import SpecialCard from "../common/SpecialCard";
import special1  from "../../assets/images/special/special-product1.webp";
import special2  from "../../assets/images/special/special-product2.webp";
import special3  from "../../assets/images/special/special-product3.webp";
import special4  from "../../assets/images/special/special-product4.webp";
import special5  from "../../assets/images/special/special-product5.webp";
import special6  from "../../assets/images/special/special-product6.webp";
import special7  from "../../assets/images/special/special-product7.webp";
import special8  from "../../assets/images/special/special-product8.webp";
import special9  from "../../assets/images/special/special-product9.webp";
import special10  from "../../assets/images/special/special-product10.webp";
import special11  from "../../assets/images/special/special-product11.webp";
import special12  from "../../assets/images/special/special-product12.webp";
import special13  from "../../assets/images/special/special-product13.webp";
import special14  from "../../assets/images/special/special-product14.webp";
import special15  from "../../assets/images/special/special-product15.webp";
import special16  from "../../assets/images/special/special-product16.webp";
import special17  from "../../assets/images/special/special-product17.webp";
import special18  from "../../assets/images/special/special-product18.webp";

const SpecialPackaging = () => {
  const customBox = [
    {
      id: 1,
      title: "Embossing",
      
      images:[
        special1,
        special2,
        special3
      ]
    },
    {
      id: 2,
      title: "Debossing",
      images:[
        special4,
        special5,
        special6
      ]
    },
    {
        id: 2,
        title: "Silver Foiling",
        images:[
          special7,
        special8,
        special9
        ]
      },
      {
        id: 2,
        title: "Gold Foiling",
        images:[
           special10,
        special11,
        special2
        ]
      },
      {
        id: 2,
        title: "Spot UV",
        images:[
           special13,
        special4,
        special5
        ]
      },
      {
        id: 2,
        title: "Holographic",
        images:[
          special16,
        special17,
        special8
        ]
      },
  ];

  const data = customBox.map((box) => ({
    title: box.title,
    content: <SpecialCard {...box} />,
  }));

  return (
    
    <div className="sm:max-w-6xl bg-[#F7F7F7] p-3 max-w-[95%] mx-auto">
      <div className="text-center pb-3">
          <h2 className="sm:text-[35px] text-[25px]   leading-9     font-sans   font-[600] text-[#333333] ">
        Enhance Your Product Presentation with Our Special Packaging Features

        </h2>
       
      </div >
      <div className=" pt-2">
        <Tabs defaultTab={"Embossing"} className={' bg-white'} tabs={data} />
      </div>
    </div>
  );
};

export default SpecialPackaging;
