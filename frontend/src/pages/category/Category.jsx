import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
import PageMetadata from "../../components/common/PageMetadata";
import ProductCard from "../../components/common/ProductCard";
import { LiaAngleDownSolid } from "react-icons/lia";
import Button from "../../components/common/Button";
import TopNav from "../../components/Header/TopNav";
import Navbar from "../../components/Header/Navbar";
import Footer from "../../components/Footer/Footer";

const Category = ({ serverData }) => {
  const { slug } = useParams();
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryData, setCategoryData] = useState(null);

  const [showColorFilter, setShowColorFilter] = useState(false);
  const [showMaterialFilter, setShowMaterialFilter] = useState(false);
  const [showPatternFilter, setShowPatternFilter] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showSortFilter, setShowSortFilter] = useState(false); // New sort filter

  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedPattern, setSelectedPattern] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedSort, setSelectedSort] = useState("newest"); // New sort state

  const colorOptions = ['blue', 'red', 'gray', 'pink', 'orange'];
  const materialOptions = ['Silk', 'Wool', 'Modal', 'Linen'];
  const patternOptions = ['floral', 'Geometric', 'Paisley', 'Plaid and Checks', 'Polka Dot', 'Solid Color', 'Stripes'];
  const sortOptions = [ // New sort options
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' }
  ];

  const FetchCategory = async (filters = {}) => {
    try {
      const response = await axios.get(`${BaseUrl}/collections/get?slug=${slug}`);
      if (!response?.data?.data) {
        return;
      }
      setCategoryData(response?.data?.data);

      // Build query parameters for filters
      const params = new URLSearchParams();
      
      // Add filter parameters
      if (filters.colors && filters.colors.length > 0) {
        filters.colors.forEach(color => params.append('colors', color));
      }
      
      if (filters.material) {
        params.append('materials', filters.material);
      }
      
      if (filters.pattern) {
        params.append('patterns', filters.pattern);
      }
      
      // Price range parameters - FIXED
      if (filters.priceRange) {
        if (filters.priceRange.min > 0) {
          params.append('minPrice', filters.priceRange.min);
        }
        if (filters.priceRange.max < 1000) {
          params.append('maxPrice', filters.priceRange.max);
        }
      }

      // Add sort parameter
      if (filters.sort) {
        params.append('sort', filters.sort);
      }

      // Add pagination to show all products
      params.append('perPage', 100);

      console.log('API Call with params:', params.toString()); // Debug log

      const response2 = await axios.get(
        `${BaseUrl}/products/categoryProducts/${response?.data?.data._id}/products-by-category?${params.toString()}`
      );

      const products = response2?.data?.data?.products || [];
      setCategoryProduct(products);
      setFilteredProducts(products);
    } catch (err) {
      console.error("Error fetching category:", err);
    }
  };

  // Apply filters by calling API with query parameters
  const applyFilters = () => {
    const filters = {
      colors: selectedColors,
      material: selectedMaterial,
      pattern: selectedPattern,
      priceRange: priceRange,
      sort: selectedSort // Add sort to filters
    };
    FetchCategory(filters);
  };

  const handleColorChange = (color) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const handleMaterialChange = (material) => {
    setSelectedMaterial(prev => prev === material ? "" : material);
  };

  const handlePatternChange = (pattern) => {
    setSelectedPattern(prev => prev === pattern ? "" : pattern);
  };

  const handlePriceChange = (min, max) => {
    setPriceRange({ min, max });
  };

  const handleSortChange = (sortValue) => {
    setSelectedSort(sortValue);
    setShowSortFilter(false);
  };

  const clearAllFilters = () => {
    setSelectedColors([]);
    setSelectedMaterial("");
    setSelectedPattern("");
    setPriceRange({ min: 0, max: 1000 });
    setSelectedSort("newest");
    FetchCategory();
  };

  // Apply filters when filter states change
  useEffect(() => {
    applyFilters();
  }, [selectedColors, selectedMaterial, selectedPattern, priceRange, selectedSort]);

  // Initial fetch when slug changes
  useEffect(() => {
    FetchCategory();
  }, [slug]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowColorFilter(false);
      setShowMaterialFilter(false);
      setShowPatternFilter(false);
      setShowPriceFilter(false);
      setShowSortFilter(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BaseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": categoryData?.name,
        "item": `${BaseUrl}/category/${slug}`
      }
    ]
  };

  // Get current sort label
  const getCurrentSortLabel = () => {
    const currentSort = sortOptions.find(option => option.value === selectedSort);
    return currentSort ? currentSort.label : 'Sort By';
  };

  return (
    <>

    <TopNav />
     <Navbar />
      <PageMetadata
        title={categoryData?.metaTitle || serverData?.metaTitle || "Custom Packaging Solutions"}
        description={categoryData?.metaDescription || serverData?.metaDescription || ""}
        keywords={categoryData?.keywords || serverData?.keywords || ""}
        ogUrl={`${BaseUrl}/category/${slug}`}
        ogImage={`${BaseUrl}/${categoryData?.bannerImage}`}
        ogImageWidth="1200"
        ogImageHeight="630"
        canonicalUrl={`${BaseUrl}/category/${slug}`}
        breadcrumbSchema={breadcrumbSchema}
        robots={"noindex, nofollow"}
      />

      <div className="bg-[#faf8f6] pb-11">
        <div className="max-w-7xl mx-auto">
          <div className="pt-4 pb-10 text-center">
            <h1 className="font-semibold text-3xl">{categoryData?.name}</h1>
            <p className="pt-5 text-[#0a0a88]">{categoryData?.description}</p>
          </div>

          <div className="flex flex-wrap gap-4 pb-8 px-4 relative">
            
            {/* Color Filter */}
            <div className="relative">
              <button
                className="cursor-pointer flex items-center gap-2 bg-white px-4 py-2 rounded border"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowColorFilter(!showColorFilter);
                  setShowMaterialFilter(false);
                  setShowPatternFilter(false);
                  setShowPriceFilter(false);
                  setShowSortFilter(false);
                }}
              >
                Color ({selectedColors.length}) <LiaAngleDownSolid />
              </button>
              {showColorFilter && (
                <div className="absolute top-full left-0 bg-white z-40 w-64 border p-3 mt-1 rounded shadow-lg">
                  <h3 className="font-semibold mb-2">Select Colors</h3>
                  <ul className="space-y-2 max-h-60 overflow-y-auto">
                    {colorOptions.map((color, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`color-${index}`}
                          checked={selectedColors.includes(color)}
                          onChange={() => handleColorChange(color)}
                          className="w-4 h-4"
                        />
                        <label htmlFor={`color-${index}`} className="flex items-center gap-2 cursor-pointer">
                          <span 
                            style={{ backgroundColor: color }} 
                            className="w-4 h-4 rounded-full border"
                          ></span>
                          {color}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Material Filter */}
            <div className="relative">
              <button
                className="cursor-pointer flex items-center gap-2 bg-white px-4 py-2 rounded border"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMaterialFilter(!showMaterialFilter);
                  setShowColorFilter(false);
                  setShowPatternFilter(false);
                  setShowPriceFilter(false);
                  setShowSortFilter(false);
                }}
              >
                Material {selectedMaterial && `(${selectedMaterial})`} <LiaAngleDownSolid />
              </button>
              {showMaterialFilter && (
                <div className="absolute top-full left-0 bg-white z-40 w-64 border p-3 mt-1 rounded shadow-lg">
                  <h3 className="font-semibold mb-2">Select Material</h3>
                  <ul className="space-y-2 max-h-60 overflow-y-auto">
                    {materialOptions.map((material, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <input
                          type="radio"
                          id={`material-${index}`}
                          name="material"
                          checked={selectedMaterial === material}
                          onChange={() => handleMaterialChange(material)}
                          className="w-4 h-4"
                        />
                        <label htmlFor={`material-${index}`} className="cursor-pointer">
                          {material}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Pattern Filter */}
            <div className="relative">
              <button
                className="cursor-pointer flex items-center gap-2 bg-white px-4 py-2 rounded border"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPatternFilter(!showPatternFilter);
                  setShowColorFilter(false);
                  setShowMaterialFilter(false);
                  setShowPriceFilter(false);
                  setShowSortFilter(false);
                }}
              >
                Pattern {selectedPattern && `(${selectedPattern})`} <LiaAngleDownSolid />
              </button>
              {showPatternFilter && (
                <div className="absolute top-full left-0 bg-white z-40 w-64 border p-3 mt-1 rounded shadow-lg">
                  <h3 className="font-semibold mb-2">Select Pattern</h3>
                  <ul className="space-y-2 max-h-60 overflow-y-auto">
                    {patternOptions.map((pattern, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <input
                          type="radio"
                          id={`pattern-${index}`}
                          name="pattern"
                          checked={selectedPattern === pattern}
                          onChange={() => handlePatternChange(pattern)}
                          className="w-4 h-4"
                        />
                        <label htmlFor={`pattern-${index}`} className="cursor-pointer">
                          {pattern}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Price Filter */}
            <div className="relative">
              <button
                className="cursor-pointer flex items-center gap-2 bg-white px-4 py-2 rounded border"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPriceFilter(!showPriceFilter);
                  setShowColorFilter(false);
                  setShowMaterialFilter(false);
                  setShowPatternFilter(false);
                  setShowSortFilter(false);
                }}
              >
                Price {priceRange.min > 0 || priceRange.max < 1000 ? `($${priceRange.min}-$${priceRange.max})` : ''} <LiaAngleDownSolid />
              </button>
              {showPriceFilter && (
                <div className="absolute top-full left-0 bg-white z-40 w-64 border p-3 mt-1 rounded shadow-lg">
                  <h3 className="font-semibold mb-2">Price Range</h3>
                  <div className="space-y-3">
                    <div className="flex gap-2 items-center">
                      <input
                        type="number"
                        value={priceRange.min}
                        onChange={(e) => handlePriceChange(Number(e.target.value), priceRange.max)}
                        className="w-20 p-1 border rounded"
                        placeholder="Min"
                        min="0"
                      />
                      <span className="self-center">to</span>
                      <input
                        type="number"
                        value={priceRange.max}
                        onChange={(e) => handlePriceChange(priceRange.min, Number(e.target.value))}
                        className="w-20 p-1 border rounded"
                        placeholder="Max"
                        min="0"
                      />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() => handlePriceChange(0, 50)}
                      >
                        Under $50
                      </button>
                      <button
                        className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() => handlePriceChange(50, 100)}
                      >
                        $50-$100
                      </button>
                      <button
                        className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() => handlePriceChange(100, 200)}
                      >
                        $100-$200
                      </button>
                    </div>
                    <button
                      className="w-full text-sm bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                      onClick={() => handlePriceChange(0, 1000)}
                    >
                      Clear Price
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sort Filter - NEW */}
            <div className="relative">
              <button
                className="cursor-pointer flex items-center gap-2 bg-white px-4 py-2 rounded border"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSortFilter(!showSortFilter);
                  setShowColorFilter(false);
                  setShowMaterialFilter(false);
                  setShowPatternFilter(false);
                  setShowPriceFilter(false);
                }}
              >
                {getCurrentSortLabel()} <LiaAngleDownSolid />
              </button>
              {showSortFilter && (
                <div className="absolute top-full left-0 bg-white z-40 w-64 border p-3 mt-1 rounded shadow-lg">
                  <h3 className="font-semibold mb-2">Sort By</h3>
                  <ul className="space-y-2">
                    {sortOptions.map((option, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <input
                          type="radio"
                          id={`sort-${index}`}
                          name="sort"
                          checked={selectedSort === option.value}
                          onChange={() => handleSortChange(option.value)}
                          className="w-4 h-4"
                        />
                        <label htmlFor={`sort-${index}`} className="cursor-pointer">
                          {option.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Clear All Filters Button */}
            {(selectedColors.length > 0 || selectedMaterial || selectedPattern || priceRange.min > 0 || priceRange.max < 1000 || selectedSort !== "newest") && (
              <button
                className="cursor-pointer bg-gray-200 px-4 py-2 rounded border hover:bg-gray-300"
                onClick={clearAllFilters}
              >
                Clear All
              </button>
            )}

            <div className="ml-auto self-center">
              <span className="text-sm text-gray-600">
                Showing {filteredProducts.length} products
              </span>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 md:gap-6 gap-3 px-4">
            {filteredProducts?.map((item, index) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>

          {/* No Products Found */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600">No products match your selected filters.</p>
              <Button
                label={'Clear Filters'}
                onClick={clearAllFilters}
                rIcons={
                  <svg className='' width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="13" cy="13" r="12.5" fill="currentColor" stroke="black" />
                    <path d="M10.6367 15.3636L14.7731 11.2273M14.7731 11.2273L15.364 13.5909M14.7731 11.2273L12.4094 10.6364" stroke="white" strokeWidth="1.5" />
                  </svg>
                }
                className="mt-5 border-2 mx-auto border-[#C5A980] bg-[#C5A980] text-black hover:bg-white hover:text-black hover:border-[#C5A980]"
              />
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Category;