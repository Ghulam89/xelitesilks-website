import Hero from '../../components/Hero'
import { BaseUrl } from '../../utils/BaseUrl'
import ServicesBanner from '../../components/ServicesBanner'
import ShopByCategories from '../../components/ShopByCategories'
import Testimonials from '../../components/Testimonials'
import ProductCard from '../../components/common/ProductCard'
import PersonalStyle from '../../components/PersonalStyle/PersonalStyle'
import axios from 'axios'
import { useEffect, useState } from 'react'
import who from '../../assets/images/2.webp'
import how from '../../assets/images/1.webp'
import where from '../../assets/images/3.webp'
import PageMetadata from '../../components/common/PageMetadata'
export const Home = () => {

  const metadata = {
    title: "",
    description: "",
    keywords: "",
    author: "",
    canonicalUrl: BaseUrl,
    ogUrl: BaseUrl,
    ogImage: `${BaseUrl}/images/web-banner.webp`,
    ogImageWidth: "768",
    ogImageHeight: "499",
    ogImageType: "image/webp",
    modifiedTime: "2025-06-13T15:18:43+00:00",
    homeSchema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Umbrella Custom Packaging",
      "hasMap": "https://www.google.com/maps/place/Umbrella+Custom+Packaging+USA/@34.0304757,-118.4009978,17z/data=!3m2!4b1!5s0x80c2bbd3055d51a3:0x68496cbd465819b1!4m6!3m5!1s0x80c2bbbf80eec803:0x8425555061bf7fe8!8m2!3d34.0304757!4d-118.4009978!16s%2Fg%2F11smvg80n4?entry=ttu&g_ep=EgoyMDI1MDcxMy4wIKXMDSoASAFQAw%3D%3D",
      "url": "https://xelitesilks.com",
      "logo": "https://xelitesilks.com/src/assets/images/xelite silk.svg",
      "image": "https://xelitesilks.com/src/assets/images/web-banner.webp",
      "telephone": "+1-747-247-0456",
      "description": "Get high-quality custom packaging boxes at wholesale prices. We offer affordable packaging for businesses of all sizes. Enjoy bulk discounts, free design support, and fast, reliable shipping. Order now for unmatched prices!",
      "founder": {
        "@type": "Person",
        "name": "Scott Ray"
      },
      "foundingDate": "2020-06-01",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "9854 National Blvd #1042",
        "addressLocality": "Los Angeles",
        "addressRegion": "CA",
        "postalCode": "90034",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 34.030563,
        "longitude": -118.40069
      },
      "priceRange": "$$",
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Eco-Friendly Materials",
          "value": "Yes"
        }
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "09:00",
          "closes": "18:00"
        }
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+1-747-247-0456",
          "contactType": "sales",
          "contactOption": "TollFree",
          "areaServed": "US",
          "availableLanguage": "en",
          "email": "sales@umbrellapackaging.com"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/umbrellapackaging",
        "https://www.instagram.com/umbrellacustompackaging/",
        "https://www.youtube.com/channel/UCkxeWyAJqxjFSzlbnSoIVLQ",
        "https://www.linkedin.com/company/umbrellacustompackaging/",
        "https://x.com/umbrellapack"
      ]
    }

  };




  const [allProducts, setAllProducts] = useState([])


  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/products/getAll`)

      setAllProducts(response?.data?.data)
    } catch (error) {

    }
  }


  useEffect(() => {
    fetchProducts()
  }, [])


  return (
    <>
      <PageMetadata {...metadata} />

      <main>
        <Hero />
        <ShopByCategories />
        {/* Who / How / Where */}
        <div className="max-w-7xl mx-auto px-4 md:px-0 pb-12">
          <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8'>
            {[{ img: who, label: "who", desc: "Handmade by Italian artisans, carrying generations of silk craftsmanship." }, { img: how, label: "how", desc: "Sustainably produced with eco-friendly dyes and timeless design." }, { img: where, label: "where", desc: "100% made in Italy, inspired by the country's rich heritage." }].map((item, i) => (
              <div key={i} className='flex flex-col items-center p-10 text-center gap-4 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-300'>
                <div className='bg-[#c5a980] p-2 rounded-full mb-2'>
                  <img src={item.img} alt={item.label} width={90} height={90} className='object-cover transform transition-transform duration-300 hover:rotate-6' />
                </div>
                <h4 className='text-3xl font-semibold capitalize'>{item.label}</h4>
                <p className='text-lg text-gray-600 text-pretty'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className=' max-w-7xl  px-3 mx-auto'>
          <h2 className="sm:text-3xl text-2xl font-semibold text-center mb-10 text-gray-800">
            Recently Viewed & Bestsellers
          </h2>

          <div className=' grid sm:gap-6 gap-2  sm:grid-cols-4 grid-cols-2'>
            {
              allProducts?.map((item, index) => {
                return (
                  <ProductCard key={item._id} product={item} />
                )
              })
            }

          </div>
        </div>
        <PersonalStyle />

        <Testimonials />
        <ServicesBanner />
      </main>
    </>
  )
}