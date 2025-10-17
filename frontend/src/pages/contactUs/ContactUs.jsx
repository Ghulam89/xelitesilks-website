import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { BaseUrl } from '../../utils/BaseUrl';
import Navbar from '../../components/Header/Navbar';
import TopNav from '../../components/Header/TopNav';
import Footer from '../../components/Footer/Footer';

function ContactUs() {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    message: Yup.string()
      .required('Message is required')
      .min(10, 'Message must be at least 10 characters')
      .max(500, 'Message must be less than 500 characters')
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await fetch(`${BaseUrl}/contact/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          toast.success('Message sent successfully!');
          resetForm();
        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (

    <>
     <TopNav/>
         <Navbar/>
          <div>
      {/** Map */}
      <div className='container-fluid'>
        <iframe
          className='bg-[#f7f7f7] rounded-[8px] p-2'
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.521941824463!2d-118.40357272390203!3d34.03048011887841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bbbf80eec803%3A0x8425555061bf7fe8!2sUmbrella%20Custom%20Packaging%20USA!5e0!3m2!1sen!2s!4v1742941460574!5m2!1sen!2s"
          width="100%"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      
      {/** Contact Info */}
      <div className='my-10 mx-2'>
        <div className='container mx-auto px-5 bg-gray-100 p-2 rounded-lg shadow-md'>
          <div className='grid md:grid-cols-12 grid-cols-1 gap-10 mt-10'>
            <div className='md:col-span-8 col-span-1'>
              <div>
                <h4 className='text-3xl leading-10 mb-[7px] font-medium'>Get In Touch</h4>
                <p className='text-lg text-[#a0a0a0] mb-6'>Use the form below to get in touch with the sales team</p>
              </div>
              
              <form onSubmit={formik.handleSubmit}>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
                  {/** Name Field */}
                  <div>
                    <input
                      className={`text-lg text-[#181818] font-normal leading-6 border-2 py-2.5 px-4 rounded-lg w-full ${
                        formik.touched.name && formik.errors.name 
                          ? 'border-red-500' 
                          : 'border-[#e9e9e9]'
                      }`}
                      type="text"
                      placeholder='Your Name *'
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                    )}
                  </div>

                  {/** Email Field */}
                  <div>
                    <input
                      className={`text-lg text-[#181818] font-normal leading-6 border-2 py-2.5 px-4 rounded-lg w-full ${
                        formik.touched.email && formik.errors.email 
                          ? 'border-red-500' 
                          : 'border-[#e9e9e9]'
                      }`}
                      type="email"
                      placeholder='Your Email *'
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                    )}
                  </div>
                </div>

                {/** Message Field */}
                <div className='mt-5'>
                  <textarea
                    className={`text-lg text-[#181818] font-normal leading-6 border-2 py-2.5 px-4 rounded-lg w-full ${
                      formik.touched.message && formik.errors.message 
                        ? 'border-red-500' 
                        : 'border-[#e9e9e9]'
                    }`}
                    placeholder='Your Message *'
                    name="message"
                    cols="30"
                    rows="5"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></textarea>
                  {formik.touched.message && formik.errors.message && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.message}</div>
                  )}
                </div>

                {/** Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className={`bg-[#181818] text-white text-lg font-medium leading-6 py-3 px-8 rounded-full mt-5 hover:bg-[#3c3c3c] ${
                      formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {formik.isSubmitting ? 'Sending...' : 'Send message'}
                  </button>
                </div>
              </form>
            </div>

            <div className='md:col-span-4 col-span-1'>
              <div>
                <h1 className='text-3xl leading-10 mb-[7px] font-medium'>Information</h1>
                <div className='flex flex-col mt-6'>
                  <h6 className='text-xl leading-6 font-medium'>Phone:</h6>
                  <p className='text-lg text-[#4d4e4f] mt-1.5'>+1 666 234 8888</p>
                </div>
                <div className='flex flex-col mt-6'>
                  <h6 className='text-xl leading-6 font-medium'>Email:</h6>
                  <p className='text-lg text-[#4d4e4f] mt-1.5'>info@xelitesilks.com</p>
                </div>
                <div className='flex flex-col mt-6'>
                  <h6 className='text-xl leading-6 font-medium'>Address:</h6>
                  <p className='text-lg text-[#4d4e4f] mt-1.5'>2163 Phillips Gap Rd, West Jefferson, North Carolina, United States</p>
                </div>
                <div className='flex flex-col mt-6'>
                  <h6 className='text-xl leading-6 font-medium'>Open Time:</h6>
                  <p className='text-lg text-[#4d4e4f] mt-1.5'>
                    Mon - Sat: 7:30am - 8:00pm PST<br />
                    Sunday: 9:00am - 5:00pm PST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
    </>
   
  );
}

export default ContactUs;