import React, { useEffect, useState } from 'react'
import CustomPackagingProduced from '../../components/CustomPackagingProduced'
import Button from '../../components/common/Button'
import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from '../../components/common/ProductCard'
import Input from '../../components/common/Input'
import { BaseUrl } from '../../utils/BaseUrl'
import axios from 'axios'
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import shopChoose from '../../assets/images/Industry-standard.png-2.webp';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
    totalPages: 1
  });
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState('All Products');

  // Get query parameters
  const categoryId = searchParams.get('categoryId');
  const name = searchParams.get('name');
  const searchQuery = searchParams.get('search');

  const fetchProducts = async (page = 1, loadMore = false) => {
    setLoading(true);
    try {
      let url = `${BaseUrl}/products/getAll?page=${page}`;
      
      // Add category filter if exists
      if (categoryId) {
        url += `&category=${categoryId}`;
      }
      
      // Add search query if exists
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }

      const response = await axios.get(url);
      
      if (loadMore) {
        setProducts(prev => [...prev, ...response?.data?.data]);
      } else {
        setProducts(response?.data?.data);
      }
      
      setPagination({
        page: response?.data?.pagination?.page,
        perPage: response?.data?.pagination?.perPage,
        totalPages: response?.data?.pagination?.totalPages
      });

      // Update category name if filtered
      if (categoryId && response?.data?.categoryName) {
        setCategoryName(response.data.categoryName);
      } else if (searchQuery) {
        setCategoryName(`Search Results for "${searchQuery}"`);
      } else {
        setCategoryName('All Products');
      }

    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }

  // Fetch products when query parameters change
  useEffect(() => {
    setProducts([]);
    fetchProducts(1);
  }, [categoryId, searchQuery]);

  const handleLoadMore = () => {
    if (pagination.page < pagination.totalPages) {
      fetchProducts(pagination.page + 1, true);
    }
  };

  // Function to update query parameters
  const updateQueryParams = (params) => {
    setSearchParams(params, { replace: true });
  };

  // Example of how to set query params (you can use this in your category filters)
  const handleCategoryChange = (newCategoryId) => {
    const params = {};
    if (newCategoryId) params.category = newCategoryId;
    if (searchQuery) params.search = searchQuery;
    updateQueryParams(params);
  };

  // Example of how to set search query
  const handleSearch = (query) => {
    const params = {};
    if (categoryId) params.category = categoryId;
    if (query) params.search = query;
    updateQueryParams(params);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
      image: null,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("message", values.message);
        formData.append("image", values.image);

        const response = await axios.post(`${BaseUrl}/instantQuote/create`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if(response?.data?.status==="success"){
         toast.success(response?.data?.message)
        }else{
          toast.error(response?.data?.message)
        }

        resetForm();
      } catch (error) {
        toast.error(error?.response?.data?.message)
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <div className=' bg-[#F7F7F7] sm:max-w-7xl max-w-[95%] mx-auto  px-3 my-5 py-12'>
        <div className='  mx-auto text-center'>
          <h1>Discover Our Custom Packaging Variety</h1>
          <p className=' pt-2'>Check out all the different types of boxes we have at Umbrella Custom Packaging! We have special categories for boxes that you can customize just the way you like. You get to choose whether it’s the size, the material, or how it looks. So, have a look and pick the perfect box for you!
          </p>
        </div>
      </div>

      <div>
        <div className=' sm:max-w-7xl max-w-[95%] mb-8 mx-auto'>
          <div className=' flex    sm:flex-row flex-col gap-5 justify-between w-full'>
            <div className=' sm:w-9/12 w-full
           '>
              <div className=' grid  md:grid-cols-3 gap-4 grid-cols-2'>
                {
                  products?.map((item, index) => {
                    return (
                      <div className="   bg-[#f7f7f7] p-2 rounded-xl max-w-6xl mx-auto">
                        <ProductCard data={item} />
                      </div>

                    )
                  })
                }
              </div>

              {pagination.page < pagination.totalPages && (
                <div className=' pt-12'>
                  <Button 
                    label={loading ? 'Loading...' : 'Load More'} 
                    className='mx-auto bg-[#4440E6] text-white' 
                    onClick={handleLoadMore}
                    disabled={loading}
                  />
                </div>
              )}

            </div>

            <div className=' sm:w-3/12 w-full'>

              <div className=' rounded-xl sticky top-7 bg-[#F7F7F7] p-3'>
                  <form onSubmit={formik.handleSubmit} className="w-full">
                    <h2 className=' text-center'>Get an Instant Quote</h2>
            <div className="flex flex-col w-full gap-2 justify-between">
              {/* Name Field */}
              <div className="w-full">
                <Input
                  label="Name"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`rounded-[8px] w-full border-[#333333] border bg-[#fff] p-3 ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : ""
                  }`}
                />
              </div>

              {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.name}
                  </div>
                )}
              {/* Email Field */}
              <div className="w-full">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`rounded-[8px] w-full border-[#333333] border bg-[#fff] p-3 ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : ""
                  }`}
                />
              </div>

              {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </div>
                )}

              {/* Phone Number Field */}
              <div className="w-full">
                <Input
                  label="Phone Number"
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`rounded-[8px] w-full border-[#333333] border bg-[#fff] p-3 ${
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                      ? "border-red-500"
                      : ""
                  }`}
                />
              </div>

              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.phoneNumber}
                  </div>
                )}

              {/* Message Field */}
              <div className="flex flex-col">
                <label
                  className="pb-1.5 flex text-[#333333] text-sm font-medium text-textColor"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Please share specific packaging details such as dimensions, materials, weight limits, and design preferences. We'll promptly provide you with a quote"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`rounded-[8px] w-full border-[#333333] border bg-[#fff] p-3 ${
                    formik.touched.message && formik.errors.message
                      ? "border-red-500"
                      : ""
                  }`}
                ></textarea>
                {formik.touched.message && formik.errors.message && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.message}
                  </div>
                )}
              </div>

              {/* File Upload Field */}
              <div className="w-full">
                <label
                  className="pb-1.5 flex flex-col text-[#333333] text-sm font-medium text-textColor"
                  htmlFor="image"
                >
                  Upload Your Design
                  
                  <span className="text-xs text-black ml-1">
                    (Max Size 5MB, Allowed: png, pdf, jpg, jpeg, webp)
                  </span>
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  onChange={(event) => {
                    formik.setFieldValue("image", event.currentTarget.files[0]);
                  }}
                  onBlur={formik.handleBlur}
                  className="border w-full rounded-lg bg-white border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#4440E6] file:text-white hover:file:bg-[#3a36c7]"
                />
                {formik.touched.image && formik.errors.image && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.image}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <Button
                  type="submit"
                  label={
                    formik.isSubmitting ? "Submitting..." : "Send"
                  }
                  disabled={formik.isSubmitting || !formik.isValid}
                  className="bg-[#4440E6] text-white w-full py-2 rounded-lg font-medium disabled:opacity-50"
                />
              </div>
            </div>
          </form>
              </div>

            </div>


          </div>
        </div>
      </div>

      <div className=' bg-[#FFF1E4]  sm:max-w-7xl max-w-[95%]  mx-auto mb-8'>
        <div className=''>
          <div className="flex flex-col  px-4 py-6  rounded-lg lg:flex-row  gap-8 items-center">


            <div className='w-full lg:w-1/2 '>

              <div className=" pt-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Why Choice us
                </h1>
                <div className=' overflow-y-auto h-56'>
                  <p className="text-sm leading-6 text-gray-700 mb-6">
                    We are your packaging partner at , not simply a business. Our persistent dedication to excellence, sustainability, and achievement is what distinguishes us. Utilizing cutting-edge technology, a committed team of professionals, and curiosity for creativity, we go above and beyond to provide custom die-cut mylar bag packaging solutions that surpass your needs. You can rely on us to creatively and carefully display, preserve, and market your products. Contact our dedicated team at or email us at <Link to={''}>Sales@umbrellapackaging.com</Link> to get started.
                  </p>

                </div>


              </div>

              <div className=" flex flex-wrap   mt-7 gap-2.5 items-center">
                <Button

                  label={"Get Instant Quote"}
                  className=" bg-[#4440E6] text-white"
                />

              </div>
            </div>

            <div className="w-full  lg:w-1/2">
              <img
                src={shopChoose}
                alt="Custom packaging example"
                className="w-full h-auto rounded-xl shadow-md object-cover"
                loading="lazy"
              />

            </div>



          </div>
        </div>
      </div>

      <div className=' mb-4'>
        <CustomPackagingProduced />
      </div>

    </>
  )
}

export default Shop