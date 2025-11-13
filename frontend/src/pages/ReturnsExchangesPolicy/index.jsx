import React from 'react'
import banner from '../../assets/images/about-banner.webp';
import { Link } from 'react-router-dom';
import TopNav from '../../components/Header/TopNav';
import Navbar from '../../components/Header/Navbar';
import Footer from '../../components/Footer/Footer';

const  ReturnsExchangesPolicy =()=> {
  return (
    <>
       <TopNav/>
       <Navbar/>
      <div className='bg-[#f7f3ef]'>
        <div className='container-fluid mx-auto'>
          <div
            className="md:pt-30 pt-10 md:pb-40 pb-10 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${banner})` }}
          >
            <div className="text-center w-full">
              <div className="flex flex-col bg-[#ffffffca] justify-center items-center gap-4 md:p-10 p-3 rounded-md md:w-2xl w-[300px] mx-auto">
                <h3 className="md:text-4xl text-lg font-semibold text-[#454444] md:leading-10 leading-6">
                  Our Returns and Exchanges Policy
                </h3>
                <span className="md:text-lg text-sm text-gray-500">
                  Homepage / Our Returns and Exchanges Policy
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* === Content Section === */}
        <div className="container mx-auto md:py-20 py-10 md:px-10 px-5">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
            <h2 className="text-2xl font-semibold text-[#05345D] mb-5">
              Return & Exchange Policy
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              We at <span className="font-semibold text-[#c5a980]">Xelitesilks</span> want
              you to be happy with your purchase. If for any reason you wish to
              return or exchange an item, please follow these steps:
            </p>

            <ul className="list-disc pl-6 text-gray-600 space-y-3">
              <li>
                Please contact us{' '}
               <Link to={'/'} className="text-[#c5a980] underline hover:text-[#b48d63]">here</Link>{' '}
                within 14 days of receiving your item (except during extended
                holiday periods) with your name, email, and order number. We’re a
                small family-run company and will respond within 2 business days
                (usually sooner).
              </li>

              <li>
                <span className="font-semibold text-[#05345D]">US Returns:</span> We’ll
                email you a prepaid return label free of charge. Please note that
                any original shipping costs are non-refundable.
              </li>

              <li>
                <span className="font-semibold text-[#05345D]">
                  International Returns:
                </span>{' '}
                We’ll provide the return address in Texas, USA. You’re responsible
                for return shipping and any customs/duties fees.
              </li>

              <li>
                Items must be shipped back within 5 business days of return
                authorization, in original condition and packaging. If you need
                more time, contact us to discuss options.
              </li>
            </ul>

            <p className="text-gray-600 mt-6">
              If the above conditions are met, we’ll issue a full refund within 7
              days of receiving your item.
            </p>

            <p className="text-gray-600 mt-4">
              We reserve the right not to accept returns that do not meet these
              conditions.
            </p>

            <div className="mt-10 border-t pt-6">
              <h3 className="text-lg font-semibold text-[#05345D] mb-2">
                Changes & Cancellations
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We ship orders within 0–2 business days. If you need to make
                changes, please contact us as soon as possible. We’ll do our best
                to accommodate your request. Contact us{' '}
                <a href="#" className="text-[#c5a980] underline hover:text-[#b48d63]">
                  here
                </a>
                .
              </p>
            </div>

            <p className="text-gray-600 mt-6">
              If you have any questions about our return policy, please reach out —
              your satisfaction is important to us.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default ReturnsExchangesPolicy
