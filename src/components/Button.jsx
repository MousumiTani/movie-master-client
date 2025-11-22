import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
}) => {
  // Base style
  const base = "rounded-lg font-medium transition-all duration-200";

  // Variants
  const variants = {
    primary: "bg-purple-600 text-white hover:bg-purple-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-purple-600 hover:text-white",
    outline:
      "border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white",
    danger: "bg-red-500 text-white hover:bg-red-600",
    ghost: "text-gray-700 hover:bg-gray-200",
  };

  // Sizes
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    full: "px-4 py-2 w-full text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
