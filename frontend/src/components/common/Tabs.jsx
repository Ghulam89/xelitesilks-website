import React, { useState } from "react";

const Tabs = ({ tabs, defaultTab, className }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <div>
      <div className="flex   gap-3  overflow-x-auto whitespace-nowrap">
        {tabs.map((tab) => (
          <button
            key={tab.title}
            className={`px-4 cursor-pointer transition-all duration-300 ease-in-out  rounded-lg text-sm py-4.5  ${
              activeTab === tab.title
                ? "  bg-[#4440E6]     opacity-50  w-full text-white"
                : `  w-full  hover:bg-[#4440E6]  ${className}   hover:border-[#4440E6] opacity-90  border-gray-300`
            }`}
            onClick={() => setActiveTab(tab.title)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.map((tab) => (
          <div
            key={tab.title}
            className={activeTab === tab.title ? "" : "hidden"}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
