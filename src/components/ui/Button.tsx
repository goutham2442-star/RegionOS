import React from "react";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "blue" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variants = {
    primary:
      "bg-primary-text text-white hover:bg-opacity-90 focus:ring-primary-text border border-transparent shadow-sm",
    secondary:
      "bg-white text-primary-text border border-border-color hover:bg-muted-bg focus:ring-primary-blue",
    blue:
      "bg-primary-blue text-white hover:bg-opacity-90 focus:ring-primary-blue border border-transparent shadow-sm",
    danger:
      "bg-danger-red text-white hover:bg-opacity-90 focus:ring-danger-red border border-transparent shadow-sm",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
