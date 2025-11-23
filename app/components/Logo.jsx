"use client";

import { GiSofa } from "react-icons/gi";

const Logo = ({ className = "", size = "default", variant = "light" }) => {
  const sizes = {
    small: { text: "text-base sm:text-lg", icon: "w-8 h-8", container: "w-11 h-11 sm:w-12 sm:h-12" },
    default: { text: "text-lg sm:text-xl md:text-2xl", icon: "w-9 h-9 sm:w-10 sm:h-10", container: "w-13 h-13 sm:w-15 sm:h-15" },
    large: { text: "text-xl sm:text-2xl md:text-3xl", icon: "w-11 h-11 sm:w-12 sm:h-12", container: "w-16 h-16 sm:w-20 sm:h-20" },
  };

  const currentSize = sizes[size] || sizes.default;
  const isDark = variant === "dark";

  return (
    <div className={`flex items-center gap-3 sm:gap-4 ${className}`}>
      {/* Sofa Icon - More Prominent */}
      <div className="relative flex-shrink-0">
        <div className={`flex items-center justify-center ${currentSize.container} bg-gradient-to-br from-darkGreen to-darkGreen-dark rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
          <GiSofa className={`${currentSize.icon} text-white`} />
        </div>
        {/* Decorative accent dot */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white/50 rounded-full shadow-sm"></div>
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <span
          className={`${currentSize.text} font-semibold leading-tight ${
            isDark ? "text-white" : "text-darkBlue"
          }`}
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, letterSpacing: '0.02em' }}
        >
          SophisticateDecor
        </span>
        <span 
          className={`text-xs sm:text-sm font-semibold uppercase tracking-wider ${
            isDark ? "text-gray-300" : "text-darkGreen"
          } opacity-90`}
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}
        >
          Luxury Interior
        </span>
      </div>
    </div>
  );
};

export default Logo;

