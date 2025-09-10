import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { BaseUrl } from "../../utils/BaseUrl";

const BlogCard = ({data}) => {
  return (
    <>
    <div className=" ">
    <Link to={`/blog/${data?.slug}`} className="">
        <div className="">
          <div className="  w-full sm:h-32 h-32">
          <img src={`${BaseUrl}/${data?.image}`} alt="" className=" w-full h-full object-center object-cover" />
          </div>
          <div className=" h-64 shadow border p-2 border-t-0 text-center text-[#333333]  border-gray-100">
          <strong className="  font-bold text-[#333333] font-medium  text-2xl  whitespace-pre-wrap py-3">{data?.title?.slice(0,70)}</strong>
         <div 
              className="text-gray-600 mb-4 flex-1 line-clamp-3 pt-2"
              dangerouslySetInnerHTML={{ __html: data?.content }}
            />
          <Button className=" hover:bg-[#4440E6]  text-[#4440E6] uppercase hover:text-white mx-auto  mt-3" label={'Continue Reading'} />
          </div>
        </div>
      </Link>
    </div>
      
    </>
  );
};

export default BlogCard;
