import React, { useEffect, useState } from 'react'
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import CustomPackagingProduced from '../../components/CustomPackagingProduced'
import Container from '../../components/common/Container'
import CardSlider from '../../components/common/CardSlider'
import Tabs from '../../components/common/Tabs'
import FAQ from '../../components/FAQ/FAQ'
import CustomPackagingApart from '../../components/CustomPackagingApart/CustomPackagingApart'
import axios from 'axios'
import { BaseUrl } from '../../utils/BaseUrl'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/productSlice'
import { IoSearch } from 'react-icons/io5'
import PageMetadata from '../../components/common/PageMetadata'

import pd1 from '../../assets/images/pd1.webp';
import pd2 from '../../assets/images/pd2.webp';
import pd3 from '../../assets/images/pd3.webp';
import pd4 from '../../assets/images/pd4.webp';

import sky from '../../assets/images/footer/sky.svg';
import dhl from '../../assets/images/footer/dhl.png';
import sups from '../../assets/images/footer/sups.svg';
import ups from '../../assets/images/footer/ups.svg';

import tape from "../../assets/images/icon.tape_measure.svg"
import heart from "../../assets/images/icon.heart.svg"
import truck from "../../assets/images/icon.truck.svg"
import retusn from '../../assets/images/icon.return.svg'
import three from '../../assets/images/three.webp'
import one from '../../assets/images/one.webp'
import two from '../../assets/images/two.webp'
import who from '../../assets/images/2.webp'
import how from '../../assets/images/1.webp'
import where from '../../assets/images/3.webp'
import { FaStar } from 'react-icons/fa'
import FaqComp from '../../components/common/FaqComp'
import SingleProductTabs from '../../components/common/SingleProductTabs'
import AddToCartSideMenu from '../../components/common/AddToCartSideMenu'
import ReviewCard from '../../components/common/ReviewCard'
import Navbar from '../../components/Header/Navbar'
import TopNav from '../../components/Header/TopNav'
import Footer from '../../components/Footer/Footer'

const ProductDetails = ({
  serverData,
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
}) => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const [product, setProduct] = useState(serverData || null);
  const [relatedProduct, setRelatedProduct] = useState([])
  const [reviewProduct, setReviewProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(!serverData); // Set loading true if no serverData

  const navigate = useNavigate();
  const [showCartSideMenu, setShowCartSideMenu] = React.useState(false);

  // Fix: Initialize activeImage with the first image when product loads
  const [activeImage, setActiveImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [curr, setCurr] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [activeColor, setActiveColor] = useState('orange');

  const prev = () =>
    setCurr((curr) =>
      curr === 0
        ? product?.images?.length - 1
        : curr - 1
    );

  const next = () =>
    setCurr((curr) =>
      curr === product?.images?.length - 1
        ? 0
        : curr + 1
    );

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  // Fix: Set initial active image when product data is available
  useEffect(() => {
    if (product?.images?.length > 0) {
      setActiveImage(product.images[0]?.url);
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  const goToSlide = (index) => {
    setCurr(index);
  };

  const openImageViewer = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setIsViewerOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeImageViewer = () => {
    setIsViewerOpen(false);
    document.body.style.overflow = 'auto';
  };

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + product?.images?.length) % product?.images?.length;
    setSelectedImage(product?.images[newIndex]);
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % product?.images.length;
    setSelectedImage(product?.images[newIndex]);
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const initialFormState = {
    name: "",
    email: "",
    companyName: "",
    phoneNumber: "",
    boxStyle: "",
    length: "",
    width: "",
    depth: "",
    unit: "Inches",
    stock: "Stock",
    colors: "Colors",
    printingSides: "Inside",
    quantity: "",
    addOns: "",
    image: null,
    description: ""
  };

  const [formData, setFormData] = useState(initialFormState);

  const validate = () => {
    return (
      formData.boxStyle &&
      formData.length &&
      formData.width &&
      formData.depth &&
      formData.unit &&
      formData.stock &&
      formData.colors &&
      formData.printingSides &&
      formData.quantity
    );
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post(`${BaseUrl}/requestQuote/create`, formDataToSend);

      if (response.data.status === 'success') {
        toast.success(response.data.message)
        setIsLoading(false);
        setFormData(initialFormState);
      } else {
        toast.error(response.data.message)
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BaseUrl}/products/get?slug=${slug}`)
      setProduct(response?.data?.data)
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product details');
    } finally {
      setIsLoading(false);
    }
  }

  const fetchReviewProducts = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/rating/getByProduct?slug=${slug}`)
      setReviewProduct(response?.data)
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }

  const fetchRelatedProducts = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/products/related-products?slug=${slug}`)
      setRelatedProduct(response?.data?.data?.relatedProducts || [])
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  }

  useEffect(() => {
    // Only fetch if no server data provided
    if (!serverData) {
      fetchProducts();
    }
    fetchRelatedProducts();
    fetchReviewProducts();
  }, [slug])

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BaseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": product?.brandId?.name || "Category",
        "item": `${BaseUrl}/category/${product?.brandId?.slug}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product?.name || "Product",
        "item": `${BaseUrl}/sub-category/${slug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": product?.name || "Product",
        "item": `${BaseUrl}/${slug}`
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product?.name,
    "description": product?.description,
    "image": product?.images?.map(img => `${BaseUrl}/${img.url}`) || [],
    "brand": {
      "@type": "Brand",
      "name": "Umbrella Custom Packaging"
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "4.7",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Scott Ray"
      },
      "datePublished": new Date().toISOString().split('T')[0],
      "reviewBody": "Excellent quality packaging and timely delivery. Highly recommended!",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "42"
      },
      "offers": {
        "@type": "Offer",
        "url": `${BaseUrl}/${slug}`,
        "priceCurrency": "USD",
        "price": product?.actualPrice,
        "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
          "@type": "Organization",
          "name": "Umbrella Custom Packaging"
        }
      },
    }
  };

  // Loading skeleton component
  const ProductDetailsSkeleton = () => (
    <div className="container mx-auto my-10 md:px-5 px-3">
    <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
      {/* Image Gallery Skeleton - Facebook Style */}
      <div className="md:sticky md:top-24 md:self-start">
        <div className="flex gap-6 md:flex-row flex-col-reverse">
          {/* Thumbnails Skeleton */}
          <div className="flex md:flex-col flex-row gap-3 md:h-[400px] lg:h-[650px] h-auto overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className="w-[100px] h-[100px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg shimmer"
              ></div>
            ))}
          </div>
          
          {/* Main Image Skeleton */}
          <div className="w-full">
            <div className="w-full aspect-square bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-2xl shimmer"></div>
          </div>
        </div>
      </div>

      {/* Product Details Skeleton - Facebook Style */}
      <div>
        <div className="py-8 space-y-6">
          {/* Title */}
          <div className="space-y-3">
            <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg shimmer w-4/5"></div>
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-3/5"></div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-5 h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer"
                ></div>
              ))}
            </div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-20"></div>
          </div>

          {/* Price */}
          <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg shimmer w-32"></div>

          {/* Colors Section */}
          <div className="space-y-3">
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-40"></div>
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-12 h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full shimmer"
                ></div>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="h-14 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl shimmer w-full"></div>

          {/* Alert Text */}
          <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-48"></div>

          {/* Features */}
          <div className="space-y-4 pt-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-6 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer"></div>
                <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer flex-1"></div>
              </div>
            ))}
          </div>

          {/* FAQ Sections */}
          <div className="space-y-4 pt-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-3/4"></div>
                <div className="space-y-1">
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-full"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-5/6"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-4/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );

  if (isLoading) {
    return (
      <>
        <TopNav />
        <Navbar />
        <ProductDetailsSkeleton />
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <TopNav />
        <Navbar />
        <div className="container mx-auto my-10 md:px-5 px-3 text-center py-20">
          <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button 
            label="Back to Home" 
            onClick={() => navigate('/')}
            className="bg-[#C5A980] text-black hover:bg-white hover:border-[#C5A980]"
          />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <TopNav />
      <Navbar />
      
      {product && (
        <PageMetadata
          title={product.metaTitle || "Custom Packaging Solutions"}
          description={product.metaDescription || ""}
          keywords={product.keywords || ""}
          ogUrl={`${BaseUrl}/category/${slug}`}
          ogImage={`${BaseUrl}/${product.bannerImage || ""}`}
          ogImageWidth="1200"
          ogImageHeight="630"
          canonicalUrl={`${BaseUrl}/${slug}`}
          breadcrumbSchema={breadcrumbSchema}
          productSchema={productSchema}
          robots={"noindex, nofollow"}
        />
      )}

      <div className='container mx-auto my-10 md:px-5 px-3'>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          {/* Left sticky gallery (desktop only) */}
          <div className="md:sticky md:top-24 md:self-start">
            <div className="flex gap-5 md:flex-row flex-col-reverse">
              {/* Thumbnails */}
              <div className="flex md:flex-col flex-row overflow-x-auto md:overflow-y-auto gap-2 md:h-[360px] lg:h-[600px] h-auto">
                {product?.images?.map((img, i) => (
                  <img
                    key={i}
                    className={`w-[110px] h-[110px] rounded cursor-pointer transition-all duration-300 border-2 ${activeImage === img?.url ? 'border-[#c5a980] shadow-lg' : 'border-transparent'}`}
                    onClick={() => {
                      setActiveImage(img?.url);
                      setSelectedImage(img);
                    }}
                    src={`${BaseUrl}/${img?.url}`}
                    alt="thumbnail"
                    loading="lazy"
                  />
                ))}
              </div>

              {/* Main Image */}
              <div className="w-full h-full">
                <img
                  src={`${BaseUrl}/${activeImage || product?.images?.[0]?.url}`}
                  alt={product?.name}
                  className="rounded-xl shadow-md transition-opacity duration-500 w-full h-auto"
                  onClick={() => openImageViewer(selectedImage || product?.images?.[0], 0)}
                  loading="eager"
                />
              </div>
            </div>
          </div>

          {/* Right column (details) */}
          <div>
            <div className="py-10">
              <h1 className="md:text-4xl text-2xl font-semibold tracking-wide mb-4">{product?.name}</h1>
              <div className="reviews text-yellow-500 mb-3 flex gap-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <span className="text-[#4d4e4f]">(134 reviews)</span>
              </div>
              <p className="text-3xl font-semibold mb-6 text-[#111]">${product?.actualPrice}</p>

              {/* Colors */}
              {product?.color?.length > 0 && (
                <div className="mb-6">
                  <h2 className="mb-3 font-medium text-lg">Colors: <span className='text-[#4d4e4f]'>{activeColor}</span></h2>
                  <ul className="list-color-product flex space-x-1 mt-2">
                    {product?.color?.map((clr) => (
                      <li
                        key={clr}
                        className={`cursor-pointer p-0.5 rounded-full border-2 ${activeColor === clr ? 'border-gray-800' : 'border-transparent'}`}
                        onClick={() => setActiveColor(clr)}
                      >
                        <span
                          style={{ backgroundColor: clr }}
                          className={`block w-9 h-9 border border-[#ddd] rounded-full transition-transform hover:scale-110`}
                        ></span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button
                onClick={() => {
                  dispatch(
                    addToCart({
                      _id: product._id,
                      image: `${BaseUrl}/${product?.images[0]?.url}`,
                      title: product.name,
                      price: product.actualPrice,
                      description: product.description,
                      quantity: 1,
                    })
                  )
                  setShowCartSideMenu(true)
                }}
                rIcons={
                  <svg className='' width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="13" cy="13" r="12.5" fill="currentColor" stroke="black" />
                    <path d="M10.6367 15.3636L14.7731 11.2273M14.7731 11.2273L15.364 13.5909M14.7731 11.2273L12.4094 10.6364" stroke="white" strokeWidth="1.5" />
                  </svg>
                }
                label="Add To Cart"
                className="mt-5 border-2 border-[#C5A980] bg-[#C5A980] text-black hover:bg-white hover:text-black hover:border-[#C5A980]"
              />

              {/* Alert */}
              <p className="text-lg mt-3 text-[#5d8fc1] font-light cursor-pointer hover:underline">
                Alert me when available
              </p>

              {/* Features */}
              <div className="my-10 flex flex-col gap-5 divide-y divide-gray-200">
                <div className="flex items-center gap-3 text-[#4d4e4f]">
                  <img src={tape} alt="tape" className="w-5" /> <span>20 x 67" (53 x 170cm)</span>
                </div>
                <div className="flex items-center gap-3 pt-3 text-[#4d4e4f]">
                  <img src={truck} alt="truck" className="w-5" /> <span>Free and express US shipping</span>
                  <span className="text-[#5d8fc1] cursor-pointer hover:underline text-sm whitespace-nowrap">See details</span>
                </div>
                <div className="flex items-center gap-3 pt-3 text-[#4d4e4f]">
                  <img src={retusn} alt="return" className="w-5" /> <span>Free 14 day US returns</span>
                  <span className="text-[#5d8fc1] cursor-pointer hover:underline whitespace-nowrap">See details</span>
                </div>
                <div className="flex items-center gap-3 pt-3 text-[#4d4e4f]">
                  <img src={heart} alt="heart" className="w-5" /> <span>100% Handmade in Italy</span>
                </div>
              </div>

              {/* FAQ */}
              <div className="space-y-4">
                {product?.inspiration && (
                  <FaqComp
                    title={"Xelitesilks's Inspiration"}
                    answer={product?.inspiration}
                  />
                )}
                {product?.description && (
                  <FaqComp
                    title={"Details"}
                    answer={product?.description}
                  />
                )}
                {product?.guide && (
                  <FaqComp
                    title={"Styling Guide"}
                    answer={product?.guide}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="">
          <div className="max-w-7xl mx-auto pt-12">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex text-yellow-500">
                {Array(5).fill().map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-800 font-medium">{reviewProduct?.totalRatings || 0} Reviews</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviewProduct?.data?.map((r, i) => (
                <ReviewCard key={i} name={r.name} text={r.review} rating={r.rating} />
              ))}
              {(!reviewProduct?.data || reviewProduct.data.length === 0) && (
                <p className="text-gray-500 col-span-2 text-center py-8">No reviews yet.</p>
              )}
            </div>

            <div className="text-center mt-6">
              <button className="px-4 py-2 text-sm border rounded hover:bg-gray-100 transition">
                Show more reviews
              </button>
            </div>
          </div>
        </div>

        {/* Rest of your component remains the same... */}
        {/* Section with alternate bg */}
        <div className="bg-gray-50 rounded-md py-16 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-4 ">
            {[{ img: one, title: "We take the extra steps to make our scarves exceptional", desc: "From the design to the final hem, each piece is crafted in small workshops and carefully inspected to ensure it meets our highest standards of quality." }, { img: three, title: "100% Made in Como, Italy", desc: "Indulge in the luxury of Como silk - world-renowned for its exquisite craftsmanship and finest silk. Our silk scarves are a testament to the skill passed down from generation to generation." }, { img: two, title: "Exceptional eco-friendly print quality", desc: "We're proud to use non-toxic vegetable dyes in a modern, innovative printing process that's kinder to the planet—using less ink and water while delivering sharp, well-defined patterns." }].map((item, i) => (
              <div key={i} className="flex flex-col items-center bg-white rounded-xl md:p-6 p-4 shadow-md hover:shadow-xl transition duration-300">
                <img src={item.img} alt={item.title} className="w-full h-72 object-cover rounded-lg mb-5 transform transition-transform duration-300 group-hover:scale-105" />
                <span className="text-lg font-semibold text-center">{item.title}</span>
                <p className="text-sm text-gray-600 text-center">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who / How / Where */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8 mt-16'>
          {[{ img: who, label: "who", desc: "Handmade by Italian artisans, carrying generations of silk craftsmanship." }, { img: how, label: "how", desc: "Sustainably produced with eco-friendly dyes and timeless design." }, { img: where, label: "where", desc: "100% made in Italy, inspired by the country's rich heritage." }].map((item, i) => (
            <div key={i} className='flex flex-col items-center md:p-10 p-4 text-center gap-4 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-300'>
              <div className='bg-[#c5a980] p-2 rounded-full mb-2'>
                <img src={item.img} alt={item.label} width={90} height={90} className='object-cover transform transition-transform duration-300 hover:rotate-6' />
              </div>
              <h4 className='text-3xl font-semibold capitalize'>{item.label}</h4>
              <p className='text-lg text-gray-600 text-pretty'>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* What makes us different */}
        <div className='md:my-20  my-10 space-y-12 '>
          <h3 className='text-3xl font-semibold text-center '>What makes us different</h3>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5 text-pretty md:text-balance'>
            {[{ title: "Love it or your money back", desc: ["Your happiness is our priority and we are committed to providing you with the best customer service and quality products.", "If for any reason, your purchase is not right for you, you can return or exchange it."] }, { title: "Slow fashion. Affordable luxury.", desc: ["We create timeless products that honor craftsmanship and sustainability.", "Our designs are made to last while keeping prices accessible."] }, { title: "We make scarves you'll be proud to wear", desc: ["Each scarf is an art piece, crafted with care and designed to elevate your wardrobe.", "Wear it with confidence, knowing it's made with integrity."] }].map((card, i) => (
              <div key={i} className='flex flex-col gap-4 border border-gray-200 shadow-sm rounded-xl p-6 hover:shadow-lg transition-all duration-300'>
                <h4 className='text-2xl font-semibold'>{card.title}</h4>
                {card.desc.map((d, j) => (<p key={j} className='text-lg font-light text-gray-600'>{d}</p>))}
              </div>
            ))}
          </div>
        </div>

        {/* Related / Tabs */}
        <div className='sm:mt-16 mt-9'>
          <SingleProductTabs relatedProduct={relatedProduct} />
        </div>
      </div>

      {isViewerOpen && selectedImage && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className='absolute top-4 right-4'>
            <button
              onClick={closeImageViewer}
              className="text-white text-3xl cursor-pointer hover:text-gray-300"
            >
              &times;
            </button>
          </div>
          <button
            onClick={goToPrevious}
            className="absolute left-4 text-white text-3xl cursor-pointer hover:text-gray-300 p-4"
          >
            &#10094;
          </button>
          <div className="max-w-4xl max-h-screen overflow-auto">
            <img
              src={`${BaseUrl}/${selectedImage.url}`}
              alt={selectedImage.altText}
              className="max-w-full max-h-screen object-contain"
            />
          </div>
          <button
            onClick={goToNext}
            className="absolute right-4 text-white text-3xl cursor-pointer hover:text-gray-300 p-4"
          >
            &#10095;
          </button>
          <div className="absolute bottom-4 text-white">
            {currentIndex + 1} / {product?.images.length}
          </div>
        </div>
      )}

      {showCartSideMenu && (
        <AddToCartSideMenu onClose={() => setShowCartSideMenu(false)} />
      )}

      <FAQ />
      <Footer />
    </>
  )
}

export default ProductDetails