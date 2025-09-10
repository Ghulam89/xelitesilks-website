import { BiSupport } from "react-icons/bi";
import { LiaShippingFastSolid } from "react-icons/lia";

const ServicesBanner = () => {
  const services = [
    {
      icon: (
        <LiaShippingFastSolid size={40} />

      ),
      title: "Free Shipping",
      description: "Free shipping on all US order or order above $200."
    },
    {
      icon: (
        <BiSupport size={40} />

      ),
      title: "Support 24/7",
      description: "Contact us 24 hours a day, 7 days a week."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: "14-Days Returns",
      description: "Simply return it within 30 days for an exchange."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "100% Payment Secure",
      description: "We ensure secure payment with PEV."
    }
  ];

  return (
    <div className="  pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center justify-center  gap-3 p-6 bg-white rounded-lg   transition-shadow duration-300">
              <div className="text-black mb-2">
                {service.icon}
              </div>
             <div>
                 <h3 className="  text-gray-800 text-2xl  mb-1">{service.title}</h3>
              <p className="text-gray-600 pt-2 text-sm">{service.description}</p>
             </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesBanner;