import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
import ProductCard from "../common/ProductCard";
const PopupSearchModal = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef(null);

  // Fade-in animation
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 2) {
      setShowResults(false);
      setSearchResults([]);
      return;
    }

    setIsSearchLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/products/search?name=${value}`);
      setSearchResults(response.data.data || []);
      setShowResults(true);
    } catch (error) {
      console.error("Error searching products:", error);
      setSearchResults([]);
    } finally {
      setIsSearchLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 top-12 bg-[rgba(0,0,0,0.3)] bg-opacity-40 z-50 flex items-start justify-center">
      <div
        ref={modalRef}
        className={`bg-white shadow-lg w-full p-5 transition-all duration-300 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
      >
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between gap-2 items-center mb-4">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#C5A980]"
              placeholder="Search for products"
              value={query}
              onChange={handleSearch}
            />
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-800 text-3xl"
            >
              &times;
            </button>
          </div>

          {isSearchLoading && (
            <p className="text-sm text-gray-500 mt-2">Loading...</p>
          )}

          {showResults && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">
                Search results for: <strong>{query}</strong>
              </p>
              {searchResults.length > 0 ? (
                <ul onClick={()=>onClose()} className=" grid grid-cols-3">
                  {searchResults.map((product) => (
                    <ProductCard product={product} />
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">No results found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupSearchModal;
