import React from "react";
import Tabs from "../common/Tabs";
import SpecialCard from "../common/SpecialCard";
import ProducedCard from "../common/ProducedCard";
const CustomPackagingProduced = () => {
  const customBox = [
    {
      id: 1,
      title: "Price Quote",
      data: [
        {
          title: "Get Price Quote",
          desc: "Submit a request for free custom quote first through our website or calling our customer service representative. You will have the prices in 30 minutes.",
        },
        {
          title: "Price Matching",
          desc: "Match the price with your budget line and ask the representative to beat that. We will try our best to give you the lowest possible prices here at Umbrella Custom Packaging.",
        },
        {
          title: "Price Approval",
          desc: "Give your approval on the prices to proceed with the order right away. We will be delighted to take you on board with Umbrella Custom Packaging throughout your packaging needs.",
        },
      ],
    },
    {
      id: 2,
      title: "Design Approval",
      data: [
        {
          title: "Mockup/design Creation",
          desc: "Share your artwork file to the dedicated representative so that our design department can create a 3D digital mockup for you. You can ask for the template to design it by your own as well.",
        },
        {
          title: "Design Suggestions",
          desc: "It’s a very important step. Our Creative design team can provide you some creative design suggestions if you ask for that. It’s a certain value addition to your packaging.",
        },
        {
          title: "Mockup/design Approval",
          desc: "After you receive a 3D digital Mockup for your packaging, you need to approve that in order to proceed ahead. You can ask for frequent changes until it satisfies you before you approve it.",
        },
      ],
    },
    {
      id: 3,
      title: "Payment",
      data: [
        {
          title: "Credit/Debit Card",
          desc: "The next step is to make the payment and our payment methods are very secure. the first one is that you can make it through your debit/card.",
        },
        {
          title: "PayPal",
          desc: "The other method is for the PayPal users. We accept the payments through PayPal as well. Refund Policy is mentioned on our website.",
        },
        {
          title: "Wire/ACH Bank Transfer",
          desc: "For the bigger amounts we suggest Wire/ACH bank transfers in order to avoid the payment processor’s taxes.",
        },
      ],
    },
    {
      id: 2,
      title: "Production",
      data: [
        {
          title: "Final Specification Sheet",
          desc: "A final specification sheet will be sent to you before we send your order towards to the production after the payment.",
        },
        {
          title: "Prototyping/Sampling",
          desc: "The sample run will be sent to the customer before the bulk order if it’s required or if the customer go for it.",
        },
        {
          title: "Order Production",
          desc: "The order will be produced in the given time span and will be sent toward the Quality Control unit before shipping.",
        },
      ],
    },
    {
      id: 2,
      title: "Shipping",
      data: [
        {
          title: "Quality Control",
          desc: "Our QC department will check the order and approve it after certain text if it comes good. After It will be sent to the shipping department.",
        },
        {
          title: "Shipping",
          desc: "The Order will be shipped right away after it is cleared from the QC department. Tracking ID will be provided and the order will be delivered.",
        },
        {
          title: "Customer’s Review",
          desc: "The customer’s thoughts and suggestions on the order will be taken and displayed on our media. Also, the issue will be addressed.",
        },
      ],
    },
    {
      id: 2,
      title: "Recorders",
      data: [
        {
          title: "Dedicated Support Person",
          desc: "One of our customer service representative will be appointed to the customer whoever places the order with us. He/she will keep the customer in a loop so to make the next order placement super easy for both the customer and company.",
        },
        {
          title: "Discounts",
          desc: "The customer will be regularly informed about the discounts that the company offers every month and year like month-end and Christmas discounts.",
        },
        {
          title: "Long Term Business Partnership",
          desc: "Umbrella Custom Packaging will ultimately build this route to a successful and profitable business relationship with the customer.",
        },
      ],
    },
  ];

  const data = customBox.map((box) => ({
    title: box.title,
    content: <ProducedCard {...box} />,
  }));

  return (
    <div className="sm:max-w-6xl bg-[#F7F7F7] p-3 py-9 rounded-xl max-w-[95%] mx-auto">
      <div className="text-center pb-3">
          <h2 className="sm:text-[35px] text-[25px]     font-sans   font-[600] text-[#333333] ">
          Simple Steps to get the Custom Packaging Produced
        </h2>
        <p className=" pt-3 text-gray-600">
          Following are few steps which provide the complete Guide.
        </p>
      </div>
      <div className="">
        <Tabs defaultTab={"Price Quote"} className={' bg-white'} tabs={data} />
      </div>
    </div>
  );
};

export default CustomPackagingProduced;
