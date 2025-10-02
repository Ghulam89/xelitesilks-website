import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/common/Button";
import Container from "../../components/common/Container";
import { BaseUrl } from "../../utils/BaseUrl";
import PageMetadata from "../../components/common/PageMetadata";
import ProductCard from "../../components/common/ProductCard";

const Category = ({ serverData }) => {
  const { slug } = useParams();
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [categoryData, setCategoryData] = useState(null);

  const FetchCategory = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/collections/get?slug=${slug}`);  
      if (!response?.data?.data) {
        
        return
      }
      setCategoryData(response?.data?.data);

      const response2 = await axios.get(
        `${BaseUrl}/products/categoryProducts/${response?.data?.data._id}/products-by-category`
      );

      console.log(response2);
      
      setCategoryProduct(response2?.data?.data?.products);
    } catch (err) {
    
    }
  };

  useEffect(() => {
    FetchCategory();
  }, [slug]);

  useEffect(() => {
    return () => {
      setCategoryData(null);
      setCategoryProduct([]);
    };
  }, [slug]);

  

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
        "name": categoryData?.name,
        "item": `${BaseUrl}/category/${slug}`
      }
    ]
  };

  return (

    <>
      <PageMetadata
        title={categoryData?.metaTitle || serverData?.metaTitle || "Custom Packaging Solutions"}
        description={categoryData?.metaDescription || serverData?.metaDescription || ""}
        keywords={categoryData?.keywords || serverData?.keywords || ""}
        ogUrl={`${BaseUrl}/category/${slug}`}
        ogImage={`${BaseUrl}/${categoryData?.bannerImage}`}
        ogImageWidth="1200"
        ogImageHeight="630"
        canonicalUrl={`${BaseUrl}/category/${slug}`}
        breadcrumbSchema={breadcrumbSchema}
        // robots={categoryData?.robots || serverData?.robots || "noindex, nofollow"}
        robots={"noindex, nofollow"}
      />
<div className=" bg-[#faf8f6] pb-11">
  <div  className=" max-w-7xl mx-auto">

      <div className=" pt-4 pb-10 text-center">
        <h1 className=" font-semibold text-3xl">{categoryData?.name}</h1>
        <p className=" pt-5 text-[#0a0a88]">{categoryData?.description}</p>
      </div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
  {categoryProduct?.map((item, index) => (
    <ProductCard key={item._id} product={item} />
  ))}
</div>
    </div>
</div>
    
   
      
    

      



    </>

  );
};

export default Category;

