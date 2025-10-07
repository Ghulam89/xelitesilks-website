import React from "react";

const Button = ({
  type = "button",
  label,
  disabled = false,
  className = "",
  onClick,
  Icons,
  rIcons,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`sm:px-6  px-2 sm:py-2.5 py-1.5 cursor-pointer flex items-center justify-center gap-2 
      transition-all duration-300 ease-in-out rounded-full
      hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
      ${className}`}
      disabled={disabled}
    >
      {Icons && <span className="flex items-center">{Icons}</span>}
      {label && <span className="font-semibold">{label}</span>}
      {rIcons && <span className="flex items-center">{rIcons}</span>}
    </button>
  );
};

export default Button;