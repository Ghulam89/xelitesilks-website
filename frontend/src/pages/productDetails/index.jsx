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


  const navigate = useNavigate();


  const features = [
    {
      name: 'Embossing',
      description: 'Raised designs that add a tactile dimension to your packaging',
      icon: pd1
    },
    {
      name: 'Debossing',
      description: 'Recessed designs that create an elegant, subtle effect',
      icon: pd2
    },
    {
      name: 'Foiling',
      description: 'Metallic finishes that add luxury and shine to your branding',
      icon: pd3
    },
    {
      name: 'Spot UV',
      description: 'Glossy coatings that highlight specific areas for visual impact',
      icon: pd4
    }
  ];

  const [curr, setCurr] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

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
    const newIndex = (currentIndex + 1) % images.length;
    setSelectedImage(product?.images[newIndex]);
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);




  const [isLoading, setIsLoading] = useState(false);


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


  const customBox = [
    {
      id: 1,

      title: "Description",
      content: <div className=' h-96 blog_content  overflow-y-auto px-3 py-3 bg-white rounded-lg'>

        <p dangerouslySetInnerHTML={{ __html: product?.description }}>

        </p>

      </div>,
    },
    {
      id: 2,
      title: "Faq's",
      content: <div className='  px-3 bg-white'>
        <FAQ />
      </div>
    },
    {
      id: 3,
      title: "Why Us",
      content: <div className=' bg-white rounded-lg py-4 px-3'>
        <CustomPackagingApart />
      </div>

    },
    {
      id: 4,
      title: "Specifications",
      content: <div className=' bg-white p-2 rounded-lg'>

        <table className=' table border border-gray-400 w-full'>

          <tbody className=''>
            <tr className=' bg-[#F2F2F2]  border-b border-gray-400'>
              <td className='    border-gray-400 pt-3 pb-5 border-r px-2  font-[600] text-sm'>Size</td>
              <td className=' text-gray-500 px-2  pt-3 pb-5 text-sm'>All custom shapes and sizes

              </td>
            </tr>
            <tr className=''>
              <td className='    border-gray-400 pt-3 pb-5 border-r px-2  font-[600] text-sm'>Paper Stock</td>
              <td className=' text-gray-500 px-2  pt-3 pb-5 text-sm'>14pt cardboard, 16pt cardboard, 18pt cardboard & 24pt cardboard, White SBS C1S C2S, Corrugated, Rigid, Kraft, Linen



              </td>
            </tr>
            <tr className=' bg-[#F2F2F2] border-t  border-b border-gray-400'>
              <td className='    border-gray-400 pt-3 pb-5 border-r px-2  font-[600] text-sm'>Printing</td>
              <td className=' text-gray-500 px-2  pt-3 pb-5 text-sm'>Digital, Offset (PMS and CMYK ) and Screen Printing

              </td>
            </tr>
            <tr className='   border-b border-gray-400'>
              <td className='    border-gray-400 pt-3 pb-5 border-r px-2  font-[600] text-sm'>Options</td>
              <td className=' text-gray-500 px-2  pt-3 pb-5 text-sm'>Matte, Glossy, Spot UV, Aqueous Coating and Embossing, Debossing



              </td>
            </tr>
            <tr className=' bg-[#F2F2F2] border-t  border-b border-gray-400'>
              <td className='    border-gray-400 pt-3 pb-5 border-r px-2  font-[600] text-sm'>Extras

              </td>
              <td className=' text-gray-500 px-2  pt-3 pb-5 text-sm'>Flaps, Ribbons, thread handles, gold foiling, silver foiling

              </td>
            </tr>
            <tr className=' bg-[#F2F2F2] border-t  border-b border-gray-400'>
              <td className='    border-gray-400 pt-3 pb-5 border-r px-2  font-[600] text-sm'>Quantities

              </td>
              <td className=' text-gray-500 px-2  pt-3 pb-5 text-sm'>Short run and Bulk orders are accepted

              </td>
            </tr>
            <tr className=' bg-[#F2F2F2] border-t  border-b border-gray-400'>
              <td className='    border-gray-400 pt-3 pb-5 border-r px-2  font-[600] text-sm'>Proofing



              </td>
              <td className=' text-gray-500 px-2  pt-3 pb-5 text-sm'>
                3D Digital Mockup, Physical Sampling(On Demand),

              </td>
            </tr>
            <tr className=' bg-[#F2F2F2] border-t  border-b border-gray-400'>
              <td className='    border-gray-400 pt-3 pb-5 border-r px-2  font-[600] text-sm'>Turnaround Time





              </td>
              <td className=' text-gray-500 px-2  pt-3 pb-5 text-sm'>
                6-7 days to print and dispatch, and 2-3 days for ground shipping



              </td>
            </tr>
          </tbody>
        </table>


      </div>
    },
    {
      id: 4,
      title: "Delivery",
      content: <div className=' bg-white rounded-lg  p-3'>
        <strong className=' text-2xl'>Experience fastest free delivery
        </strong>
        <p className=' pt'>We prioritize our customers’ convenience above all at Umbrella Custom Packaging. That’s why we’re happy to offer a wide range of payment options to suit your preferences. So, feel confident knowing that when you choose Umbrella Custom Packaging, paying for your orders is as effortless as possible.

        </p>

        <div className=' flex   flex-wrap   gap-2 justify-between pt-8'>
          <div className=' w-56 h-20   border-gray-200 rounded-lg'>
            <img src={sky} alt='' className=' w-full h-full object-contain' />
          </div>
          <div className=' w-56 h-20  border-gray-200 rounded-lg'>
            <img src={dhl} alt='' className=' w-full h-full object-contain' />
          </div>
          <div className='  w-56 h-20  border-gray-200 rounded-lg'>
            <img src={sups} alt='' className=' w-full h-full object-contain' />
          </div>
          <div className='  w-44 h-20 border-gray-200 rounded-lg'>
            <img src={ups} alt='' className=' w-full h-full object-contain' />
          </div>
        </div>




      </div>

    },
    {
      id: 4,
      title: "Reviews",

    }
  ];


  const fetchProducts = async () => {
    const response = await axios.get(`${BaseUrl}/products/get?slug=${slug}`)
    setProduct(response?.data?.data)
  }

  const fetchRelatedProducts = async () => {
    const response = await axios.get(`${BaseUrl}/products/related-products?slug=${slug}`)
    setRelatedProduct(response?.data?.data)
  }

  useEffect(() => {
    fetchProducts();
    fetchRelatedProducts();
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
        "name": serverData?.brandId?.name,
        "item": `${BaseUrl}/category/${serverData?.brandId?.slug}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product?.name,
        "item": `${BaseUrl}/sub-category/${slug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": product?.name,
        "item": `${BaseUrl}/${slug}`
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": serverData?.name,
    "description": serverData?.description,
    "image": serverData?.images?.map(img => `${BaseUrl}/${img.url}`) || [],
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

  return (
    <>
      {/* Only render PageMetadata when product is available */}
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
          // robots={product.robots || "index, follow"}
          robots={"noindex, nofollow"}
        />
      )}

      <section className='py-8'>
        <div className='lg:max-w-6xl max-w-[95%] bg-[#F7F7F7] rounded-lg p-2 flex lg:flex-row flex-col gap-4 mx-auto'>
          <div className='lg:w-6/12'>

            <div className=' pb-7 pt-3'>
                          <h1 className='pb-2  font-sans text-[28px] block sm:hidden'>{product?.name}</h1>

              <p className=' flex  flex-wrap items-center gap-1'><strong className=' font-normal  text-[#4440E6]'> <Link to={'/'} className='   font-sans' > Home </Link> </strong>/<strong className=' font-normal text-[#4440E6] capitalize'> <Link className='font-sans whitespace-nowrap' to={`/category/${product?.brandId?.slug}`}>{product?.brandId?.name}</Link> </strong> /<strong className='font-normal text-[#4440E6] capitalize'> <Link className=' font-sans whitespace-nowrap' to={`/sub-category/${product?.categoryId?.slug}`}>{product?.categoryId?.title}</Link> </strong> /<span className=' font-sans  whitespace-nowrap '>{product?.name} </span></p>
            </div>
            <div className='w-full'>
              <div className="overflow-hidden relative">
                <div
                  className="flex relative transition-transform ease-out duration-500"
                  style={{ transform: `translateX(-${curr * 100}%)` }}
                >
                  {product?.images?.map((image, i) => (
                    <div key={i} className="flex-none w-full rounded-lg overflow-hidden h-full">
                      <img
                        onClick={() => openImageViewer(image, i)}
                        src={`${BaseUrl}/${image?.url}`}
                        alt={image?.altText}
                        className="w-full cursor-pointer h-full object-cover"
                      />


                    </div>
                  ))}
                </div>
                <div className=' flex justify-center items-center cursor-pointer w-10 h-10 bg-white rounded-full absolute top-3 right-3'>
                  <IoSearch size={25} />
                </div>
                {/* <button
                  onClick={prev}
                  className="w-12 h-12 shadow rounded-full cursor-pointer absolute left-5 sm:top-56 top-40 flex justify-center items-center bg-white/80 text-gray-800 hover:bg-white"
                >
                  <TfiAngleLeft size={20} className="" />
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-full absolute cursor-pointer right-5 sm:top-56 top-40 flex justify-center items-center shadow bg-white/80 text-gray-800 hover:bg-white"
                >
                  <TfiAngleRight size={20} />
                </button> */}
              </div>

              <div className="flex flex-row pt-4 items-center justify-between gap-2">
                {product?.images?.map((image, i) => (
                  <div
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`
                                            transition-all  w-32 rounded-lg  h-auto overflow-hidden bg-white 
                                            ${curr === i ? "w-20 h-20 border-2 border-[#4440E6] border-dashed" : "bg-opacity-100 bg-white"}
                                        `}
                  >
                    <img
                      src={`${BaseUrl}/${image?.url}`}
                      alt=""
                      className="w-full h-full object-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3.5 lg:w-6/12">
            <h1 className='pb-2 font-semibold font-sans sm:text-[28px] hidden sm:block text-[20px]'>{product?.name}</h1>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="w-full">
                  <Input
                    label="Name"
                    star={"*"}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  />
                </div>

                <div className="w-full">
                  <Input
                    label="Email"
                    star={"*"}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  />
                </div>

                <div className="w-full">
                  <Input
                    label="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Company Name"
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                  />
                </div>

                <div className="w-full">
                  <Input
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <div className="w-full col-span-1 sm:col-span-1">
                  <Input
                    label="Box Style"
                    star={"*"}
                    name="boxStyle"
                    value={formData.boxStyle}
                    onChange={handleChange}
                    placeholder="Box Style"
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  />
                </div>

                <div className="w-full col-span-1 sm:col-span-1">
                  <Input
                    label="Size (Length)"
                    star={"*"}
                    name="length"
                    value={formData.length}
                    onChange={handleChange}
                    placeholder="Length"
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  />
                </div>

                <div className="w-full col-span-1 sm:col-span-1">
                  <Input
                    label="Size (Width)"
                    star={"*"}
                    name="width"
                    value={formData.width}
                    onChange={handleChange}
                    placeholder="width"
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  />
                </div>

                <div className="w-full col-span-1 sm:col-span-1">
                  <Input
                    label="Size (Depth)"
                    star={"*"}
                    name="depth"
                    value={formData.depth}
                    onChange={handleChange}
                    placeholder="Depth"
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  />
                </div>

                <div className="w-full col-span-1 sm:col-span-1">

                  <label
                    htmlFor="Unit"
                    className="  pb-1 flex  text-[#333333] text-sm font-medium   text-textColor"
                  >
                    Unit
                    <strong className=" text-red-600 m-0 pl-1">*</strong>
                  </label>
                  <select name="unit" value={formData.unit}
                    onChange={handleChange} className="w-full outline-none bg-lightGray   text-gray-500 placeholder:text-gray-400 placeholder:text-sm  border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  >
                    <option value={'Inches'}>Inches</option>
                    <option value={'mm'}>mm</option>
                    <option value={'cm'}>cm</option>
                  </select>
                </div>



                <div className="w-full col-span-1 sm:col-span-1">

                  <label
                    htmlFor="Stock"
                    className="  pb-1 flex  text-[#333333] text-sm font-medium   text-textColor"
                  >
                    Stock
                    <strong className=" text-red-600 m-0 pl-1">*</strong>
                  </label>
                  <select name="stock" value={formData.stock}
                    onChange={handleChange} className="w-full border text-gray-500 border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  >
                    <option value={'Stock'}>Stock</option>
                    <option value={'12pt Cardboard'}>12pt Cardboard</option>
                    <option value={'14pt Cardboard'}>14pt Cardboard</option>
                    <option value={'16pt Cardboard'}>16pt Cardboard</option>
                    <option value={'18pt Cardboard'}>18pt Cardboard</option>
                    <option value={'20pt Cardboard'}>20pt Cardboard</option>
                    <option value={'22pt Cardboard'}>22pt Cardboard</option>
                    <option value={'24pt Cardboard'}>24pt Cardboard</option>
                    <option value={'White SBS C1S C25'}>White SBS C1S C25</option>
                    <option value={'Corrugated'}>Corrugated</option>
                    <option value={'Rigid'}>Rigid</option>
                    <option value={'Kraft'}>Kraft</option>
                    <option value={'Linen'}>Linen</option>
                  </select>
                </div>



                <div className="w-full col-span-1 sm:col-span-1">

                  <label
                    htmlFor="Colors"
                    className="  pb-1 flex  text-[#333333] text-sm font-medium   text-textColor"
                  >
                    Colors
                    <strong className=" text-red-600 m-0 pl-1">*</strong>
                  </label>
                  <select name="colors" value={formData.colors}
                    onChange={handleChange} className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  >
                    <option value={'Colors'}>Colors</option>
                    <option value={'Plain (No Printing)'}>Plain (No Printing)</option>
                    <option value={'1 Color'}>1 Color</option>
                    <option value={'2 Color'}>2 Color</option>
                    <option value={'3 Color'}>3 Color</option>
                    <option value={'4 Color'}>4 Color</option>
                    <option value={'4/1 Color'}>4/1 Color</option>
                    <option value={'4/2 Color'}>4/1 Color</option>
                    <option value={'4/3 Color'}>4/1 Color</option>
                    <option value={'4/4 Color'}>4/1 Color</option>

                  </select>
                </div>



                <div className="w-full col-span-1 sm:col-span-1">

                  <label
                    htmlFor="Printing Sides"
                    className="  pb-1 flex  text-[#333333] text-sm font-medium   text-textColor"
                  >
                    Printing Sides
                    <strong className=" text-red-600 m-0 pl-1">*</strong>
                  </label>
                  <select name="printingSides" value={formData.printingSides}
                    onChange={handleChange} className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  >
                    <option value={'Inside'}>Inside</option>
                    <option value={'Outside'}>Outside</option>
                    <option value={'2 Color'}>Both (Inside & Outside)</option>

                  </select>
                </div>


                <div className="w-full col-span-1 sm:col-span-1">
                  <Input
                    label="Quantity"
                    star={"*"}
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  />
                </div>



                <div className="w-full col-span-1 sm:col-span-1">

                  <label
                    htmlFor="Add-Ons"
                    className="  pb-1 flex  text-[#333333] text-sm font-medium   text-textColor"
                  >
                    Add-Ons
                    <strong className=" text-red-600 m-0 pl-1">*</strong>
                  </label>
                  <select name="addOns" value={formData.addOns}
                    onChange={handleChange} className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  >
                    <option selected></option>
                    <option value={'Foiling'}>Foiling</option>
                    <option value={'Spot UV'}>Spot UV</option>
                    <option value={'Embossing'}>Embossing</option>
                    <option value={'Debossing'}>Debossing</option>
                    <option value={'handles'}>handles</option>
                    <option value={'Inserts'}>Inserts</option>
                    <option value={'Windows'}>Windows</option>

                  </select>
                </div>

                <div className="w-full col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5">
                  <label
                    htmlFor="design_upload"
                    className="block pb-1.5 text-[#333333] text-sm md:text-base font-medium"
                  >
                    Upload Your Design, Max Size 5MB
                    <p className="flex flex-wrap gap-0.5 text-xs md:text-sm mt-1">
                      Allowed File Types:
                      <span className="font-semibold"> png, pdf, jpg, jpeg, webp</span>
                    </p>
                  </label>
                  <Input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="border w-full bg-white rounded-lg border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#4440E6] file:text-white hover:file:bg-[#3a36c7]"
                    accept=".png,.pdf,.jpg,.jpeg,.webp"
                  />
                </div>

                <div className="w-full col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5">
                  <label
                    htmlFor="description"
                    className="block pb-1.5 text-[#333333] text-sm md:text-base font-medium"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    placeholder="Tell us the size / dimensions, material, finising, add-ons, and design preferences."

                  ></textarea>
                </div>
              </div>

              <div>
                <div className="w-full flex justify-end mt-2">

                  <Button
                    type="submit"
                    label={isLoading ? "Sending..." : "Request A Quote"}
                    disabled={!validate() || isLoading}
                    className={`bg-[#4440E6] w-full text-white py-2.5 px-4 rounded-lg hover:bg-[#3938b8] transition-colors ${!validate || isLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>


      <section>
        <div className=' sm:max-w-6xl bg-[#F7F7F7] p-3 rounded-xl mb-8 max-w-[95%] mx-auto'>
          <div className="my-10">
            <Tabs defaultTab={"Description"} className={' bg-white'} tabs={customBox} />
          </div>
        </div>
      </section>

      <section className='  '>
        <div className=' sm:max-w-6xl max-w-[95%] bg-[#FFDEBF] rounded-lg mx-auto'>
          <div className="flex flex-col  px-4 py-3 rounded-lg lg:flex-row  gap-8 items-center">
            <div className="w-full  lg:w-1/2">
              <img
                src={`${BaseUrl}/${product?.bannerImage}`}
                alt="Custom packaging example"
                className="w-full h-auto rounded-xl shadow-md object-cover"
                loading="lazy"
              />

            </div>

            <div className='w-full lg:w-1/2 '>

              <div className=" pt-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  {product?.bannerTitle}

                </h2>
                <div className=' overflow-y-auto h-56'>
                  <p dangerouslySetInnerHTML={{ __html: product?.bannerContent }} className="text-sm leading-6 text-gray-700 mb-6">



                  </p>

                </div>


              </div>

              <div className=" flex flex-wrap   mt-7 gap-2.5 items-center">
                <Button

                  label={"Order Process"}
                  className=" bg-[#4440E6] text-white"
                />

              </div>
            </div>



          </div>
        </div>
      </section>






      <div className=" sm:max-w-6xl max-w-[95%]  mt-5 py-4 bg-[#F7F7F7] rounded-lg  px-3 mx-auto">
        <div className="text-center mb-12">
          <h2 className="sm:text-[35px] text-[25px]   text-center   font-sans   font-[600] text-[#333333]">
            Enhance Your Product Presentation with Our Special Packaging Features

          </h2>

        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="bg-white"
            >
              <div className="text-center">
                <div>
                  <img src={feature.icon} alt='' className=' rounded-lg w-full' />
                </div>
                <strong className="text-xl font-medium text-gray-900 mb-2">{feature.name}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="my-8 md:my-12">
        <div className=" sm:max-w-6xl max-w-[95%] mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            {/* Image Section */}
            <div className="w-full lg:w-3/12">
              <img
                className="rounded-xl w-full h-auto object-cover shadow-md"
                src={`${BaseUrl}/${product?.images[0]?.url}`}
                alt="Automobile Tuck End Boxes"
              />
            </div>

            {/* Content Section */}
            <div className="w-full lg:w-9/12">
              {/* Buy Now Button */}
              <button className="bg-black hover:bg-gray-800 transition-colors duration-300 w-full text-white text-xl md:text-2xl font-bold py-3 px-4 rounded-lg shadow-lg">
                Buy Now!
              </button>

              {/* Description */}
              <p className="text-center py-4 md:py-6 text-gray-700 text-sm md:text-base leading-relaxed">
                Please note that it is our standard packaging for Automobile Tuck End Boxes.
                If you want to customize your packaging, please send a custom quote request above.
                We will respond to you immediately.
              </p>

              {/* Product Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4 w-full mb-4">
                {/* Product Name */}
                <div className="border border-gray-200 rounded-lg p-2 md:p-3 bg-white shadow-sm">
                  <button className="bg-[#5A56E9] mb-2 hover:bg-[#4440E6] text-white w-full text-sm md:text-base font-medium py-2 px-3 rounded">
                    Product Name
                  </button>
                  <div className=' pt-3 text-center'>
                    <strong className="  text-gray-400  font-medium text-[16px]">{product?.name}</strong>

                  </div>
                </div>

                {/* Size */}
                <div className="border border-gray-200 rounded-lg p-2 md:p-3 bg-white shadow-sm">
                  <button className="bg-[#5A56E9] mb-2 hover:bg-[#4440E6] text-white w-full text-sm md:text-base font-medium py-2 px-3 rounded">
                    Size
                  </button>
                  <div className=' pt-3 text-center'>
                    <strong className="  text-gray-400  font-medium text-[16px]">{product?.size}</strong>

                  </div>
                </div>

                {/* Price */}
                <div className="border border-gray-200 rounded-lg p-2 md:p-3 bg-white shadow-sm">
                  <button className="bg-[#5A56E9] hover:bg-[#4440E6] text-white w-full text-sm md:text-base font-medium py-2 px-3 rounded">
                    Price
                  </button>
                  <div className=' pt-3 text-center'>
                    <strong className="  text-gray-400  font-medium text-[16px]">${product?.actualPrice}</strong>

                  </div>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="quantity" className="text-gray-700 font-medium hidden sm:block">Qty:</label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    defaultValue={1}
                    className="rounded-lg border-2 border-gray-300 focus:border-[#5A56E9] focus:ring-1 focus:ring-[#5A56E9] w-16 md:w-20 py-2 px-3 text-center"
                  />
                </div>
                <button onClick={() => {
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
                  navigate('/cart')
                }} className="bg-[#4440E6] cursor-pointer hover:bg-[#3835C7] text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 shadow-md w-full sm:w-auto">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=' '>
        <CustomPackagingProduced />
      </section>

      <div className=" py-4 sm:max-w-6xl max-w-[95%] mx-auto">
        <Container fullWidth={false} className="">
          <div className="">
            <div>
              <h3 className=" text-2xl font-semibold">RELATED PRODUCTS</h3>
            </div>
            <div className=' py-5'>
              <CardSlider item={relatedProduct?.relatedProducts} />
            </div>


          </div>
        </Container>
      </div>


      {isViewerOpen && selectedImage && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className='absolute top-4 right-4'>
            <button
              onClick={closeImageViewer}
              className=" text-white text-3xl cursor-pointer hover:text-gray-300"
            >
              &times;
            </button>


          </div>
          <button
            onClick={goToPrevious}
            className="absolute left-4 text-white text-3xl  cursor-pointer hover:text-gray-300 p-4"
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
    </>
  )
}

export default ProductDetails