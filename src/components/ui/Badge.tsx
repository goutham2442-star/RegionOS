import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "danger" | "info" | "neutral";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral",
  className = "",
}) => {
  const baseStyles =
    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium select-none border";

  const variants = {
    success:
      "bg-success-green/10 text-success-green border-success-green/20",
    warning:
      "bg-warning-amber/10 text-warning-amber border-warning-amber/20",
    danger:
      "bg-danger-red/10 text-danger-red border-danger-red/20",
    info:
      "bg-primary-blue/10 text-primary-blue border-primary-blue/20",
    neutral:
      "bg-muted-bg text-secondary-text border-border-color",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
