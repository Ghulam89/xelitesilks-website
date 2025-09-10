import React, { useState } from 'react';
import bg from '../../assets/images/bg-contact.png';
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BaseUrl } from '../../utils/BaseUrl';
import PageMetadata from '../../components/common/PageMetadata';
import { Link } from 'react-router-dom';

function ContactUs() {
  // Form validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    // phoneNumber: Yup.string().required('Phone number is required'),
    // companyName: Yup.string().required('Company name is required'),
    // image: Yup.mixed(),
    message: Yup.string(),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      companyName: '',
      image: null,
      message: '',
    },


    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      console.log(values);

      try {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
          if (values[key] !== null && values[key] !== undefined) {
            if (key === 'image') {
              if (values[key] instanceof File) {
                formData.append(key, values[key]);
              }
            } else {
              formData.append(key, values[key]);
            }
          }
        });

        const response = await axios.post(`${BaseUrl}/contactus/create`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          toast.success('Your message has been sent successfully!');
          resetForm();
        } else {
          throw new Error('Failed to submit form');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('Failed to send message. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });
  
  const metadata = {
    title: "Contact us - Umbrella Custom Packaging",
    description: "Get In Touch Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes. Umbrella Custom Packaging facilitates your business by providing innovative styled boxes in extraordinary design. We use the finest paper material and high quality cardboard to ensure perfect Die Cut boxes. You will get guaranteed satisfaction with high quality printing.",
    keywords: "custom packaging, wholesale boxes, packaging solutions, affordable packaging, custom boxes, packaging design, eco-friendly packaging",
    author: "Umbrella Custom Packaging",
    ogUrl: `${BaseUrl}/contact-us`,
    ogTitle: "Contact Us - Umbrella Custom Packaging",
    ogDescription: "Get In Touch Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes...",
    modifiedTime: "2025-06-13T15:18:43+00:00",
    twitterTitle: "Contact Us - Umbrella Custom Packaging",
    twitterDescription: "Get In Touch Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes...",
    robots: "noindex, nofollow"
  };

  return (
    <>

      <PageMetadata {...metadata} />
      <div className='h-auto bg-no-repeat bg-cover py-5' style={{
        backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url(${bg})`
      }}>
        <div className='max-w-[1200px] mx-auto'>
          <div>
            <div className='max-w-[800px] max-h-[626] mx-auto md:p-[50px] p-[20px] rounded-[8px] mt-10 shadow-xl bg-opacity-40 border border-gray-100'>
              <div className='flex flex-col justify-around items-center space-y-8'>
                <h2 className='md:text-[40px] text-[30px] font-semibold text-start'>Get In Touch</h2>
                <p className='text-[#777777] md:text-[14px] text-[13px] text-center'>
                  Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes.
                  Umbrella Custom Packaging facilitates your business by providing innovative styled boxes
                  in extraordinary design. We use the finest paper material and high quality cardboard to
                  ensure perfect Die Cut boxes. You will get guaranteed satisfaction with high quality printing.
                  Email Us With Any Questions or Inquires or Call Us. We would be happy to answer your questions
                  and set up a meeting with you.
                </p>
              </div>

              <form onSubmit={formik.handleSubmit}>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mt-10'>
                  <div>
                    <Input
                      name="name"
                      placeholder='Name'
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`border w-full ${formik.touched.name && formik.errors.name ? ' border border-red-500' : ''} rounded-lg border-gray-300 focus:border-[#4440E6] focus:ring-1 focus:ring-[#4440E6] p-2`}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                    )}
                  </div>

                  <div>
                    <Input
                      type='email'
                      name="email"
                      placeholder='Email'
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`border w-full ${formik.touched.email && formik.errors.email ? ' border border-red-500' : ''} rounded-lg border-gray-300 focus:border-[#4440E6] focus:ring-1 focus:ring-[#4440E6] p-2`}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                    )}
                  </div>

                  <div>
                    <Input
                      name="phoneNumber"
                      placeholder='Phone Number'
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`border w-full ${formik.touched.phoneNumber && formik.errors.phoneNumber ? ' border border-red-500' : ''} rounded-lg border-gray-300 focus:border-[#4440E6] focus:ring-1 focus:ring-[#4440E6] p-2`}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</div>
                    )}
                  </div>

                  <div>
                    <Input
                      name="companyName"
                      placeholder='Company Name'
                      value={formik.values.companyName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`border w-full ${formik.touched.companyName && formik.errors.companyName ? ' border border-red-500' : ''} rounded-lg border-gray-300 focus:border-[#4440E6] focus:ring-1 focus:ring-[#4440E6] p-2`}
                    />
                    {formik.touched.companyName && formik.errors.companyName && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.companyName}</div>
                    )}
                  </div>

                  <div>
                    <Input
                      type='file'
                      name="image"
                      onChange={(event) => {
                        formik.setFieldValue('image', event.currentTarget.files[0]);
                      }}
                      onBlur={formik.handleBlur}
                      className='border w-full rounded-lg border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#4440E6] file:text-white hover:file:bg-[#3a36c7]'
                    />
                    {formik.touched.image && formik.errors.image && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.image}</div>
                    )}
                  </div>
                </div>

                <div className='mt-5'>
                  <textarea
                    name="message"
                    placeholder="Please share specific packaging details such as dimensions, materials, weight limits, and design preferences, We'll promptly provide you with a quote"
                    rows={3}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='border w-full p-2 rounded-lg border-gray-300 focus:border-[#4440E6] focus:ring-1 focus:ring-[#4440E6]'
                  />
                  {formik.touched.message && formik.errors.message && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.message}</div>
                  )}

                  <Button
                    type="submit"
                    label={formik.isSubmitting ? "Sending..." : "Send"}
                    disabled={formik.isSubmitting}
                    className='bg-[#4440E6] hover:bg-[#3a36c7] w-full text-white mt-4 py-2 rounded-lg transition-colors duration-200'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-[1200px] mx-auto mt-10'>
        <div className='grid md:grid-cols-3 grid-cols-1 gap-10 bg-[#5a56e9] p-5 rounded-[8px]'>
          <div className='grid grid-cols-1'>
            <div className='bg-[#fff] flex justify-start  font-sans sm:flex-row flex-col items-center rounded-[8px] p-5 gap-3'>
              <Link  to={'tel:+1%20747-247-0456'} className='text-white flex justify-center items-center p-3  bg-[#5a56e9] rounded-full'>
                <IoCallOutline size={40} />
              </Link>
              <div className='flex flex-col  justify-between '>
                <Link to={'tel:+1%20747-247-0456'}>
                 <h2 className='text-3xl font-medium text-[#111111]'>Call Now</h2>
                </Link>
               
                <p className=' pt-1'>+1 747-247-0456</p>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1'>
            <div className='bg-[#fff] flex justify-start  font-sans sm:flex-row flex-col items-center rounded-[8px] p-5 gap-3'>
              <Link  to={'mailto:info@umbrellapackaging.com'} className='text-white flex justify-center items-center p-3  bg-[#5a56e9] rounded-full'>
                <MdOutlineMarkEmailRead size={40} />
              </Link>
              <div className='flex flex-col  justify-between items-start'>
                   <Link to={'mailto:info@umbrellapackaging.com'}>
                   
                <h2 className='text-3xl font-medium text-[#111111]'>Email</h2>
                   </Link>
                <p className=' pt-1'>info@umbrellapackaging.com</p>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 '>
            <div className='bg-[#fff] flex justify-start  font-sans sm:flex-row flex-col items-center rounded-[8px] p-5 gap-3'>
              <Link  to={'https://maps.app.goo.gl/FCBPReqBvveR9ox96'} className='text-white flex justify-center items-center p-3  bg-[#5a56e9] rounded-full'>
                <IoLocationOutline size={40} />
              </Link>
              <div className='flex flex-col  justify-between items-start'>
                                   <Link to={'https://maps.app.goo.gl/FCBPReqBvveR9ox96'}>
                                     <h2 className='text-3xl font-medium text-[#111111]'>Location</h2>
                                   </Link>
               
                <p className=' pt-1'>9854 National Blvd #1042, Los Angeles, CA 90034, United States</p>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <iframe
            className='bg-[#f7f7f7] rounded-[8px] p-2'
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.521941824463!2d-118.40357272390203!3d34.03048011887841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bbbf80eec803%3A0x8425555061bf7fe8!2sUmbrella%20Custom%20Packaging%20USA!5e0!3m2!1sen!2s!4v1742941460574!5m2!1sen!2s"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location"
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default ContactUs;