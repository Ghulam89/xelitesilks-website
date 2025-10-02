import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { BaseUrl } from "../../utils/BaseUrl";
import { CiCalendar, CiUser } from "react-icons/ci";

const BlogCard = ({ data }) => {
  return (
    <>

      <Link to={`/blog/${data?.slug}`} className="">
        <div className="flex flex-col justify-center items-start gap-2 p-5 group  shadow rounded-2xl hover:shadow-lg transition-shadow duration-300 ">
          <img src={`${BaseUrl}/${data?.image}`} alt="" className="w-full object-cover rounded-lg shadow-lg" />
          <div className='w-full flex justify-between items-center mt-5'>
            <div className='flex justify-between items-center gap-2 text-sm'><span><CiCalendar size={20} /></span>February 28, 2024</div>
            <div className='flex justify-between items-center gap-2 text-sm'><span><CiUser size={20} />
            </span>Admin</div>
          </div>

          <h4
            className="mt-3 font-semibold md:text-2xl text-xl relative inline-block 
                                   after:content-[''] after:absolute after:left-0 after:bottom-0
                                   after:h-[2px] after:w-0 after:bg-black
                                   after:transition-all after:duration-300 
                                   after:ease-[cubic-bezier(0.215,0.61,0.355,1)]
                                   group-hover:after:w-full group-hover:text-[#c5a980] cursor-pointer text-pretty"
          >
            {data?.title?.slice(0, 70)}
          </h4>


          <p className="text-start md:text-lg text-sm text-pretty text-[#4d4e4f]" dangerouslySetInnerHTML={{ __html: data?.content }} />
        </div>
      </Link>


    </>
  );
};

export default BlogCard;
