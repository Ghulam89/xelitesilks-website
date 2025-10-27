import { useLocation, useParams } from "react-router-dom";
import NotFound from "../pages/404";
import { Home } from "../pages/home/Home";
import ProductDetails from "../pages/productDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../utils/BaseUrl";
import Blogs from "../pages/blogs/Blogs";
import ContactUs from "../pages/contactUs/ContactUs";
import About from "../pages/about/About";
import SingleBlog from "../pages/blogs/SingleBlog";
import Category from "../pages/category/Category";
import Cart from "../pages/cart/Cart";
import Profile from "../pages/profile";
import Checkout from "../pages/checkout/Checkout";
import Dashboard from "../pages/dashboard";
import Orders from "../pages/dashboard/Orders";

export default function WebsiteRoutes({ serverData, CategoryProducts }) {
 const location = useLocation();
  
    
function ProductDetailsWrapper({ serverData }) {
  const { slug } = useParams();
  const [productData, setProductData] = useState(serverData);
  const [loading, setLoading] = useState(!serverData);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!serverData) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${BaseUrl}/products/get?slug=${slug}`);
          setProductData(response?.data?.data);
          setError(false);
        } catch (err) {
        
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [slug, serverData]);

  // if (loading) return <div>Loading...</div>;
  // if (!loading && (error || !productData)) return <NotFound />;
  
  return <ProductDetails serverData={productData} />;
}
  return [
    { path: '/', element: <Home key="home" /> },
    { path: '/blogs', element: <Blogs key="blog" /> },
     {
      path: '/dashboard',
      element: <Dashboard key="dashboard" />,
      children: [
        { index: true, element: <Orders key="orders" /> },
    { path: 'profile', element: <Profile key="profile" /> },
      ],
    },
    { path: '/cart', element: <Cart key="cart" /> },
    { path: '/checkout', element: <Checkout key="checkout" /> },
    { path: '/contact-us', element: <ContactUs key="contact-us" /> },
    { path: '/about-us', element: <About key="about-us" /> },
        // { path: '/404', element: <NotFound key="not-found" /> },
        {
          path: '/collections/:slug',
          element: <Category
            key={location.pathname}
            serverData={serverData}
          />
        },
        {
          path: '/blog/:slug',
          element: <SingleBlog
            key={location.pathname}
            serverData={serverData}
          />
        },
       
      {
      path: '/:slug',
      element: (
        <ProductDetailsWrapper
          key={location.pathname}
          serverData={serverData}
        />
      )
    },
        // { path: '*', element: <NotFound/> }
  ];
}

