import React, { useState, useEffect } from "react";
import logo from "../../assets/images/xelite silk.svg";
import BottomNav from "./BottomNav";
import { Link } from "react-router-dom";
import PopupLoginSignUp from "../../pages/auth/PopupLoginSignUp";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showModel,setShowModel] = useState(false)
  const OpenMenu = () => {
    setMenu(!menu);
  };


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".search-container")) {
        setShowResults(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  return (
    <div className="bg-white">
      <div className="sm:max-w-7xl px-2 relative max-w-[95%] mx-auto">
        <div className="flex w-full justify-between items-center sm:pt-3 pt-0">
          {/* Empty div for spacing on the left */}
          <div className="w-36 hidden sm:block"></div>
           {/* Mobile Menu Button */}
          <div className="block sm:hidden cursor-pointer">
            {menu ? (
              <svg
                onClick={OpenMenu}
                width={25}
                aria-hidden="true"
                role="presentation"
                className="elementor-menu-toggle__icon--close e-font-icon-svg e-eicon-close"
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M742 167L500 408 258 167C246 154 233 150 217 150 196 150 179 158 167 167 154 179 150 196 150 212 150 229 154 242 171 254L408 500 167 742C138 771 138 800 167 829 196 858 225 858 254 829L496 587 738 829C750 842 767 846 783 846 800 846 817 842 829 829 842 817 846 804 846 783 846 767 842 750 829 737L588 500 833 258C863 229 863 200 833 171 804 137 775 137 742 167Z"></path>
              </svg>
            ) : (
              <svg
                onClick={OpenMenu}
                width={25}
                aria-hidden="true"
                role="presentation"
                className="elementor-menu-toggle__icon--open e-font-icon-svg e-eicon-menu-bar"
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M104 333H896C929 333 958 304 958 271S929 208 896 208H104C71 208 42 237 42 271S71 333 104 333ZM104 583H896C929 583 958 554 958 521S929 458 896 458H104C71 458 42 487 42 521S71 583 104 583ZM104 833H896C929 833 958 804 958 771S929 708 896 708H104C71 708 42 737 42 771S71 833 104 833Z"></path>
              </svg>
            )}
          </div>
          {/* Centered Logo */}
          <div className="flex-1 flex justify-center">
            <Link to={`/`}>
              <img src={logo} alt="Xelite Silk Logo" className="sm:w-36 w-32" />
            </Link>
          </div>
          
          {/* Navigation Icons */}
          <div className="">
           <ul className="flex md:gap-6 gap-2 items-center">
            <li >
              <Link to={''} className="flex flex-col items-center group">
                <div className="text-gray-700 group-hover:text-[#C5A980] transition-colors duration-200">
                  <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                    <g id="search"> 
                      <path  d="M93.26,93.59l-23.94-24a38,38,0,1,0-3.16,2.5L90.44,96.41a2,2,0,0,0,2.82-2.82ZM10.15,41.06A34.07,34.07,0,1,1,44.21,75.13,34.1,34.1,0,0,1,10.15,41.06Z"></path>
                    </g>
                  </svg>
                </div>
                <span className="uppercase pt-1  sm:block hidden text-xs text-gray-700 group-hover:text-[#C5A980] transition-colors duration-200">Search</span>
              </Link>
            </li>
             <li className=" sm:block  hidden">
              <Link to={''} onClick={()=>setShowModel(true)} className="flex flex-col items-center group">
                <div className="text-gray-700 group-hover:text-[#C5A980] transition-colors duration-200">
                  <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                    <g id="avatar">
                      <path d="M97,50A47,47,0,1,0,17.28,83.74l0,0h0A46.93,46.93,0,0,0,82.39,84a2,2,0,0,0,.5-.47A46.88,46.88,0,0,0,97,50ZM50,7A43,43,0,0,1,81.88,78.82a35.54,35.54,0,0,0-22-18.17,20.28,20.28,0,1,0-19.8,0,35.52,35.52,0,0,0-22,18.18A42.59,42.59,0,0,1,7,50,43,43,0,0,1,50,7Zm0,52.25A16.28,16.28,0,1,1,66.28,43,16.29,16.29,0,0,1,50,59.25ZM21.12,81.84a31.73,31.73,0,0,1,57.76,0,42.93,42.93,0,0,1-57.76,0Z"></path>
                    </g>
                  </svg>
                </div>
                <span className="uppercase sm:block hidden pt-1 text-xs text-gray-700 group-hover:text-[#C5A980] transition-colors duration-200">Login</span>
              </Link>
            </li>
             <li>
              <Link to={'/cart'} className="flex flex-col items-center group">
                <div className="text-gray-700 group-hover:text-[#C5A980] transition-colors duration-200">
                  <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                    <g id="bag">
                      <path d="M81.34,27.06a2,2,0,0,0-2-1.89H69V22A19,19,0,1,0,31,22v3.21H20.65a2,2,0,0,0-2,1.89L14.74,94.88a2,2,0,0,0,2,2.12H83.26a2,2,0,0,0,2-2.12ZM35,22A15,15,0,1,1,65,22v3.21H35ZM18.86,93l3.68-63.83H31V46.74a2,2,0,0,0,4,0V29.17H65V46.74a2,2,0,0,0,4,0V29.17h8.5L81.14,93Z"></path>
                    </g>
                  </svg>
                </div>
                <span className="uppercase pt-1 sm:block hidden text-xs text-gray-700 group-hover:text-[#C5A980] transition-colors duration-200">Cart</span>
              </Link>
            </li>
           </ul>
          </div>

         
        </div>

        <BottomNav Menu={menu} OpenMenu={OpenMenu} />

                          {showModel && <PopupLoginSignUp onClose={()=>setShowModel(false)}/>}

      </div>

    
    </div>
  );
};

export default Navbar;