import React, { useEffect, useState } from 'react';
import Accordion from '../common/Accordion';
import Button from '../common/Button';
import axios from 'axios';
import { BaseUrl } from '../../utils/BaseUrl';
import faq from '../../assets/images/faq.png';
const FAQ = () => {
  const [accordions, setAccordions] = useState([]);

  const toggleAccordion = (accordionKey) => {
    const updatedAccordions = accordions.map((accordion) => {
      if (accordion._id === accordionKey) {
        return { ...accordion, isOpen: !accordion.isOpen };
      } else {
        return { ...accordion, isOpen: false };
      }
    });

    setAccordions(updatedAccordions);
  };

  const fetchFaqs = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/faq/getAll`);
      // Map the API data to match your component's expected structure
      const formattedAccordions = response?.data?.data.map((faq, index) => ({
        ...faq,
        key: faq._id,
        isOpen: false,
        customKey: index < 9 ? `0${index + 1}` : `${index + 1}`
      }));
      setAccordions(formattedAccordions || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <div className="">
      <div className="sm:max-w-7xl max-w-[95%] mx-auto">
        <div className="">
          <div className="text-center">
            <h2 className="sm:text-[35px] text-[25px]  pt-7    font-sans   font-[600] text-[#333333]">FAQ's</h2>
             <Button
                                 rIcons={
                                   <svg
                                     width="26"
                                     height="26"
                                     viewBox="0 0 26 26"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
                                   >
                                     <circle cx="13" cy="13" r="12.5" fill="currentColor" stroke="black" />
                                     <path
                                       d="M10.6367 15.3636L14.7731 11.2273M14.7731 11.2273L15.364 13.5909M14.7731 11.2273L12.4094 10.6364"
                                       stroke="white"
                                       strokeWidth="1.5"
                                     />
                                   </svg>
                                 }
                                 label="View All"
                                 className="mt-5 mx-auto border-2 border-[#C5A980] bg-[#C5A980] text-black hover:bg-white hover:text-black hover:border-[#C5A980]"
                               />
          </div>
          
          <div className="flex sm:flex-row flex-col justify-between sm:gap-5 gap-0">
            <div className="sm:w-12/12 w-full">
              <div className="mt-12">
                {accordions?.map((accordion) => (
                  <Accordion
                    key={accordion._id}
                    id={accordion._id}
                    title={accordion.question}
                    data={accordion.answer}
                    isOpen={accordion.isOpen}
                    toggleAccordion={() => toggleAccordion(accordion._id)}
                    customKey={accordion.customKey}
                  />
                ))}
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;