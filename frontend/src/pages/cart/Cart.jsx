import React from "react";
import banner from "../../assets/images/about-banner.webp";
import fire from "../../assets/images/icon-fire.png";
import cartimg from "../../assets/images/product-cart.webp";
import { FaTrashAlt } from "react-icons/fa";
import { BaseUrl } from "../../utils/BaseUrl";
import { useDispatch, useSelector } from "react-redux";
import PageMetadata from "../../components/common/PageMetadata";
import TopNav from "../../components/Header/TopNav";
import Navbar from "../../components/Header/Navbar";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

function Cart() {

  

  const { productData: cartItems } = useSelector((state) => state.product);

  console.log(cartItems);
  const dispatch = useDispatch()


  const subtotal = cartItems?.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0) || 0;

  const total = subtotal;

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id, quantity: parseInt(newQuantity) }));
    }
  };

  const metadata = {
    title: "add to cart - Umbrella Custom Packaging",
    description: "Umbrella Custom Packaging",
    // keywords: "custom packaging, wholesale boxes, packaging solutions, affordable packaging, custom boxes, packaging design, eco-friendly packaging",
    author: "Umbrella Custom Packaging",
    ogUrl: `${BaseUrl}/cart`,
    ogTitle: "add to cart - Umbrella Custom Packaging",
    // ogDescription: "Our Blogs Simple Steps to get the Custom Packaging Produced Following are few steps which provide the complete Guide. Price Quote Payment Design Approval Production Shipping Reorders Get Price Quote Submit a request for free custom quote first through our website or calling our customer service representative. You will have the prices in 30 minutes. [&hellip;]",
    modifiedTime: "2025-06-13T15:18:43+00:00",
    twitterTitle: "add to cart - Umbrella Custom Packaging",
    // twitterDescription: "Our Blogs Simple Steps to get the Custom Packaging Produced Following are few steps which provide the complete Guide. Price Quote Payment Design Approval Production Shipping Reorders Get Price Quote Submit a request for free custom quote first through our website or calling our customer service representative. You will have the prices in 30 minutes. [&hellip;]",
    robots: "index, follow"
  };

  return (
    <>
     <TopNav />
     <Navbar />
    <PageMetadata {...metadata} />
      {/* Hero Banner */}
      <div className="container-fluid mx-auto">
        <div
          className="md:pt-30 pt-10 md:pb-20 pb-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="text-center w-full">
            <div className="flex flex-col bg-[#ffffffca] justify-center items-center gap-4 md:p-10 p-2 rounded-md md:w-2xl w-[300px] mx-auto">
              <h3 className="md:text-4xl text-lg font-semibold text-[#454444] md:leading-10 leading-6">
                Cart
              </h3>
              <span className="md:text-lg text-sm text-gray-500">
                Homepage / Cart
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Cart Section */}
      <div className="container mx-auto py-10 px-2">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Side - Cart Items */}
          <div className="col-span-12 md:col-span-8 space-y-6">
            {/* Cart Notice */}
            
              <div className="flex md:flex-row flex-col justify-center items-center p-3 bg-[#fff3f3] gap-3 rounded-md text-base text-red-600 font-medium shadow-sm animate-pulse">
                <img src={fire} alt="alert" className="h-6" />
                <p className="text-center">Your cart will expire in <span className="font-bold">10:00</span> minutes! Checkout now before items sell out!</p>
                
              </div>
          

            {/* Cart Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b bg-gray-100 text-gray-700">
                    <th className="p-3">Product</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Total</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                 

                  {
                    cartItems?.map((item,index)=>{
                      return (
 <tr className="border-b hover:bg-gray-50 transition">
                    <td className="p-3">
                      <div className="flex sm:flex-col lg:flex-col flex-col gap-3 items-center">
                        <img
                          src={item?.image}
                          alt="product"
                          className="h-20 w-20 object-cover rounded-md shadow-sm"
                        />
                        <h5 className="text-sm md:text-base font-medium text-gray-700 whitespace-nowrap">
                          {item?.title}
                        </h5>
                      </div>
                    </td>
                    <td className="p-3 text-gray-600">${item?.price}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <button className="px-2 h-10 w-10 text-2xl text-center py-1 border border-gray-300 rounded hover:bg-gray-100 bg-[#c5a980]">-</button>
                        <input
                          type="text"
                          value="2"
                          readOnly
                          className="w-20 h-10 text-center border rounded"
                        />
                        <button className="px-2 h-10 w-10 text-2xl text-center py-1 border border-gray-300 rounded hover:bg-gray-100 bg-[#c5a980]">+</button>
                      </div>
                    </td>
                    <td className="p-3 font-semibold text-gray-700">$190.00</td>
                    <td className="p-3 text-center">
                      <button  className="text-red-500 hover:text-red-700">
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                      )
                    })
                  }
                 
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Side - Cart Summary */}
          <div className="col-span-12 md:col-span-4">
            <div className="bg-white shadow-lg rounded-lg p-6 space-y-5">
              <h4 className="text-lg font-semibold text-gray-700 border-b pb-3">
                Cart Summary
              </h4>
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>$315.00</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>$15.00</span>
              </div>
              <div className="flex justify-between text-gray-800 font-semibold text-lg border-t pt-3">
                <span>Total</span>
                <span>$330.00</span>
              </div>
              <Link to={'/checkout'} className="">
              <button className="w-full py-3 rounded-md bg-[#c5a980] text-white font-medium hover:bg-[#b4976e] transition">
                Proceed to Checkout
              </button>
              </Link>
              
              <button className="w-full py-3 mt-4 rounded-md border border-[#c5a980] text-[#c5a980] font-medium hover:bg-[#c5a980] hover:text-white transition">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Cart;
