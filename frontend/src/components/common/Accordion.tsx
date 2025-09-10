
import { FaMinus, FaPlus } from "react-icons/fa";

export default function Accordion(props) {
    return (
      <>
        <div className=" faq_content  border border-gray-200 shadow-[-1px_-1px_1px_2px]   shadow-[#f5f5f5]  rounded-sm py-1.5 px-4 mb-5">
          <button
            className="w-full   items-center   bg-transparent py-2  hover:text-[#4440E6] cursor-pointer flex text-[15px] justify-between  text-left
                              transition duration-300"
            onClick={props.toggleAccordion}
          >
            <div className=" flex  items-center gap-3">
              <div className="">
                {/* <h2 className=" text-[#EE334B] font-semibold">{props.id}</h2> */}
              </div>
              <p className=" font-semibold m-0">
                {" "}
                {props.title}
              </p>
            </div>
            <p className=" cursor-pointer">
              {props.isOpen ? (
                <>
                <FaMinus  color="#4440E6"  />
                </>
              ) : (
                <FaPlus  className=" text-gray-300" />
              )}
            </p>
          </button>
          {props.isOpen && (
            <div dangerouslySetInnerHTML={{ __html: props.data}} className="     pl-2.5 text-gray-500">
             
            </div>
          )}
        </div>
      </>
    );
  }