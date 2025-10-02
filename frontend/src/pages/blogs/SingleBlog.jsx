import React, { useEffect, useState } from 'react';
import { BaseUrl } from '../../utils/BaseUrl';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageMetadata from '../../components/common/PageMetadata';
import banner from '../../assets/images/about-banner.webp'
import detail from '../../assets/images/blog-details.jpg'
import { CiCalendar } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
function SingleBlog({ serverData }) {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [singleBlog, setSingleBlog] = useState(serverData || {});
    const [blogs, setBlogs] = useState([])
    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/blog/get?slug=${slug}`);
            if (!response?.data?.data) {
                navigate('/404')
                return
            }
            setSingleBlog(response?.data?.data);
        } catch (error) {
            navigate('/404')
        }
    };

    const fetchAllBlogs = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/blog/getAll`);
            setBlogs(response?.data?.data);
        } catch (error) {

        }
    };

    useEffect(() => {
        fetchBlogs();
        fetchAllBlogs();
    }, [slug]);

useEffect(() => {
  const contentElement = document.querySelector('.blog_content');
  if (contentElement) {
    const headingElements = Array.from(
      contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6')
    );
    headingElements.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `section-${index}-${heading.textContent
          .toLowerCase()
          .replace(/[^\w\s]/g, '')
          .replace(/\s+/g, '-')}`;
      }
    });
  }
}, [singleBlog]);

    const faqItemSchema = singleBlog?.qna?.map((item, index) => {
        return {
            "@context": "https://schema.org",
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        };
    });

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItemSchema || []
    };
    console.log(singleBlog);

    const [IsModalOpen,setIsModalOpen] = useState(false);

    return (
        <>
            <PageMetadata
                title={singleBlog?.metaTitle || serverData?.metaTitle || "Custom Packaging Solutions"}
                description={singleBlog?.metaDescription || serverData?.metaDescription || ""}
                keywords={singleBlog?.keywords || serverData?.keywords || ""}
                ogUrl={`${BaseUrl}/blog/${slug}`}
                ogImage={`${BaseUrl}/${singleBlog?.image}`}
                ogImageWidth="1200"
                ogImageHeight="630"
                canonicalUrl={`${BaseUrl}/blog/${slug}`}
                faqItemSchema={faqSchema}
                // robots={categoryData?.robots || serverData?.robots || "index, follow"}
                robots={"noindex, nofollow"}
            />

           <div className='container-fluid mx-auto '>
           
                   <div
                     className="md:pt-30 pt-10 md:pb-40 pb-10 bg-cover bg-center bg-no-repeat h-100 w-full"
                     style={{ backgroundImage: `url(${banner})` }}
                   >
           
                   </div>
           
                 </div>
                 <div className="container mx-auto mt-[-100px] ">
           
                   <div className="grid grid-cols-12 bg-white shadow  justify-center items-center gap-4 md:p-10 p-2 rounded-2xl ">
                     <div className='col-span-8'>
                       <div className='w-full flex flex-col  gap-5  mt-5'>
                         <div>npm
                           <h3 className="md:text-5xl text-lg font-medium text-[#454444]  text-balance md:leading-10 leading-8">How Technology is Transforming the Industry</h3>
                         </div>
                         <div className='flex justify-start items-center gap-5'>
                           <div className='flex  gap-2 text-lg'><span><CiCalendar size={30} /></span>February 28, 2024</div>
                           <span className='relative w-[1px] h-5 bg-[#b3b3b3]'></span>
                           <div className='flex  gap-2 text-lg'><span><CiUser size={30} />
                           </span>Admin</div>
                         </div>
           
           
                       </div>
                       <div className='mt-10'>
           
                         <img src={detail} alt="" className='w-full rounded-2xl my-5' />
                         <p className="text-start md:text-lg text-sm text-balance text-[#4d4e4f]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quasi obcaecati ratione exercitationem facilis omnis doloremque, iusto expedita architecto, fugit magnam? Accusamus fugit ducimus labore, optio rerum iure assumenda vel temporibus quaerat minus maiores, laudantium deserunt itaque, minima dolores amet sequi harum mollitia adipisci. Dolor quae natus tenetur maiores, earum quaerat labore reprehenderit suscipit. Quis reprehenderit quaerat numquam ducimus omnis nobis non consequuntur necessitatibus atque repellendus. Molestiae, vero? Perspiciatis harum fugit reiciendis doloremque soluta cumque delectus quibusdam commodi accusantium asperiores nulla eligendi recusandae libero quia, ad perferendis maxime excepturi nostrum voluptatum, nam atque error ea? Facere eos provident doloremque nobis tenetur possimus perspiciatis quam hic iste accusamus, mollitia eum vel quae eligendi consequatur voluptas quisquam deleniti ullam sed. Expedita quae quod perferendis rerum fugiat quos? Dolorem dignissimos soluta ducimus quasi quam corporis nobis vitae quidem quis saepe? Minima aliquam sunt ipsum soluta. Expedita, minus temporibus eaque in molestias quia officia consequatur ipsam quibusdam excepturi iure optio, labore corrupti odio quos dolores totam fugit illo sequi. Vel reiciendis hic sequi autem delectus eaque, provident quos pariatur explicabo quo possimus ipsum nemo velit rerum, nihil enim. Iste atque, laudantium libero recusandae rem temporibus fuga odit eum minima, sint enim placeat vitae? Veritatis illum ad, doloribus dignissimos maxime vel illo voluptatem in harum natus ullam ipsa commodi similique corrupti repudiandae vero. Sunt placeat non reiciendis porro cumque optio eius expedita tempora facilis temporibus vel tenetur qui ea amet doloribus illo neque voluptatum inventore, consequatur ratione assumenda, dignissimos unde. Aliquid, fugit sint architecto harum fuga inventore, quo dolor eius enim aspernatur eaque vel praesentium dolores ipsa nulla libero quos beatae ipsum voluptas minus? Dolores, iusto officia velit repellendus, quod ad libero aliquam similique rerum ipsum sapiente, incidunt reprehenderit quae animi ipsam dolorem nihil aspernatur natus inventore esse et est ullam. Dolor nobis dolore sunt at sequi assumenda, sed mollitia expedita nisi saepe. Quaerat voluptates voluptatibus rerum beatae fuga aperiam odio quidem maxime natus cupiditate eius ipsa at est molestias sint soluta debitis quibusdam quas consequuntur pariatur libero dignissimos, atque omnis! Dolorem expedita laborum minus repudiandae. Est, asperiores corporis iure quibusdam dignissimos sed temporibus voluptate saepe ipsum quasi. Cupiditate natus magnam vitae voluptas. Pariatur, possimus? Doloribus nam magni modi. Optio repellat iusto harum non nulla, eum numquam facere magni molestiae? Enim maiores, libero repellat eveniet fugit dolore error mollitia excepturi adipisci voluptatem tempore consequatur aliquam impedit! Odit excepturi consectetur similique nisi, magnam recusandae. Dolorum corporis impedit cumque doloremque incidunt earum voluptatibus iste doloribus. Harum ipsum consequuntur suscipit mollitia placeat nisi incidunt quaerat ipsa quo beatae optio quod, odio laborum necessitatibus possimus maxime dolorum exercitationem quasi, ipsam nam eveniet similique atque id perferendis! Voluptas eius illo sed? Saepe quae deserunt adipisci expedita, id aperiam cum asperiores debitis eveniet commodi repellat culpa ad consequuntur nisi distinctio, ducimus eius quasi, libero fugit dolore soluta temporibus! Vero ipsum porro eveniet at fugit beatae enim, distinctio aperiam voluptatibus quis magnam sapiente corporis perferendis nostrum architecto odit accusamus dolores consectetur natus eligendi atque voluptate! Laudantium dignissimos odit illo, adipisci eveniet nulla.</p>
           
           
                       </div>
                     </div>
                     <div className='col-span-4'></div>
           
           
           
                   </div>
                 </div>

        </>

    );
}

export default SingleBlog;