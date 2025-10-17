import React from 'react'
import { CiCalendar } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import banner from '../../assets/images/about-banner.webp'
import team1 from '../../assets/images/blog-grid-1.jpg'
import team2 from '../../assets/images/blog-grid-2.jpg'
import team3 from '../../assets/images/blog-grid-3.jpg'
import team4 from '../../assets/images/blog-grid-4.jpg'
import { useEffect } from 'react';
import { BaseUrl } from '../../utils/BaseUrl';
import axios from 'axios';
import { useState } from 'react';
import PageMetadata from '../../components/common/PageMetadata';
import BlogCard from '../../components/common/BlogCard';
import TopNav from '../../components/Header/TopNav';
import Navbar from '../../components/Header/Navbar';
import Footer from '../../components/Footer/Footer';

function Blogs() {


    const [blog, setBlog] = useState([])
        const [page, setPage] = useState(1)
        const [totalPages, setTotalPages] = useState(1)
        const [loading, setLoading] = useState(false)
    
        const fetchBlogs = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${BaseUrl}/blog/getAll?page=${page}`)
                if (page === 1) {
                    setBlog(response?.data?.data)
                } else {
                    setBlog(prev => [...prev, ...response?.data?.data])
                }
                setTotalPages(response?.data?.pagination?.totalPages)
            } catch (error) {
                console.error("Error fetching blogs:", error)
            } finally {
                setLoading(false)
            }
        }
    
        const loadMore = () => {
            if (page < totalPages) {
                setPage(prev => prev + 1)
            }
        }
    
        useEffect(() => {
            fetchBlogs()
        }, [page])

    const teams = [
        { title: 'How Technology is Transforming the Industry', image: team1, excerpt: 'Maria founded the company in 2004 with a vision to bring authentic Italian craftsmanship to the world.' },
        { title: 'The Future of Fashion How Technology Transforms the Industry', image: team2, excerpt: 'Francesca joined the team in 2020, bringing fresh ideas and a modern touch to our classic designs.' },
        { title: 'From Concept to Closet The Journey of Sustainable Fashion', image: team3, excerpt: 'Luca oversees our production process, ensuring every piece meets our high standards of quality.' },
        { title: 'Unlocking Style Potential Personalization in Fashion Retail', image: team4, excerpt: 'Giulia manages our marketing efforts, connecting us with customers around the globe.' },
    ];


    const metadata = {
                    title: "Blog - Umbrella Custom Packaging",
                    description: "Our Blogs Simple Steps to get the Custom Packaging Produced Following are few steps which provide the complete Guide. Price Quote Payment Design Approval Production Shipping Reorders Get Price Quote Submit a request for free custom quote first through our website or calling our customer service representative. You will have the prices in 30 minutes. [&hellip;]",
                    keywords: "custom packaging, wholesale boxes, packaging solutions, affordable packaging, custom boxes, packaging design, eco-friendly packaging",
                    author: "Umbrella Custom Packaging",
                    ogUrl: `${BaseUrl}/blogs`,
                    canonicalUrl: `${BaseUrl}/blogs`,
                    ogTitle: "Blog - Umbrella Custom Packaging",
                    ogDescription: "Our Blogs Simple Steps to get the Custom Packaging Produced Following are few steps which provide the complete Guide. Price Quote Payment Design Approval Production Shipping Reorders Get Price Quote Submit a request for free custom quote first through our website or calling our customer service representative. You will have the prices in 30 minutes. [&hellip;]",
                    modifiedTime: "2025-06-13T15:18:43+00:00",
                    twitterTitle: "Blog - Umbrella Custom Packaging",
                    twitterDescription: "Our Blogs Simple Steps to get the Custom Packaging Produced Following are few steps which provide the complete Guide. Price Quote Payment Design Approval Production Shipping Reorders Get Price Quote Submit a request for free custom quote first through our website or calling our customer service representative. You will have the prices in 30 minutes. [&hellip;]",
                    robots: "index, follow"
                  };

    return (
        <>
<TopNav />
     <Navbar />
         <PageMetadata {...metadata} />
            <div className='container-fluid mx-auto'>
                <div
                    className="md:pt-30 pt-10 md:pb-20 pb-10 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${banner})` }}
                >
                    <div className=" text-center w-full">

                        <div className="flex flex-col bg-[#ffffffca] justify-center items-center gap-4 md:p-10 p-2 rounded-md md:w-2xl w-[300px] mx-auto">
                            <h3 className="md:text-4xl text-lg font-semibold text-[#454444]  text-balance md:leading-10 leading-6">Blog</h3>
                            <span className="md:text-lg text-sm text-gray-500">Homepage / Blog</span>

                        </div>
                    </div>
                </div>

            </div>
            <div className='container mx-auto py-10 px-2'>
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-10">
                    {blog?.map((item, index) => (
                        <BlogCard key={index} data={item} />
                    ))}
                </div>

                  {page < totalPages && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={loadMore}
                            disabled={loading}
                            className=" bg-[#5652E8] hover:bg-[#e68317] text-white font-medium py-2 px-6 rounded-md transition duration-300"
                        >
                            {loading ? 'Loading...' : 'Load More'}
                        </button>
                    </div>
                )}
            </div>

            <Footer/>
        </>
    )
}

export default Blogs
