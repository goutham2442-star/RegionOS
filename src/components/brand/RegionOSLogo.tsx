import React from "react";

interface RegionOSLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  showText?: boolean;
}

export const RegionOSLogo: React.FC<RegionOSLogoProps> = ({
  className = "",
  size = "md",
  variant = "dark",
  showText = true,
}) => {
  const isDark = variant === "dark";

  const sizeClasses = {
    sm: {
      svg: "w-8 h-8",
      text: "text-lg",
    },
    md: {
      svg: "w-10 h-10",
      text: "text-xl",
    },
    lg: {
      svg: "w-16 h-16",
      text: "text-3xl",
    },
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Icon SVG */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses[size].svg} shrink-0`}
      >
        {/* Outer dark rounded square */}
        <rect
          width="100"
          height="100"
          rx="22"
          fill={isDark ? "#FFFFFF" : "#0B162B"}
        />
        
        {/* Four internal compartment squares */}
        {/* Top-Left Compartment */}
        <rect
          x="15"
          y="15"
          width="30"
          height="30"
          rx="6"
          fill={isDark ? "#0B162B" : "#FFFFFF"}
        />
        
        {/* Bottom-Left Compartment */}
        <rect
          x="15"
          y="55"
          width="30"
          height="30"
          rx="6"
          fill={isDark ? "#0B162B" : "#FFFFFF"}
        />

        {/* Bottom-Right Compartment */}
        <rect
          x="55"
          y="55"
          width="30"
          height="30"
          rx="6"
          fill={isDark ? "#0B162B" : "#FFFFFF"}
        />

        {/* Top-Right Compartment with Curved/Abstract detail */}
        <rect
          x="55"
          y="15"
          width="30"
          height="30"
          rx="6"
          fill={isDark ? "#0B162B" : "#FFFFFF"}
        />
        {/* Special Curved Detail in the Upper-Right Compartment */}
        <path
          d="M 67 22 C 77 22, 78 33, 78 37"
          stroke={isDark ? "#1465D8" : "#1465D8"}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle
          cx="78"
          cy="37"
          r="3"
          fill={isDark ? "#1465D8" : "#1465D8"}
        />
      </svg>

      {/* Brand Text */}
      {showText && (
        <span
          className={`font-semibold tracking-tight font-sans ${
            sizeClasses[size].text
          } ${isDark ? "text-white" : "text-dark-navy"}`}
        >
          Region<span className="text-primary-blue">OS</span>
        </span>
      )}
    </div>
  );
};
