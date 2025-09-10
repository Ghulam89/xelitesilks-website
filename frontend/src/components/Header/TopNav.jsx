import "tailwindcss";
import { Link } from "react-router-dom";

const TopNav = () => {
  return (
    <div>
      {/* 🔹 Promo Bar */}
      <div className="bg-[#5A5A5A] text-white text-center text-sm py-2">
        <span>10% off your first order</span>
        <Link
          to="#"
          className="ml-2 font-semibold underline hover:text-gray-300"
        >
          See details
        </Link>
      </div>

    </div>
  );
};

export default TopNav;
