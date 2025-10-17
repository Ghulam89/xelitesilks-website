import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Modal from "../common/Modal";
import Input from "../common/Input";
import logo from "../../assets/images/xelite silk.svg";
import Button from "../common/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { BaseUrl } from "../../utils/BaseUrl";

const AddReviews = ({ isModalOpen, setIsModalOpen, closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    review: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (value) => {
    setFormData(prev => ({
      ...prev,
      rating: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post(`${BaseUrl}/rating/create`, formData);
      toast.success("Review submitted successfully!");
      setIsModalOpen(false);
      
      setFormData({
        name: "",
        email: "",
        rating: 0,
        review: ""
      });
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal} className={"rounded-xl"}>
        <div className="p-5">
          <div className="bg-[#b8b6fa99] rounded-[10px] flex flex-col items-center p-6">
            <div className="cursor-pointer flex w-full justify-end">
              <MdClose onClick={() => setIsModalOpen(false)} size={25} />
            </div>
            <img src={logo} alt="" width={100} height={60} />
            <h2 className="text-xl font-semibold mb-4">Share Your Feedback</h2>
            
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="flex w-full gap-5 justify-between">
                <div className="w-full">
                  <Input
                    label="Full Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="rounded-[8px] w-full h-[40px] border-[#333333] border bg-[#fff] px-3"
                    required
                  />
                </div>
                <div className="w-full">
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="rounded-[8px] w-full h-[40px] border-[#333333] border bg-[#fff] px-3"
                    required
                  />
                </div>
              </div>

              <div className="mt-3">
                <p className="pb-1.5 flex text-[#333333] text-sm font-medium text-textColor">
                  Rate Us:
                </p>
                <div className="flex justify-between">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <input
                        type="radio"
                        className="border-[#333333] border bg-[#fff] mr-1"
                        name="rating"
                        id={`rating-${rating}`}
                        checked={formData.rating === rating}
                        onChange={() => handleRatingChange(rating)}
                        required
                      />
                      <label htmlFor={`rating-${rating}`}>
                        {"★".repeat(rating) + "☆".repeat(5 - rating)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col mb-4">
                <label
                  className="pb-1.5 flex text-[#333333] text-sm font-medium text-textColor"
                  htmlFor="review"
                >
                  Your Review:
                </label>
                <textarea
                  id="review"
                  name="review"
                  rows={3}
                  value={formData.review}
                  onChange={handleChange}
                  placeholder="Write a Review"
                  className="rounded-[8px] w-full border-[#333333] border bg-[#fff] p-3"
                  required
                ></textarea>
              </div>
              
              <Button
                label={loading ? "Posting..." : "Post"}
                className="bg-[#C5A980] text-white mt-3 w-full py-2 rounded-lg font-medium"
                type="submit"
                disabled={loading}
              />
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddReviews;