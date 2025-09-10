import Hero from '../../components/Hero'
import CustomPackaging from '../../components/customPackaging'
import CustomBoxMaterial from '../../components/CustomBoxMaterial/CustomBoxMaterial'
import GetPriceQuote from '../../components/GetPriceQuote/GetPriceQuote'
import SpecialPackaging from '../../components/SpecialPackaging/SpecialPackaging'
import CustomPackagingApart from '../../components/CustomPackagingApart/CustomPackagingApart'
import TemplateToDesign from '../../components/TemplateToDesign/TemplateToDesign'
import ProductionUnits from '../../components/ProductionUnits/ProductionUnits'
import CustomPackagingProduced from '../../components/CustomPackagingProduced'
import PackagingBanner from '../../components/common/PackagingBanner'
import WeFulfil from '../../components/WeFulfil/WeFulfil'
import CustomerReviews from '../../components/CustomerReviews'
import InspirationPackaging from '../../components/InspirationPackaging'
import ImportanceCustomPackaging from '../../components/ImportanceCustomPackaging'
import Blog from '../../components/blog/Blog'
import FAQ from '../../components/FAQ/FAQ'
import { BaseUrl } from '../../utils/BaseUrl'
import PageMetadata from '../../components/common/PageMetadata'
import goScreen from '../../assets/images/goScreen.webp'
import ServicesBanner from '../../components/ServicesBanner'
import ShopByCategories from '../../components/ShopByCategories'
import Testimonials from '../../components/Testimonials'
import ProductCard from '../../components/common/ProductCard'
import PersonalStyle from '../../components/PersonalStyle/PersonalStyle'

export const Home = () => {

  const metadata = {
    title: "Affordable, High-Quality Custom Packaging Boxes – Wholesale | Umbrella Custom Packaging",
    description: "Get high-quality custom packaging boxes at wholesale prices. We offer affordable packaging for businesses of all sizes. Enjoy bulk discounts, free design support, and fast shipping.",
    keywords: "custom packaging, wholesale boxes, packaging solutions, affordable packaging, custom boxes, packaging design, eco-friendly packaging",
    author: "Umbrella Custom Packaging",
    canonicalUrl: BaseUrl,
    ogUrl: BaseUrl,
    ogImage: `${BaseUrl}/images/web-banner.webp`,
    ogImageWidth: "768",
    ogImageHeight: "499",
    ogImageType: "image/webp",
    modifiedTime: "2025-06-13T15:18:43+00:00",
    homeSchema : {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Umbrella Custom Packaging",
  "hasMap": "https://www.google.com/maps/place/Umbrella+Custom+Packaging+USA/@34.0304757,-118.4009978,17z/data=!3m2!4b1!5s0x80c2bbd3055d51a3:0x68496cbd465819b1!4m6!3m5!1s0x80c2bbbf80eec803:0x8425555061bf7fe8!8m2!3d34.0304757!4d-118.4009978!16s%2Fg%2F11smvg80n4?entry=ttu&g_ep=EgoyMDI1MDcxMy4wIKXMDSoASAFQAw%3D%3D",
  "url": "https://umbrellapackaging.com",
  "logo": "https://umbrellapackaging.com/src/assets/images/xelite silk.svg",
  "image": "https://umbrellapackaging.com/src/assets/images/web-banner.webp",
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


     

  return (
    <>
      {/* <PageMetadata {...metadata} /> */}
 
      <main>  
       <Hero/>
       <ShopByCategories/>
        <div className=' max-w-7xl mx-auto'>
          <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">
        Recently Viewed & Bestsellers
      </h2>

          <div  className=' grid gap-6  grid-cols-4'>
         <ProductCard/>
          <ProductCard/>
           <ProductCard/>
            <ProductCard/>
      </div>
        </div>
       <PersonalStyle/>
       
       <Testimonials/>
       <ServicesBanner/>
      </main>
    </>
  )
}