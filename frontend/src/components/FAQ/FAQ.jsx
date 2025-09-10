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
    <div style={{ backgroundImage: `url(${faq})` }} className="">
      <div className="sm:max-w-6xl max-w-[95%] mx-auto">
        <div className="">
          <div className="text-center">
            <h2 className="sm:text-[35px] text-[25px]  pt-7    font-sans   font-[600] text-[#333333]">FAQ's</h2>
            <Button label={'View All'} className="bg-[#4440E6] mx-auto text-white mt-2 opacity-90" />
          </div>
          
          <div className="flex sm:flex-row flex-col justify-between sm:gap-5 gap-0">
            <div className="sm:w-6/12 w-full">
              <div className="mt-12">
                {accordions.slice(0, Math.ceil(accordions.length / 2)).map((accordion) => (
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
            <div className="sm:w-6/12 w-full">
              <div className="sm:mt-12 mt-0">
                {accordions.slice(Math.ceil(accordions.length / 2)).map((accordion) => (
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