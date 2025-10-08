import { FaMinus, FaPlus } from "react-icons/fa";

export default function Accordion({
  toggleAccordion,
  isOpen,
  title,
  data,
  customKey
}) {
  return (
    <div className="border border-gray-200 rounded-md shadow-sm mb-4 transition-all duration-300">
      <button
        className="w-full flex justify-between items-center px-4 py-4 text-left focus:outline-none hover:bg-gray-50 transition duration-200"
        onClick={toggleAccordion}
      >
        <div className="flex items-start gap-3 text-start">
          {customKey && (
            <span className="text-[#C5A980] font-semibold text-[24px] leading-[24px]">
              {customKey}.
            </span>
          )}
          <span className="text-[#333] font-semibold text-[16px] leading-[24px]">
            {title}
          </span>
        </div>
        <span className="text-lg">
          {isOpen ? (
            <FaMinus className="text-[#C5A980]" />
          ) : (
            <FaPlus className="text-[#C5A980]" />
          )}
        </span>
      </button>

      {isOpen && (
        <div
          className="px-4 py-4  text-[15px] text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: data }}
        />
      )}
    </div>
  );
}
