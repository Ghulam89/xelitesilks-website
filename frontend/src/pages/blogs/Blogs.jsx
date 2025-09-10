import React, { useEffect, useState } from 'react'
import BlogCard from '../../components/common/BlogCard'
import CustomPackagingProduced from '../../components/CustomPackagingProduced';
import { BaseUrl } from '../../utils/BaseUrl';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import PageMetadata from '../../components/common/PageMetadata';

const Blogs = () => {
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
 const metadata = {
                title: "Blog - Umbrella Custom Packaging",
                description: "Our Blogs Simple Steps to get the Custom Packaging Produced Following are few steps which provide the complete Guide. Price Quote Payment Design Approval Production Shipping Reorders Get Price Quote Submit a request for free custom quote first through our website or calling our customer service representative. You will have the prices in 30 minutes. [&hellip;]",
                keywords: "custom packaging, wholesale boxes, packaging solutions, affordable packaging, custom boxes, packaging design, eco-friendly packaging",
                author: "Umbrella Custom Packaging",
                ogUrl: `${BaseUrl}/blogs`,
                ogTitle: "Blog - Umbrella Custom Packaging",
                ogDescription: "Our Blogs Simple Steps to get the Custom Packaging Produced Following are few steps which provide the complete Guide. Price Quote Payment Design Approval Production Shipping Reorders Get Price Quote Submit a request for free custom quote first through our website or calling our customer service representative. You will have the prices in 30 minutes. [&hellip;]",
                modifiedTime: "2025-06-13T15:18:43+00:00",
                twitterTitle: "Blog - Umbrella Custom Packaging",
                twitterDescription: "Our Blogs Simple Steps to get the Custom Packaging Produced Following are few steps which provide the complete Guide. Price Quote Payment Design Approval Production Shipping Reorders Get Price Quote Submit a request for free custom quote first through our website or calling our customer service representative. You will have the prices in 30 minutes. [&hellip;]",
                robots: "noindex, nofollow"
              };
    return (
        <>
 <PageMetadata {...metadata} />
            
             
            <div className="sm:max-w-7xl max-w-[95%] mx-auto py-8">
                <div>
                     
                </div>
               <div>
 <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5 gap-6'>
                    {blog?.map((item, index) => (
                        <BlogCard key={index} data={item} />
                    ))}
                </div>
               </div>
               

                {page < totalPages && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={loadMore}
                            disabled={loading}
                            className="bg-[#ff931e] hover:bg-[#e68317] text-white font-medium py-2 px-6 rounded-md transition duration-300"
                        >
                            {loading ? 'Loading...' : 'Load More'}
                        </button>
                    </div>
                )}
            </div>

        </>
    )
}

export default Blogs