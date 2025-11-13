import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
import { useEffect, useState } from "react";
import { FaStar, FaCheckCircle, FaChevronDown, FaFilter } from "react-icons/fa";
import AddReviews from "../../components/CustomerReviews/AddReviews";
import Button from "../../components/common/Button";
import TopNav from "../../components/Header/TopNav";
import Navbar from "../../components/Header/Navbar";
import Footer from "../../components/Footer/Footer";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [expanded, setExpanded] = useState({});
  
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/rating/getAll`);
      setReviews(response?.data?.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Calculate average rating
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((a, b) => a + (b.rating || 0), 0) / reviews.length).toFixed(1)
      : 0;

  // Toggle "Read More"
  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <TopNav />
      <Navbar />

      <div className="bg-[#fcfaf8] min-h-screen py-10">
        <div className="container mx-auto max-w-6xl px-4">
          
          {/* --- Top Section (Average + Filter) --- */}
          <div className="flex justify-between items-center mb-10">
            {/* Average Rating */}
            <div className="flex items-center relative gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={22}
                    color={i < Math.round(avgRating) ? "#f0ad4e" : "#e4e5e9"}
                  />
                ))}
              </div>
              <p className="text-gray-800 font-medium">
                {avgRating} out of 5 ({reviews.length} Reviews)
              </p>
              <button
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="ml-2 text-gray-600 hover:text-gray-800"
              >
                <FaChevronDown size={18} />
              </button>

                 {/* Rating Breakdown Dropdown */}
          {showBreakdown && (
  <div className="bg-white shadow-md border right-0 top-10 w-full z-40 absolute border-gray-100 rounded-md p-4 mb-8">
    <div  className=" pb-5 text-center">
      <h2 className=" text-4xl justify-center font-semibold flex gap-1.5 items-center">   <FaStar size={30} color={"#f0ad4e"} />
       {avgRating}</h2>
    </div>
    {[5, 4, 3, 2, 1].map((star) => {
      const count = reviews.filter((r) => r.rating === star).length;
      const percent = reviews.length ? (count / reviews.length) * 100 : 0;
      return (
        <div key={star} className="flex items-center mb-2">
          <span className="flex gap-1 text-sm text-gray-700">
            {[...Array(5)].map((_, i) => (

              <div>
                <FaStar key={i} size={14} color={"#f0ad4e"} />
              </div>
            ))}
          </span>
          <div className="flex-1 h-3 bg-gray-200 rounded-full mx-2 overflow-hidden">
            <div
              className="h-3 bg-[#f0ad4e]"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-500">({count})</span>
        </div>
      );
    })}
  </div>
)}

            </div>

            {/* Filter Icon */}
            <button
              className="p-2 border border-gray-300 rounded hover:bg-gray-100 transition"
              title="Filter Reviews"
            >
              <svg data-panel="dropdown" id="menu-icon-svg" width="20" height="21" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
  <path id="menu-btn-path" data-panel="dropdown" d="M5.143 15a2.501 2.501 0 0 1 4.717 0h8.475v1.666H9.86a2.5 2.5 0 0 1-4.717 0H1.668V15h3.475Zm5-5.834a2.5 2.5 0 0 1 4.717 0h3.475v1.667H14.86a2.5 2.5 0 0 1-4.717 0H1.668V9.166h8.475Zm-5-5.833a2.5 2.5 0 0 1 4.717 0h8.475v1.666H9.86a2.5 2.5 0 0 1-4.717 0H1.668V3.333h3.475Zm2.358 1.666a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666Zm5 5.834a.833.833 0 1 0 0-1.667.833.833 0 0 0 0 1.667Zm-5 5.833a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666Z"></path>
</svg>
            </button>
          </div>

       


          {/* --- Reviews Grid --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {reviews.map((item, index) => {
              const text = item?.review || "";
              const isExpanded = expanded[item._id];
              const truncated = text.length > 180 ? text.slice(0, 180) + "..." : text;

              return (
                <div
                  key={index}
                  className="flex bg-white rounded-md shadow-sm overflow-hidden border border-gray-100"
                >
                  <div className="flex-1 p-6">
                    {/* Reviewer + Verified */}
                    <div className="flex items-center gap-1 mb-2">
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {item?.name || "Anonymous"}
                      </h3>
                      <FaCheckCircle color="#000" size={14} />
                    </div>

                    {/* Rating Stars */}
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={18}
                          color={i < item.rating ? "#f0ad4e" : "#e4e5e9"}
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      {isExpanded ? text : truncated}
                    </p>

                    {/* Read More Button */}
                    {text.length > 180 && (
                      <button
                        onClick={() => toggleExpand(item._id)}
                        className="text-[#4440E6] text-sm font-medium hover:underline mb-3"
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    )}

                    {/* Product Details */}
                    {item?.product && (
                      <div className="flex  gap-3 mt-2">
                        {item?.product?.images?.[0]?.url && (
                          <img
                            src={`${BaseUrl}/${item.product.images[0].url}`}
                            alt={item.product.images[0].altText}
                            className="w-14 h-14 object-cover rounded-md border"
                          />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {item.product.name}
                          </p>
                          
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          
        </div>
      </div>

      <AddReviews
        isModalOpen={openModal}
        setIsModalOpen={setOpenModal}
        onReviewAdded={fetchReviews}
      />
      <Footer />
    </>
  );
};

export default Reviews;
