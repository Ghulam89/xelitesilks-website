import React from 'react'
import banner from '../../assets/images/about-banner.webp'
import about1 from '../../assets/images/about1.jpg'
import TopNav from '../../components/Header/TopNav'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Header/Navbar'

const  ShippingNdPackaging = ()=> {
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
                    <div className=" text-center w-full">

                        <div className="flex flex-col bg-[#ffffffca] justify-center items-center gap-4 md:p-10 p-2 rounded-md md:w-2xl w-[300px] mx-auto">
                            <h3 className="md:text-4xl text-lg font-semibold text-[#454444]  text-balance md:leading-10 leading-6">Shipping and Packaging</h3>
                            <span className="md:text-lg text-sm text-gray-500">Homepage / Shipping and Packaging</span>

                        </div>
                    </div>
                </div>


            </div>
            <div className='container mx-auto mt-10'>
                {/**Main section */}
                <div className='flex flex-col justify-center items-center gap-5'>
                    <h4 className='md:text-4xl text-2xl font-semibold capitalize text-balance'>All orders are shipped from our warehouse in the USA</h4>
                    <p className='md:text-lg text-sm text-pretty text-center '>Please note, the business days listed below are Monday through Friday, excluding postal holidays.</p>

                    {/* UPDATED: Signature Required Alert */}
                    <div className='w-full max-w-2xl mt-10 p-4 border-l-4 border-red-500 bg-red-50 rounded-lg shadow-md'>
                        <p className='md:text-lg text-sm text-red-700 font-bold text-center'>
                            <span className="text-xl mr-2">⚠️</span> All orders over **$500** require a **signature for delivery**.
                        </p>
                    </div>

                    {/* UPDATED: UPS P.O. Box Alert */}
                    <div className='w-full max-w-2xl mb-10 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg shadow-md'>
                        <p className='md:text-lg text-sm text-blue-700 font-bold text-center'>
                            <span className="text-xl mr-2">🛑</span> **UPS does not deliver to P.O. boxes.** If you choose a UPS shipping option, please provide a **physical address**.
                        </p>
                    </div>

                </div>
              

                {/*  Shipping USA Table */}
                <div className='flex justify-center mt-20'>
                    <div className='w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100'>

                       
                        <table className='w-full text-left text-sm md:text-base'>
                             <caption className="p-5 bg-gray-50 border-b border-gray-200 font-bold text-xl text-gray-800 text-center">
                            Standard Shipping: USA
                        </caption>

                            <thead className='text-xs uppercase bg-gray-800 text-white tracking-wider'>
                                <tr>
                                    <th scope="col" className="p-4 rounded-tl-xl">Shipping Method</th>
                                    <th scope="col" className="p-4">Business Days After Shipping</th>
                                    <th scope="col" className="p-4 rounded-tr-xl">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Row 1: Free Shipping (highlighted) */}
                                <tr className='border-b border-gray-200 hover:bg-green-50 transition duration-150 ease-in-out'>
                                    <td className='p-4 font-medium text-gray-900'>USPS Ground</td>
                                    <td className='p-4 text-gray-700'>Usually 5-8 (not guaranteed)</td>
                                    <td className='p-4 font-bold text-green-600 text-lg'>Free</td>
                                </tr>
                                {/* Row 2 */}
                                <tr className='border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out'>
                                    <td className='p-4 font-medium text-gray-900'>USPS Priority</td>
                                    <td className='p-4 text-gray-700'>Usually 3-4 (not guaranteed)</td>
                                    <td className='p-4 font-semibold text-gray-700'>$10</td>
                                </tr>
                                {/* Row 3: Express (highlighted info) */}
                                <tr className='border-b border-gray-200 hover:bg-yellow-50 transition duration-150 ease-in-out'>
                                    <td className='p-4 font-medium text-gray-900'>Express (2-Day)</td>
                                    <td className='p-4 text-orange-600 font-medium'>2 (guaranteed, cutoff time 11 am CST)</td>
                                    <td className='p-4 font-semibold text-gray-700'>$25</td>
                                </tr>
                                {/* Row 4: Super Express (highlighted info) */}
                                <tr className='hover:bg-yellow-50 transition duration-150 ease-in-out'>
                                    <td className='p-4 font-medium text-gray-900'>Super Express (1-Day)</td>
                                    <td className='p-4 text-red-600 font-bold'>1 (guaranteed, cutoff time 11 am CST)</td>
                                    <td className='p-4 font-semibold text-gray-700'>$50</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='flex justify-center mt-20'>
                    <div className='w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100'>

                       
                        <table className='w-full text-left text-sm md:text-base'>
                             <caption className="p-5 bg-gray-50 border-b border-gray-200 font-bold text-xl text-gray-800 text-center">
                            Standard Shipping: USA
                        </caption>

                            <thead className='text-xs uppercase bg-gray-800 text-white tracking-wider'>
                                <tr>
                                    <th scope="col" className="p-4 rounded-tl-xl">Shipping Method</th>
                                    <th scope="col" className="p-4">Business Days After Shipping</th>
                                    <th scope="col" className="p-4 rounded-tr-xl">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Row 1: Free Shipping (highlighted) */}
                                <tr className='border-b border-gray-200 hover:bg-green-50 transition duration-150 ease-in-out'>
                                    <td className='p-4 font-medium text-gray-900'>USPS Ground</td>
                                    <td className='p-4 text-gray-700'>Usually 5-8 (not guaranteed)</td>
                                    <td className='p-4 font-bold text-green-600 text-lg'>Free</td>
                                </tr>
                                {/* Row 2 */}
                                <tr className='border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out'>
                                    <td className='p-4 font-medium text-gray-900'>USPS Priority</td>
                                    <td className='p-4 text-gray-700'>Usually 3-4 (not guaranteed)</td>
                                    <td className='p-4 font-semibold text-gray-700'>$10</td>
                                </tr>
                                {/* Row 3: Express (highlighted info) */}
                                <tr className='border-b border-gray-200 hover:bg-yellow-50 transition duration-150 ease-in-out'>
                                    <td className='p-4 font-medium text-gray-900'>Express (2-Day)</td>
                                    <td className='p-4 text-orange-600 font-medium'>2 (guaranteed, cutoff time 11 am CST)</td>
                                    <td className='p-4 font-semibold text-gray-700'>$25</td>
                                </tr>
                                {/* Row 4: Super Express (highlighted info) */}
                                <tr className='hover:bg-yellow-50 transition duration-150 ease-in-out'>
                                    <td className='p-4 font-medium text-gray-900'>Super Express (1-Day)</td>
                                    <td className='p-4 text-red-600 font-bold'>1 (guaranteed, cutoff time 11 am CST)</td>
                                    <td className='p-4 font-semibold text-gray-700'>$50</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='flex justify-center mt-20'>
                    <div className='w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100'>

                       
                        <table className='w-full text-left text-sm md:text-base'>
                             <caption className="p-5 bg-gray-50 border-b border-gray-200 font-bold text-xl text-gray-800 text-center">
                            Standard Shipping: USA
                        </caption>

                            <thead className='text-xs uppercase bg-gray-800 text-white tracking-wider'>
                                <tr>
                                    <th scope="col" className="p-4 rounded-tl-xl">Shipping Method</th>
                                    <th scope="col" className="p-4">Business Days After Shipping</th>
                                    <th scope="col" className="p-4 rounded-tr-xl">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Row 1: Free Shipping (highlighted) */}
                                <tr className='border-b border-gray-200 hover:bg-green-50 transition duration-150 ease-in-out'>
                                    <td className='p-4 font-medium text-gray-900'>USPS Ground</td>
                                    <td className='p-4 text-gray-700'>Usually 5-8 (not guaranteed)</td>
                                    <td className='p-4 font-bold text-green-600 text-lg'>Free</td>
                                </tr>
                                {/* Row 2 */}
                                <tr className='border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out'>
                                    <td className='p-4 font-medium text-gray-900'>USPS Priority</td>
                                    <td className='p-4 text-gray-700'>Usually 3-4 (not guaranteed)</td>
                                    <td className='p-4 font-semibold text-gray-700'>$10</td>
                                </tr>
                                {/* Row 3: Express (highlighted info) */}
                                <tr className='border-b border-gray-200 hover:bg-yellow-50 transition duration-150 ease-in-out'>
                                    <td className='p-4 font-medium text-gray-900'>Express (2-Day)</td>
                                    <td className='p-4 text-orange-600 font-medium'>2 (guaranteed, cutoff time 11 am CST)</td>
                                    <td className='p-4 font-semibold text-gray-700'>$25</td>
                                </tr>
                                {/* Row 4: Super Express (highlighted info) */}
                                <tr className='hover:bg-yellow-50 transition duration-150 ease-in-out'>
                                    <td className='p-4 font-medium text-gray-900'>Super Express (1-Day)</td>
                                    <td className='p-4 text-red-600 font-bold'>1 (guaranteed, cutoff time 11 am CST)</td>
                                    <td className='p-4 font-semibold text-gray-700'>$50</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

               
            </div>

              {/**section One */}
                        <div className='bg-[#f7f3ef]'>
                          <div className='container mx-auto md:p-10 p-5'>
                            <div className='grid md:grid-cols-2 grid-cols-1 gap-10'>
                              <div><img src={about1} alt="" className='w-full rounded-2xl shadow-2xl md:h-100 h-50 object-cover' /></div>
                              <div className='flex flex-col justify-center items-start gap-5'>
                                <h4 className='md:text-3xl text-2xl font-semibold capitalize text-balance'>It all started with a childhood in Rome</h4>
                                <p className='md:text-lg text-sm text-pretty'>Where my friends and I played in the piazzas and old streets which in the '60s and '70s  were populated with small artisanal shops where I shopped with my mother. My favorites were the fabric shops. I loved to sew and create things, and walls lined with rolls of fabrics fascinated me.</p>
                              </div>
                            </div>
                          </div>
                
                
                
                
                        </div>


        </div>
           <Footer/>

        </>
    )
}

export default ShippingNdPackaging
