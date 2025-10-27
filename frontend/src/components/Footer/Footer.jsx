import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaTiktok,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import social from "../../assets/images/footer/bank-icons.webp";
import logo from "../../assets/images/xelite silk.svg";
import Input from "../common/Input";
import Button from "../common/Button";
import { BaseUrl } from "../../utils/BaseUrl";
import { toast } from "react-toastify";
import axios from "axios";
import visa from '../../assets/images/visa.png';
import master from '../../assets/images/master.png';
import amax from '../../assets/images/amax.png';
import paypal from '../../assets/images/paypal.png';
import discover from '../../assets/images/discover.png';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${BaseUrl}/subscribe/create`, {
        email: email,
      });
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setEmail("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#fff] border-t border-gray-200">
      <div className="max-w-7xl mx-auto sm:px-6 px-3 py-10 grid md:grid-cols-6 sm:grid-cols-2 grid-cols-1 gap-10">
        
        {/* Left - Logo + Contact */}
        <div className=" col-span-2">
          <img src={logo} alt="Logo" className="mb-4 w-36" />
          <p className="text-sm flex items-center gap-2">
            <IoLocationOutline /> 549 Oak St. Crystal Lake, IL 60014
          </p>
          <p className="text-sm flex items-center gap-2 mt-2">
            <MdEmail /> themesflat@gmail.com
          </p>
          <p className="text-sm flex items-center gap-2 mt-2">
            <FiPhone /> 315-666-6688
          </p>

          <div className="flex gap-2 mt-4">
            <a  className=" w-10 h-10 border rounded-full flex justify-center items-center text-gray-600 hover:text-white hover:bg-blue-600" href="#"><FaFacebookF className="" /></a>
            <a href="#" className=" w-10 h-10 border rounded-full flex justify-center items-center text-gray-600 hover:text-white  hover:bg-blue-400"><FaTwitter className="" /></a>
            <a href="#" className=" w-10 h-10 border rounded-full flex justify-center items-center text-gray-600 hover:text-white  hover:bg-pink-500"><FaInstagram className="" /></a>
            <a href="#" className=" w-10 h-10 border rounded-full flex justify-center items-center text-gray-600 hover:text-white  hover:bg-red-500"><FaPinterestP className="" /></a>
            <a href="#" className=" w-10 h-10 border rounded-full flex justify-center items-center text-gray-600 hover:text-white  hover:bg-blue-700"><FaLinkedinIn className="" /></a>
          </div>
        </div>

        {/* Info */}
        <div>
          <h5 className="font-semibold text-lg mb-4">Information</h5>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
            {/* <li><Link to="/size-guide">Size Guide</Link></li> */}
            <li><Link to="/contact-us">Contact Us</Link></li>
            {/* <li><Link to="/career">Career</Link></li> */}
            <li><Link to="/dashboard">My Account</Link></li>
          </ul>
        </div>

        {/* Customer Services */}
        <div className=" ">
          <h5 className="font-semibold  text-lg mb-4">Customer Services</h5>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><Link to="/shipping-policy">Shipping</Link></li>
            <li><Link to="/returns-refunds">Return & Refund</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
            <li><Link to="/faqs"> FAQs</Link></li>
            {/* <li><Link to="/wishlist">My Wishlist</Link></li> */}
          </ul>
        </div>

        {/* Newsletter */}
        <div  className="  col-span-2">
          <h5 className="font-semibold text-lg mb-4">Newsletter</h5>
          <p className="text-sm text-gray-600 mb-3">
            Sign up for our newsletter and get 10% off your first purchase
          </p>
          
  <Formik
    initialValues={{ email: "", agree: false }}
    validationSchema={Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      agree: Yup.bool().oneOf([true], "You must agree to the terms"),
    })}
    onSubmit={async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axios.post(`${BaseUrl}/subscribe/create`, {
          email: values.email,
        });

        if (response.data.status === "success") {
          toast.success(response.data.message);
          resetForm();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong.");
      } finally {
        setSubmitting(false);
      }
    }}
  >
    {({ isSubmitting }) => (
      <Form className="relative">
        <Field
          name="email"
          type="email"
          placeholder="Enter your email"
          className="border border-gray-300 rounded-full px-3 py-3 w-full"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black absolute   cursor-pointer right-2 top-1 text-white w-10 h-10 rounded-full"
        >
          {isSubmitting ? "..." : "→"}
        </button>
        <ErrorMessage
          name="email"
          component="div"
          className="text-xs text-red-500 mt-1"
        />

        {/* Checkbox and Terms */}
        <div className="flex items-start mt-3 text-xs text-gray-600 gap-2">
          <Field type="checkbox" name="agree" className="mt-1" />
          <label>
            By clicking subscribe, you agree to our{" "}
            <Link to="/terms-and-conditions" className="underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/privacy-policy" className="underline">
              Privacy Policy
            </Link>.
          </label>
        </div>
        <ErrorMessage
          name="agree"
          component="div"
          className="text-xs text-red-500 mt-1"
        />
      </Form>
    )}
  </Formik>
         
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t max-w-7xl mx-auto border-gray-200 py-4 px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          © 2025 Xelite Silks. All Rights Reserved.
        </p>
        <div className="flex items-center gap-3">
          <div>
            <span className=" text-black">Payment :</span>
          </div>
          <div>
            <img src={visa} alt="" className=" w-12" />
          </div>
          <div>
            <img src={master} alt="" className=" w-12" />
          </div>
          <div>
            <img src={amax} alt="" className=" w-12" />
          </div>
          <div>
            <img src={paypal} alt="" className=" w-12" />
          </div>
          <div>
            <img src={discover} alt="" className=" w-12" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
