import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";

const BottomNav = ({ Menu, OpenMenu }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const location = useLocation();
  
  const allCategories = [
    {
      id: 1,
      name: "MEN'S SCARVES",
      slug: "mens-scarves-100-percent-made-in-italy",
      midcategories: [
        { id: 101, title: "Bestsellers", slug: "mens-scarves-100-percent-made-in-italy" },
        { id: 102, title: "All men's scarves", slug: "mens-scarves-100-percent-made-in-italy" },
        { id: 103, title: "Just in", slug: "mens-scarves-100-percent-made-in-italy" },
        { id: 104, title: "Long silk scarves", slug: "mens-scarves-100-percent-made-in-italy" },
        { id: 105, title: "Silk neckerchiefs", slug: "mens-scarves-100-percent-made-in-italy" },
        { id: 106, title: "Wool backed silk scarves", slug: "mens-scarves-100-percent-made-in-italy" },
        { id: 107, title: "All wool scarves", slug: "mens-scarves-100-percent-made-in-italys" },
        { id: 108, title: "Gift cards", slug: "mens-scarves-100-percent-made-in-italy" }
      ]
    },
    {
      id: 2,
      name: "WOMEN'S SCARVES",
      slug: "mens-scarves-100-percent-made-in-italy",
      midcategories: [
        { id: 201, title: "Bestsellers", slug: "mens-scarves-100-percent-made-in-italy" },
        { id: 202, title: "All women's scarves", slug: "mens-scarves-100-percent-made-in-italy" },
        { id: 203, title: "New arrivals", slug: "mens-scarves-100-percent-made-in-italy" },
        { id: 204, title: "Silk scarves", slug: "mens-scarves-100-percent-made-in-italy" },
        { id: 205, title: "Cashmere scarves", slug: "mens-scarves-100-percent-made-in-italy" }
      ]
    },
    {
      id: 3,
      name: "TIES",
      slug: "mens-scarves-100-percent-made-in-italy",
      midcategories: [
        { id: 301, title: "Silk ties", slug: "mens-scarves-100-percent-made-in-italy" },
        { id: 302, title: "Knit ties", slug: "mens-scarves-100-percent-made-in-italy" },
        { id: 303, title: "Bow ties", slug: "mens-scarves-100-percent-made-in-italy" }
      ]
    },
    {
      id: 4,
      name: "POCKET SQUARES",
      slug: "mens-scarves-100-percent-made-in-italy",
      midcategories: []
    },
    {
      id: 5,
      name: "ASCOTS",
      slug: "mens-scarves-100-percent-made-in-italy",
      midcategories: []
    },
    {
      id: 6,
      name: "ABOUT US",
      slug: "about-us",
      midcategories: []
    }
  ];

  useEffect(() => {
    setHoveredCategory(null);
    setSelectedCategory(null);
  }, [location.pathname]);

  const handleCategoryHover = (category) => {
    setHoveredCategory(category);
    setSelectedCategory(category.midcategories);
  };

  const handleCategoryLeave = () => {
    setHoveredCategory(null);
    setSelectedCategory(null);
  };

  const handleLinkClick = () => {
    if (OpenMenu) OpenMenu();
    handleCategoryLeave();
  };

  return (
    <div className="relative">
      {/* Desktop Menu */}
      <div className="sm:block hidden pb-3">
        <ul className="flex justify-center gap-12 items-center max-w-6xl mx-auto">
          <li>
            <NavLink to="/" className="transition-colors  hover:text-[#C5A980] font-medium">
              HOME
            </NavLink>
          </li>
          {allCategories.map((category) => (
            <li
              key={category.id}
              onMouseEnter={() => handleCategoryHover(category)}
              onMouseLeave={handleCategoryLeave}
              className="relative group"
            >
              <NavLink
                onClick={handleCategoryLeave}
                to={`/collections/${category.slug}`}
                className="flex items-center gap-1 text-[#333333] hover:text-[#C5A980] uppercase py-2.5  font-medium transition-colors"
              >
                {category.name}
                {category.midcategories?.length > 0 && (
                  <FaAngleDown 
                    className={`ml-1 transition-transform duration-200 ${
                      hoveredCategory?.id === category.id ? 'rotate-180' : ''
                    }`} 
                    size={16} 
                  />
                )}
              </NavLink>

              {/* Dropdown Menu */}
              {hoveredCategory?.id === category.id && selectedCategory && selectedCategory.length > 0 && (
                <div
                  className="absolute left-0 top-full z-50 w-64"
                  onMouseEnter={() => handleCategoryHover(hoveredCategory)}
                  onMouseLeave={handleCategoryLeave}
                >
                  <div className=" bg-white rounded-lg mt-2 overflow-hidden  shadow-xl">
                    <div className="flex flex-col">
                      {selectedCategory.map((submenu) => (
                        <NavLink
                          key={submenu.id}
                          onClick={handleCategoryLeave}
                          to={`collections/${submenu.slug}`}
                          className="font-semibold text-[#333333] px-4 py-2 capitalize transition-colors hover:text-[#C5A980] hover:bg-gray-50 border-b border-gray-50  "
                        >
                          {submenu.title}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      <div className={`sm:hidden ${Menu ? "block" : "hidden"} bg-[#F7F7F7]`}>
        <ul className="flex flex-col space-y-4 p-4">
          <li>
            <NavLink 
              to="/" 
              className="transition-colors text-[#333333] font-medium" 
              onClick={handleLinkClick}
            >
              HOME
            </NavLink>
          </li>
          {allCategories.map((category) => (
            <li key={category.id}>
              <NavLink
                to={`/category/${category.slug}`}
                className="flex items-center font-sans gap-1 py-2.5 text-sm text-[#333333] font-medium transition-colors"
                onClick={handleLinkClick}
              >
                {category.name}
                {category.midcategories?.length > 0 && (
                  <FaAngleDown className="ml-1" size={15} />
                )}
              </NavLink>
              {category.midcategories?.length > 0 && (
                <ul className="pl-4">
                  {category.midcategories.map((submenu) => (
                    <li key={submenu.id}>
                      <NavLink
                        to={`/sub-category/${submenu.slug}`}
                        className="text-sm text-[#333333] font-medium flex gap-0.5 items-center transition-colors"
                        onClick={handleLinkClick}
                      >
                        {submenu.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BottomNav;